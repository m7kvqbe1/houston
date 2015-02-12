<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

class UserController 
{
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function getUserSelfAction() 
	{
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));
		
		// Add company name to user JSON returned to backbone
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		$userModel->user['companyName'] = $companyModel->company['companyName'];
		
		if(!isset($userModel->user)) return -1;
		
		unset($userModel->user['password']);
		
		return json_encode($userModel->user);		
	}
	
	public function getUsersAction() 
	{
		$userModel = new UserModel($this->app);
		$users = $userModel->getAllUsers();
		
		return json_encode($users);		
	}
	
	public function deleteUserAction($userID) 
	{
		$userModel = new UserModel($this->app);
		$userModel->removeUser($userID);
	
		return 1;
	}
	
	public function putUserPropertyAction($userID, $property) 
	{
		$data = json_decode(file_get_contents('php://input'));
		
		try {
			$userModel = new UserModel($this->app);
			$userModel->setProperty($userID, $property, $data);	
		} catch(Exception $e) {
			echo $e->getMessage();
		}			
	}
	
	public function deleteUserPropertyAction($userID, $property) 
	{
		$data = json_decode(file_get_contents('php://input'));
		
		try {
			$userModel = new UserModel($this->app);
			$userModel->deleteProperty($userID, $property);
		} catch(Exception $e) {
			echo $e->getMessage();
		}		
	}
}