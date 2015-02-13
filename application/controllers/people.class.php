<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

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
		
		return json_encode($companyModel->company);
	}
	
	public function getClientsAction() {
		$clientModel = new ClientModel($this->app);
		return json_encode($clientModel->getClients());	
	}
	
	public function postClientAction() {
		$client = json_decode(file_get_contents('php://input'));
	
		$clientModel = new ClientModel($this->app);
		$clientModel->addClient($client);
	
		return json_encode($client);
	}
	
	public function postUserAction() {
		$user = json_decode(file_get_contents('php://input'));
	
		$userModel = new UserModel($this->app);
		$userModel->addUser($user);
	
		return json_encode($user);	
	}
	
	public function deleteClientAction($clientID) {
		$clientModel = new ClientModel($this->app);
		$clientModel->removeClient($clientID);
	
		return 1;	
	}
	
	public function postAgentAction() {
		$agent = json_decode(file_get_contents('php://input'));
	
		$userModel = new UserModel($this->app);
		$userModel->addAgent($agent);
		
		// Send verification email
		mail($agent->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to complete the registration process: ".Config::DOMAIN."/verify/".$agent->verify);
		
		return 1;
	}
}