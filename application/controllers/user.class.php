<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Component\ApiResponse;
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
		
		if(!isset($userModel->user)) return ApiResponse::error('USER_NOT_FOUND');
		
		unset($userModel->user['password']);
		
		return json_encode($userModel->user);		
	}
	
	public function getUsersAction() 
	{
		$userModel = new UserModel($this->app);
		
		try {
			$users = $userModel->getAllUsers();	
			return json_encode($users);
		} catch(\Exception $e) {
			return ApiResponse::error('USER_FETCH_FAIL');
		}
	}
	
	public function deleteUserAction($userID) 
	{
		$userModel = new UserModel($this->app);
		
		if($userModel->removeUser($userID)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_REMOVE_FAIL');
		}
	}
	
	public function putUserPropertyAction($userID, $property) 
	{
		$data = json_decode(file_get_contents('php://input'));
		
		$userModel = new UserModel($this->app);
		
		if($userModel->setProperty($userID, $property, $data)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_PROPERTY_SET_FAIL');
		}
	}
	
	public function deleteUserPropertyAction($userID, $property) 
	{
		$data = json_decode(file_get_contents('php://input'));
		
		$userModel = new UserModel($this->app);
		
		if($userModel->deleteProperty($userID, $property)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_PROPERTY_DELETE_FAIL');
		}
	}
	
	public function checkExistsEmailAction(Request $request) 
	{
		$email = $request->get('email');
		
		$userModel = new UserModel($this->app);
		
		try {
			$userModel->loadUser($email);
			return ApiResponse::error('USER_EXISTS');
		} catch(\Exception $e) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		}
	}
	
	public function checkExistsCompanyNameAction(Request $request) 
	{		
		$company = $request->get('company');
		
		$companyModel = new CompanyModel($this->app);
		
		if($companyModel->companyExists($company)) {
			return ApiResponse::error('COMPANY_EXISTS');
		} else {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		}
	}
}