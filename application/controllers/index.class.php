<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Core\System;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

class IndexController 
{
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function indexAction(Request $request) 
	{
		$userModel = new UserModel($this->app);
	
		$cookies = $request->cookies;		
		$token = $cookies->get('r');
		
		if($user = (is_null($token)) ? false : $userModel->rememberMeLookup($token)) {
			// Load users company to get the database identifier
			$companyModel = new CompanyModel($this->app);
			$companyModel->loadCompanyByID($user['companyID']);
			
			// Authenticate session
			System::setupSession($this->app, true, $companyModel->company['database'], (string) $user['_id'], (string) $user['companyID']);
		}
		
		return System::generateAssets($request, $this->app);
	}
}