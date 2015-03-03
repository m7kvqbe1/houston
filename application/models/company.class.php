<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class CompanyModel 
{		
	protected static $validProperties = array('_id', 'companyName', 'database', 'stripeCustomerID');
	
	protected $app;
	public $company;

	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function loadCompanyByID($companyID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
			
		$companyID = new \MongoID($companyID);
		
		$this->company = $db->companies->findOne(array('_id' => $companyID));
		
		if(!empty($this->company)) {			
			return $this->company;
		} else {
			throw new \Exception('Company not found');
		}
	}
	
	private static function propertyExists($property) 
	{
		if(!in_array($property, self::$validProperties)) return false;		
		return true;
	}
	
	public function setProperty($companyID, $property, $value)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		if(!self::propertyExists($property)) throw new \InvalidArgumentException('Invalid property');
		
		$companyID = new \MongoID($companyID);
		
		try {
			$collection = $db->companies;
			$collection->findAndModify(array('_id' => $companyID), array('$set' => array($property => $value)));
			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}
	
	public function updateDatabaseIdentifier($companyID, $identifier) 
	{	
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$companyID = new \MongoID($companyID);
		
		try {
			$collection = $db->companies;
			$collection->findAndModify(array('_id' => $companyID), array('$set' => array('database' => $identifier)));
			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		} 	
	}
	
	public function companyExists($companyName) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('companyName' => $companyName);
		$company = $db->companies->findOne($criteria);
		
		return (!empty($company)) ? true : false;
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
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}
}