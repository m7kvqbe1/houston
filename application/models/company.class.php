<?php
namespace Houston\Company\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class CompanyModel {		
	protected $app;
	public $company;

	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function loadCompany($companyName) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('companyName' => $companyName);
		$this->company = $db->companies->findOne($criteria);
		if(!empty($this->company)) { 
			return $this->company;
		} else {
			throw new \Exception('Company not found.');
		}
	}
	
	public function loadCompanyByID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('_id' => $id);
		$this->company = $db->users->findOne($criteria);
		if(!empty($this->company)) { 
			return $this->company;
		} else {
			throw new \Exception('Company not found.');
		}
	}
	
	public function unsetCompany() {
		unset($this->company);
	}
	
	public function companyExists($companyName) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('company' => $companyName);
		$company = $db->users->findOne($criteria);
		
		if(empty($company)) return false;
		return true;
	}
	
	public function generateCompany($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Create company
		$companyJSON = '{"companyName": "", "users": [{"name": ""}]}';
		$company = json_decode($companyJSON);
		
		$company->companyName = $json->company;
		$company->users[0]->name = $json->firstName.' '.$json->lastName;
		
		try {
			$collection = $db->companies;
			$collection->save($company);		
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}