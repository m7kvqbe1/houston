<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class CompanyModel 
{		
	protected $app;
	public $company;

	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function loadCompany($companyName) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('companyName' => $companyName);
		$this->company = $db->companies->findOne($criteria);
		if(!empty($this->company)) { 
			return $this->company;
		} else {
			throw new \Exception('Company not found');
		}
	}
	
	public function loadCompanyByID($id) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
			
		$id = new \MongoId($id);
		
		$this->company = $db->companies->findOne(array('_id' => $id));
		
		if(!empty($this->company)) {			
			return $this->company;
		} else {
			throw new \Exception('Company not found');
		}
	}
	
	public function companyExists($companyName) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('company' => $companyName);
		$company = $db->users->findOne($criteria);
		
		if(empty($company)) return false;
		return true;
	}
	
	public function generateCompany($json) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Create company
		$companyJSON = '{"companyName": ""}';
		$company = json_decode($companyJSON);
		
		$company->companyName = $json->company;
		
		try {
			$collection = $db->companies;
			$collection->save($company);
			
			$this->company = $company;
			return $this->company;
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}