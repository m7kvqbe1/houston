<?php
namespace Houston\Model;

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
			throw new \Exception('User not found');
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
			throw new \Exception('User not found');
		}
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
		
		$verified = (empty($user)) ? false : $user; 
		return $verified;
	}
	
	public function rememberMeSet($username) {
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
	
	public function resetPassword($token, $newPassword) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;		
		
		$newPassword = $this::hashPassword($newPassword);
		
		try {
			$collection = $db->users;						
			$doc = $collection->findAndModify(array('reset' => $token), array('$set' => array('password' => $newPassword, 'reset' => '')));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
		
		$this->loadUser($doc['emailAddress']);
	}
	
	public function resetPasswordRequest($username) {		
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Generate url friendly token
		$token = $this::hashPassword(rand(0,999999));
		$token = \Houston\Extra\Helper::urlFriendly($token);
		
		try {
			$collection = $db->users;						
			$collection->findAndModify(array('emailAddress' => $username), array('$set' => array('reset' => $token)));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
		
		return $token;
	}
	
	public static function generateVerificationToken($username) {
		return md5(\Config::DEFAULT_SALT.$username);
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
	
	public function saveUser($user) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		try {
			$collection = $db->users;
		    $collection->save($user);
		} catch(MongoConnectionException $e) {
		    die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
		    die('Error: '.$e->getMessage());
		}
	}
	
	public function registerUser($user) {		
		// Hash password
		$user->password = $this->hashPassword($user->password);
		
		// Generate email verification token
		$user->verify = $this->generateVerificationToken($user->emailAddress);
		
		$user->role = 'ADMIN';
		
		// Save user to database
		$this->saveUser($user);
	}
	
	public function addAgent($user) {
		// Generate email verification token
		$user->verify = $this->generateVerificationToken($user->emailAddress);
		
		// Lookup current authenticated session company ID
		$this->loadUserByID($this->app['session']->get('u'));
		$user->companyID = $this->user['companyID'];
		
		$user->role = 'AGENT';
				
		// Save user to database
		$this->saveUser($user);
	}
	
	public function addUser($user) {
		// Generate email verification token
		$user->verify = $this->generateVerificationToken($user->emailAddress);
		
		// Lookup current authenticated session company ID
		$this->loadUserByID($this->app['session']->get('u'));
		$user->companyID = $this->user['companyID'];
		
		if(isset($user->clientID)) $user->clientID = new \MongoId($user->clientID);
		
		$user->role = 'USER';
				
		// Save user to database
		$this->saveUser($user);		
	}
	
	public function removeUser($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$id = new \MongoId($id);
		
		try {
			$collection = $db->users;			
			$collection->remove(
				array('_id' => $id),
				array('justOne' => true)
			);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}

	public function getAgents() {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Lookup current authenticated session company ID
		$this->loadUserByID($this->app['session']->get('u'));
		
		$users = $db->users;
		$result = $users->find(array('companyID' => $this->user['companyID'], 'role' => array('$in' => array('AGENT', 'ADMIN'))));
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		return json_encode($docs);
	}	
}