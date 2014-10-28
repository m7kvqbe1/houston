<?php
namespace Houston\User\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

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
		}
	}
	
	public function loadUserByID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('_id' => $id);
		$this->user = $db->users->findOne($criteria);
		if(!empty($this->user)) { 
			return $this->user;
		} else {
			throw new Exception('User not found.');
		}
	}
	
	public function unsetUser() {
		unset($this->user);
	}

	public static function hashPassword($password) {
		$password = crypt($password, \Config::DEFAULT_SALT);
		return $password;
	}
	
	public function rememberMeLookup($token) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('remember' => $token);
		$user = $db->users->findOne($criteria);
		
		$verified = (empty($user)) ? false : true; 
		return $verified;
	}
	
	public function rememberMe($username) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Generate 'remember me' token
		$token = $this::hashPassword(rand(0,999999));
		$seriesID = $this::hashPassword(rand(0,999999));
		$remember = $username.'/'.$token.'/'.$seriesID;
				
		try {
			$collection = $db->users;						
			$collection->findAndModify(array('emailAddress' => $username), array('$set' => array('remember' => $remember)));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
		
		return $remember;
	}
	
	public static function generateVerificationToken($username) {
		return md5(DEFAULT_SALT.$username);
	}
	
	public function isVerified($username = null, $token = null) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		if(isset($token)) {
			$criteria = array('verify' => $token);
			$this->user = $db->users->findOne($criteria);
			return;
		}
		
		if(!isset($username)) $username = $this->user['emailAddress'];
		
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
	
	public function registerUser($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Hash password
		$json->password = $this->hashPassword($json->password);
		
		// Generate email verification token
		$json->verify = $this->generateVerificationToken($json->emailAddress);
		
		// Save user to database
		try {
			$collection = $db->users;
		    $collection->save($json);
		} catch(MongoConnectionException $e) {
		    die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
		    die('Error: '.$e->getMessage());
		}
	}
	
	
	// DEPRECATED
	public function getCompanyName($userID) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$criteria = array('_id' => $userID);
		$user = $db->users->findOne($criteria);

		return $user['company'];
	}
}