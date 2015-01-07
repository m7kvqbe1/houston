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
			throw new \Exception('Company not found');
		}
	}
	
	public function loadCompanyByID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		$this->companies = $db->companies->findOne(array('_id' => new \MongoId($id)));
		
		if(!empty($this->company)) {			
			return $this->company;
		} else {
			throw new \Exception('Ticket not found');
		}
	}
	
	/*DEPRECATEDpublic function loadCompanyByUserID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		//$id = new \MongoId($id);
		
		$cursor = $db->company->find(
			array('users' =>
				array('$elemMatch' => 
					array('userID' => $id)))
		);
		
		$this->company = iterator_to_array($cursor);
		
		if(!empty($this->company)) { 
			return $this->company;
		} else {
			throw new \Exception('Company not found');
		}
	}*/
	
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
	
	/*DEPRECATEDpublic function linkUser($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		// Load company based on authenticated session user ID
		$this->loadCompanyByUserID($this->app['session']->get('u'));
		
		// Add new user ID to company users array
		try {
			$collection = $db->companies;
			
			$id = new \MongoID($id);
			$companyID = new \MongoID($this->company->_id);
			
			$collection->update(array('_id' => $companyID), array('$push' => array('users' => $id)));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}*/
}