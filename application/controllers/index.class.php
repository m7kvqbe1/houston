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
		
		$remember = (is_null($token)) ? false : $userModel->rememberMeLookup($token);
		if($remember !== false) {
			// Load users company to get the database identifier
			$companyModel = new CompanyModel($this->app);
			$companyModel->loadCompanyByID($remember['companyID']);
			
			// Authenticate session
			System::setupSession($this->app, true, $companyModel->company['database'], (string) $remember['_id'], (string) $remember['companyID']);
		}
		
		return System::generateAssets($request, $this->app);
	}
	
	public function apiIndexAction() {
		// Prompt for system credentials via HTTP Authentication
		
	}
}