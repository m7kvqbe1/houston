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
			$docs[] = $doc;
		}

		if(isset($docs[0]['clients'])) {
			$this->client = $docs[0]['clients'];
			return $this->client;
		} else {
			return array();
		}
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
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function updateClientName($clientID, $name)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		// Load user to get authenticated users company ID
		$userModel = new UserModel($this->app, $this->app['session']->get('uid'));

		// Ensure that Client ID is a MongoID object
		$clientID = new \MongoId($clientID);

		try {
			$collection = $db->companies;

			$collection->update(
				array('_id' => $userModel->user['companyID'], 'clients._id' => $clientID),
				array('$set' => array('clients.$.name' => $name))
			);

			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function removeClient($clientID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		// Load user to get authenticated users company ID
		$userModel = new UserModel($this->app, $this->app['session']->get('uid'));

		// Ensure that Client ID is a MongoID object
		$clientID = new \MongoId($clientID);

		// Remove client
		try {
			$collection = $db->companies;

			$collection->update(
				array('_id' => $userModel->user['companyID']),
				array('$pull' => array('clients' => array('_id' => $clientID)))
			);
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}

		// Remove all users linked to client
		try {
			$collection = $db->users;

			$collection->remove(
				array('clientID' => $clientID)
			);
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}

		return true;
	}
}
