<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Component\Helper;

class ReplyModel 
{
	protected $app;
	public $reply;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function loadReplyByID($replyID) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};
				
		$this->reply = $db->replies->findOne(array('_id' => new \MongoID($id)));
		
		if(!empty($this->reply)) {			
			return $this->reply;
		} else {
			throw new \Exception('Reply not found');
		}
	}
	
	public function getReplies($ticketID) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};
		
		$ticketID = new \MongoID($ticketID);
		
		$collection = $db->replies;
		$result = $collection->find(array('ticketID' => $ticketID));
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		return $docs;
	}
	
	public function generateReply($ticketID, $message, $date = null, $email)
	{
		$this->reply = new \stdClass();
		
		$this->reply->ticketID = new \MongoID($ticketID);
		$this->reply->message = $message;
		$this->reply->date = (isset($date)) ? $date : Helper::convertTimestamp(date('Y-m-d H:i:s'));
		
		$userModel = new UserModel($this->app);
		
		try {
			$userModel->loadUser($email);			
		} catch(\Exception $e) {
			// User not found
			throw new \Exception('Only registered users may generate a ticket reply');
		}
		
		$this->reply->authorID = new \MongoID($userModel->user['_id']);
		
		return $this->reply;
	}
	
	public function reply($reply) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};
		
		$reply->ticketID = new \MongoID($reply->ticketID);
		$reply->authorID = new \MongoID($reply->authorID);
		
		try {	
			$collection = $db->replies;
			$collection->save($reply);
			return $reply;
		} catch(MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}
}