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
		
		try {
			$collection = $db->clients;
			$collection->save($json);		
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}