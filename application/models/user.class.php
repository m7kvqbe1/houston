<?php
namespace Houston\User\Model;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class UserModel {
	protected $app;
	public $user;
	
	public function __construct(Application $app) {		
		$this->app = $app;
	}
	
	public function loadUser($username) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('emailAddress' => $username);
		$this->user = $db->users->findOne($criteria);
		if(!empty($this->user)) { 
			return $this->user;
		} else {
			throw new Exception('User not found.');
			return false;
		}
	}
	
	public function unsetUser() {
		unset($this->user);
	}

	public static function hashPassword($password) {
		$password = crypt($password, DEFAULT_SALT);
		return $password;
	}
	
	public static function generateVerificationToken($username) {
		return md5(DEFAULT_SALT.$username);
	}
	
	public function verified($username = null) {
		if(!isset($username)) $username = $this->user['emailAddress'];
		
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Check if user exists and password matches
		$criteria = array('emailAddress' => $username, 'verify' => true);
		$user = $db->users->findOne($criteria);
		
		$verified = (empty($user)) ? false : true; 
		return $verified;
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