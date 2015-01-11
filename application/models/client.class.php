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
	
	public function addClient($client) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new \Houston\User\Model\UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		// Generate unique MongoId for new client
		$client->_id = new \MongoId();
		
		try {
			$collection = $db->companies;			
			$collection->update(
				array('_id' => $userModel->user['companyID']), 
				array('$push' => array('clients' => $client))
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
		$userModel = new \Houston\User\Model\UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		$collection = $db->companies;
		$result = $collection->find(
			array('_id' => $userModel->user['companyID']),
			array('clients' => 1, '_id' => 0)
		);
		
		$docs = array();
		foreach($result as $doc) {
			array_push($docs, $doc);
		}
		
		if(isset($docs[0]['clients'])) $this->client = $docs[0]['clients'];
		
		return $this->client;
	}
	
	public function getUsersByClientID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$id = new \MongoId($id);
		
		$collection = $db->users;
		$result = $collection->find(
			array('clientID' => $id)
		);
		
		$docs = array();
		foreach($result as $doc) {
			array_push($docs, $doc);
		}
		
		return $docs;
	}
	
	public function removeClient($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new \Houston\User\Model\UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('u'));
		
		$id = new \MongoId($id);
		
		// Remove client
		try {
			$collection = $db->companies;			
			$collection->update(
				array('_id' => $userModel->user['companyID']), 
				array('$pull' => array('clients' => array('_id' => $id)))
			);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
		
		// Remove all users linked to client
		try {
			$collection = $db->users;			
			$collection->remove(
				array('clientID' => $id)
			);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}