<?php
namespace Houston\Client\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class ClientModel {
	protected $app;
	public $client;

	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function addClient($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new \Houston\User\Model\UserModel();
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		// Generate unique MongoId for new client
		$json->_id = new \MongoId();
		
		try {
			$collection = $db->companies;			
			$collection->update(
				array('_id' => $userModel->user['companyID']), 
				array('$push' => array('clients' => $json))
			);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function getClients() {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new \Houston\User\Model\UserModel();
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		$collection = $db->companies;
		$result = $collection->find(
			array('_id' => $userModel->user['companyID']),
			array('clients' => 1, '_id' => -1)
		);
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		$docs = json_encode($docs);
		
		return $docs;
	}
}