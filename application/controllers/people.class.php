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
		
		if(isset($companyModel->company)) {
			return json_encode($companyModel->company);
		} else {
			return ApiResponse::error('USER_COMPANY_NOT_FOUND');
		}
	}
	
	public function getClientsAction() {
		$clientModel = new ClientModel($this->app);
		
		if($clients = $clientModel->getClients()) {
			return json_encode($clients);
		} else {
			return ApiResponse::error('CLIENT_NOT_FOUND');
		}
	}
	
	public function postClientAction() {
		$client = json_decode(file_get_contents('php://input'));
	
		$clientModel = new ClientModel($this->app);
		
		if($clientModel->addClient($client)) {
			return json_encode($client);
		} else {
			return ApiResponse::error('CLIENT_ADD_FAIL');
		}
	}
	
	public function postUserAction() {
		$user = json_decode(file_get_contents('php://input'));
	
		$userModel = new UserModel($this->app);
		
		if($user = $userModel->addUser($user)) {
			return json_encode($user);
		} else {
			return ApiResponse::error('USER_ADD_FAIL');
		}
	}
	
	public function deleteClientAction($clientID) {
		$clientModel = new ClientModel($this->app);
		
		if($clientModel->removeClient($clientID)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_REMOVE_FAIL');
		}
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