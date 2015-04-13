<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

use Houston\Component\ApiResponse;
use Houston\Model\UserModel;
use Houston\Model\ClientModel;
use Houston\Model\CompanyModel;

class PeopleController {
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

		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('u'));

		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);

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
			return json_encode($data);
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}

	public function deleteClientAction($clientID)
	{
		$clientModel = new ClientModel($this->app);

		if($clientModel->removeClient($clientID)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_REMOVE_FAIL');
		}
	}

	public function postAgentAction()
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);

		if($userModel->addAgent($data)) {
			// Send verification email
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/email/welcome.phtml');
			$emailBody = str_replace('{button_url}', DOMAIN."/api/verify/".$data->verify, $template);

			$message = \Swift_Message::newInstance()
				->setSubject('Welcome to Houston!')
				->setFrom(array(DEFAULT_FROM))
				->setTo(array($data->emailAddress))
				->setBody($emailBody, 'text/html');

			$this->app['mailer']->send($message);

			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}
}
