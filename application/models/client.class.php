<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\UserModel;

class ClientModel 
{
	protected $app;
	public $client;

	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function getClients() 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));
		
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
	
	public function addClient($client) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));
		
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
	
	public function removeClient($id) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Load user to get authenticated users company ID
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));
		
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