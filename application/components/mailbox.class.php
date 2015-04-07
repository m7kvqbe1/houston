<?php
namespace Houston\Component;

use Silex\Application;
use Houston\Component\Helper;
use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;
use Houston\Model\UserModel;

abstract class Mailbox
{
	protected $inbox;
	protected $host;
	protected $username;
	protected $password;
	protected $serverEncoding;

	public $emails = array();

	public function __construct($host, $username, $password, $serverEncoding = 'utf-8')
	{
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->serverEncoding = $serverEncoding;

		try {
			$this->connect($this->host, $this->username, $this->password);
		} catch(Exception $e) {
			echo $e->getMessage();
		}
	}

	public function connect($host, $username, $password)
	{
		if($this->inbox = imap_open($host, $username, $password)) {
			return $this->inbox;
		} else {
			throw new \Exception('Could not connect to IMAP server: '.imap_last_error());
		}
	}

	public function disconnect()
	{
		imap_close($this->inbox);
	}

	public function getMail()
	{
		$emails = imap_search($this->inbox, 'ALL', null, $this->serverEncoding);
		foreach($emails as $num) {
			$header = imap_headerinfo($this->inbox, $num);
			$overview = imap_fetch_overview($this->inbox, $num, 0);
			$structure = imap_fetchstructure($this->inbox, $num);

			$email['read'] = ($overview[0]->seen ? 'read' : 'unread');
			$email['subject'] = $overview[0]->subject;

			$email['from'] = preg_replace('/<[^>]*>/', '', $overview[0]->from);	// Remove email address
			$email['from'] = explode(' ', $email['from'], 2); // Split into array of firstname and surname
			$email['firstName'] = $email['from'][0];
			$email['lastName'] = $email['from'][1];
			$email['from'] = $overview[0]->from;	// Keep the unparsed from meta as a fall back

			$email['date'] = Helper::convertTimestamp($overview[0]->date);
			$email['messageBody'] = imap_body($this->inbox, $num);
			$email['fromAddress'] = $header->from[0]->mailbox . '@' . $header->from[0]->host;

			$this->markRead($num);

			array_push($this->emails, $email);
		}

		return $this->emails;
	}

	public function checkType($structure)
	{
		return ($structure->type == 1) ? true : false;
	}

	public function getHeader($header, $name)
	{
		return (isset($header->{$name}) ? $header->{$name} : null);
	}

	public function markRead($num)
	{
		return imap_setflag_full($this->inbox, $num, '\\Seen \\Flagged');
	}

	public function markUnread($num)
	{
		return imap_clearflag_full($this->inbox, $num, '\\Seen');
	}
}

// This class adds additional application specific methods (templating and ticket email parsing)
class MailboxExtended extends Mailbox
{
	protected $app;
	private $templateDir = TEMPLATE_DIR;
	public $template;

	public function __construct(Application $app, $host, $username, $password, $serverEncoding = 'utf-8', $templateName = null, $templateDir = null)
	{
		$this->app = $app;

		if(isset($templateDir)) $this->templateDir = $templateDir;
		if(isset($templateName)) $this->template = $this->loadTemplate($templateName);

		parent::__construct($host, $username, $password, $serverEncoding);
	}

	public function loadTemplate($templateName)
	{
		switch($templateName) {
			case 'reply':
				$filename = 'reply.phtml';
				break;

			case 'new':
				$filename = 'new_ticket.phtml';
				break;

			default:
				throw new \InvalidArgumentException('Invalid template');
		}

		$this->template = file_get_contents(DOCUMENT_ROOT.$this->templateDir.$filename);
	}

	public function generateInfoHtml($ticketID, $messageID)
	{
		// Generate hidden ticket info to be inject into HTML email template
		return '<span class="ticket-id" style="color: #fff;">'.$ticketID.'</span><span class="message-id" style="color: #fff;">'.$messageID.'</span>';
	}

	public function getMessageMeta($message, $className)
	{
		libxml_use_internal_errors(true);	// Surpress PHP warnings because of malformed email markup

		$dom = new \DOMDocument();
		$dom->loadHTML($message);
		$xpath = new \DOMXPath($dom);
		$results = $xpath->query("//*[@class='" . $className . "']");

		return ($results->length > 0) ? $results->item(0)->nodeValue : false;
	}

	public function extractMessage($emailBody)
	{
		$emailBody = trim(strip_tags($emailBody));
		return current(explode("--- Please type your reply above this line ---", $emailBody));
	}

	public function processNewTicketEmail($email) {
		// Generate new ticket and save it
		$ticketModel = new TicketModel($this->app);
		$ticketModel->generateTicket($email['subject'], strip_tags($email['messageBody']), $email['date'], $email['fromAddress'], $email['firstName'], $email['lastName']);
		$ticketModel->add($ticketModel->ticket);

		// Send new ticket email to all agents
		$userModel = new UserModel($this->app);
		$agents = $userModel->getUsersByRole(array('AGENT', 'ADMIN'));

		foreach($agents as $agent) {
			$this->loadTemplate('new');
			$this->template = str_replace('{ticket_info_hidden}', $this->generateInfoHtml($ticketModel->ticket->_id->{'$id'}, null), $this->template);
			$this->template = str_replace('{ticket_message}', $email['messageBody'], $this->template);
			$this->template = str_replace('{ticket_subject}', $email['subject'], $this->template);

			$message = \Swift_Message::newInstance()
				->setSubject('Houston - New Ticket - '.$email['subject'])
				->setFrom(array(DEFAULT_FROM))
				->setTo(array($agent['emailAddress']))
				->setBody($this->template, 'text/html');

			$this->app['mailer']->send($message);
		}

		// Send new ticket email to ticket sender
		$message = \Swift_Message::newInstance()
			->setSubject('Houston - New Ticket - '.$email['subject'])
			->setFrom(array(DEFAULT_FROM))
			->setReplyTo(MAILBOX_USER)	// This address should be pulled from company account mailbox settings
			->setTo(array($email['fromAddress']))
			->setBody($this->template, 'text/html');

		$this->app['mailer']->send($message);
	}

	public function processReplyEmail($email, $ticketID, $messageID, $message) {
		// Generate reply and save it
		$replyModel = new ReplyModel($this->app);
		$replyModel->generateReply($ticketID, $message, null, $email['fromAddress']);
		$replyModel->reply($replyModel->reply);

		// Send new reply email to all agents
		$userModel = new UserModel($this->app);
		$agents = $userModel->getUsersByRole(array('AGENT', 'ADMIN'));

		foreach($agents as $agent) {
			$this->loadTemplate('reply');
			$this->template = str_replace('{ticket_info_hidden}', $this->generateInfoHtml($ticketModel->ticket->_id->{'$id'}, $replyModel->reply->_id->{'$id'}), $this->template);
			$this->template = str_replace('{ticket_message}', $message, $this->template);
			$this->template = str_replace('{ticket_subject}', $ticketModel->ticket['subject'], $this->template);

			$message = \Swift_Message::newInstance()
				->setSubject('Houston - New Reply - '.$email['subject'])
				->setFrom(array(DEFAULT_FROM))
				->setTo(array($agent['emailAddress']))
				->setBody($this->template, 'text/html');

			$this->app['mailer']->send($message);
		}

		// Send new reply email to ticket sender
		$message = \Swift_Message::newInstance()
			->setSubject('Houston - New Reply - '.$email['subject'])
			->setFrom(array(DEFAULT_FROM))
			->setReplyTo(MAILBOX_USER)	// This address should be pulled from company account mailbox settings
			->setTo(array($email['fromAddress']))
			->setBody($this->template, 'text/html');

		$this->app['mailer']->send($message);
	}
}
