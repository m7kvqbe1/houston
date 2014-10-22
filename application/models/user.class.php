<?php
namespace Houston\User\Model;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class UserModel {
	protected $app;
	
	public function __construct(Application $app) {		
		$this->app = $app;
	}

	public static function hashPassword($password) {
		$password = crypt($password, DEFAULT_SALT);
		return $password;
	}
	
	public static function generateVerificationToken($username) {
		return md5(DEFAULT_SALT.$username);
	}
	
	public function verifyAccount($username) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {
			$collection = $db->users;						
			$collection->findAndModify(array('emailAddress' => $username), array('$set' => array('verify' => true)));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function getCompanyName($userID) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('_id' => $userID);
		$user = $db->users->findOne($criteria);

		return $user['company'];
	}
}