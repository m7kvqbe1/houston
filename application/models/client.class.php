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
		
		if(empty($docs)) return false;
		
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
			return true;
		} catch(MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
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
		} catch(MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
		
		// Remove all users linked to client
		try {
			$collection = $db->users;			
			$collection->remove(
				array('clientID' => $id)
			);
		} catch(MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
		
		return true;
	}
}