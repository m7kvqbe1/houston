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
	
	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function getCompaniesAction() {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		$response = (isset($companyModel->company)) ? json_encode($companyModel->company) : ApiResponse::error('USER_COMPANY_NOT_FOUND');
		
		return $response;
	}
	
	public function getClientsAction() {
		$clientModel = new ClientModel($this->app);
		$response = ($clients = $clientModel->getClients()) ? json_encode($clients) : ApiResponse::error('CLIENT_NOT_FOUND');
	
		return $response;
	}
	
	public function postClientAction() {
		$client = json_decode(file_get_contents('php://input'));
	
		$clientModel = new ClientModel($this->app);
		$response = ($clientModel->addClient($client)) ? json_encode($client) : ApiResponse::error('CLIENT_ADD_FAIL');
	
		return $response;
	}
	
	public function postUserAction() {
		$user = json_decode(file_get_contents('php://input'));
	
		$userModel = new UserModel($this->app);
		$response = ($user = $userModel->addUser($user)) ? json_encode($user) : ApiResponse::error('USER_ADD_FAIL');
	
		return $response;
	}
	
	public function deleteClientAction($clientID) {
		$clientModel = new ClientModel($this->app);
		$response = ($clientModel->removeClient($clientID)) ? ApiResponse::success('DEFAULT_RESPONSE_SUCCESS') : ApiResponse::error('USER_REMOVE_FAIL');
		
		return $response;
	}
	
	public function postAgentAction() {
		$agent = json_decode(file_get_contents('php://input'));
	
		$userModel = new UserModel($this->app);
		
		if($userModel->addAgent($agent)) {
			// Send verification email
			mail($agent->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to complete the registration process: ".\Config::DOMAIN."/verify/".$agent->verify);
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}
}