<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

use Houston\Component\ApiResponse;
use Houston\Component\Notify;
use Houston\Model\UserModel;
use Houston\Model\ClientModel;
use Houston\Model\CompanyModel;

class PeopleController 
{
	protected $app;

	public function __construct(Application $app)
	{
		$this->app = $app;
	}

	public function getCompaniesAction()
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$companyModel = new CompanyModel($this->app, $this->app['session']->get('cid'));

		if(isset($companyModel->company)) {
			return json_encode($companyModel->company);
		} else {
			return ApiResponse::error('USER_COMPANY_NOT_FOUND');
		}
	}

	public function getClientsAction()
	{
		$clientModel = new ClientModel($this->app);

		$clients = $clientModel->getClients();

		return json_encode($clients);
	}

	public function postClientAction()
	{
		$data = json_decode(file_get_contents('php://input'));

		$clientModel = new ClientModel($this->app);

		if($clientModel->addClient($data)) {
			Notify::socketBroadcast('/update/users', null, $this->app['session']->get('cid'));
			
			return json_encode($data);
		} else {
			return ApiResponse::error('CLIENT_ADD_FAIL');
		}
	}

	public function postUserAction()
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);

		if($user = $userModel->addUser($data)) {
			Notify::socketBroadcast('/update/users', null, $this->app['session']->get('cid'));
			
			// Send verification email
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/email/welcome.phtml');
			$emailBody = str_replace('{button_url}', DOMAIN."/verify/".$data->verify, $template);

			$message = \Swift_Message::newInstance()
				->setSubject('Welcome to Houston!')
				->setFrom(array(DEFAULT_FROM))
				->setTo(array($data->emailAddress))
				->setBody($emailBody, 'text/html');

			$this->app['mailer']->send($message);

			return json_encode($data);
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}

	public function deleteClientAction($clientID)
	{
		$clientModel = new ClientModel($this->app);

		if($clientModel->removeClient($clientID)) {
			Notify::socketBroadcast('/update/users', null, $this->app['session']->get('cid'));
			
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_REMOVE_FAIL');
		}
	}

	public function putClientAction($clientID)
	{
		$data = json_decode(file_get_contents('php://input'));

		$clientModel = new ClientModel($this->app);

		if($clientModel->updateClientName($clientID, $data->name)) {
			Notify::socketBroadcast('/update/users', null, $this->app['session']->get('cid'));
			
			return json_encode($data);
		} else {
			return ApiResponse::error('CLIENT_EDIT_FAIL');
		}
	}

	public function postAgentAction()
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);

		if($userModel->addAgent($data)) {
			Notify::socketBroadcast('/update/users', null, $this->app['session']->get('cid'));
			
			// Send verification email
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/email/welcome.phtml');
			$emailBody = str_replace('{button_url}', DOMAIN."/verify/".$data->verify, $template);

			$message = \Swift_Message::newInstance()
				->setSubject('Welcome to Houston!')
				->setFrom(array(DEFAULT_FROM))
				->setTo(array($data->emailAddress))
				->setBody($emailBody, 'text/html');

			$this->app['mailer']->send($message);

			return json_encode($data);
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}
}
