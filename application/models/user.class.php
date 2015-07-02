<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class UserModel
{
	protected static $validRoles = array(
		'ADMIN',
		'AGENT',
		'USER'
	);

	protected static $validProperties = array(
		'_id',
		'emailAddress',
		'emailAddressTmp',
		'companyID',
		'password',
		'verify',
		'role',
		'firstName',
		'lastName',
		'avatar'
	);

	protected $app;
	
	public $user;

	public function __construct(Application $app, $userID = null)
	{
		$this->app = $app;

		if(isset($userID)) $this->loadUserByID($userID);
	}

	public function loadUser($username)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$this->user = $db->users->findOne(
			array('emailAddress' => $username)
		);

		if(!empty($this->user)) {
			return $this->user;
		} else {
			throw new \Exception('User not found');
		}
	}

	public function loadUserByID($userID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$id = new \MongoID($userID);

		$this->user = $db->users->findOne(
			array('_id' => $id)
		);

		if(!empty($this->user)) {
			return $this->user;
		} else {
			throw new \Exception('User not found');
		}
	}

	public function getAllUsers()
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$this->loadUserByID($this->app['session']->get('uid'));

		$companyID = new \MongoID($this->user['companyID']);

		$collection = $db->users;
		$result = $collection->find(array('companyID' => $companyID));

		$docs = array();
		foreach($result as $doc) {
			unset($doc['password']);
		    array_push($docs, $doc);
		}

		if(empty($docs)) throw new \Exception('No users found');

		return $docs;
	}

	public function getUsersByRole($roles)
	{
		if(!is_array($roles)) $roles[] = $roles;

		foreach($roles as &$role) {
			$role = strtoupper($role);
			if(!self::roleExists($role)) throw new \InvalidArgumentException('Invalid role: '.$role);
		}

		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$collection = $db->users;

		$result = $collection->find(
			array('role' => array('$all' => $roles))
		);

		$docs = array();
		foreach($result as $doc) {
			unset($doc['password']);
			array_push($docs, $doc);
		}

		return $docs;
	}

	public  static function roleExists($role)
	{
		return (in_array($role, self::$validRoles)) ? true : false;
	}

	public function setProperty($userID = null, $property, $value)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		if(!self::propertyExists($property)) throw new \InvalidArgumentException('Invalid property: '.$property);

		if(!isset($userID)) $userID = $this->user['_id'];

		$userID = new \MongoID($userID);

		try {
			$collection = $db->users;

			$collection->findAndModify(
				array('_id' => $userID),
				array('$set' => array($property => $value))
			);

			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function deleteProperty($userID, $property)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		if(!self::propertyExists($property)) throw new \InvalidArgumentException('Invalid property: '.$property);

		$userID = new \MongoID($userID);

		try {
			$collection = $db->users;

			$collection->findAndModify(
				array('_id' => $userID),
				array('$unset' => array($property => 1))
			);

			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	private static function propertyExists($property)
	{
		return (in_array($property, self::$validProperties)) ? true : false;
	}

	public static function hashPassword($password)
	{
		return password_hash($password, PASSWORD_BCRYPT);
	}

	public function rememberMeLookup($token)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$criteria = array('remember' => $token);
		$this->user = $db->users->findOne($criteria);

		$verified = (empty($this->user)) ? false : $this->user;
		return $verified;
	}

	public function rememberMeSet($username)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		// Generate 'remember me' token
		$token = self::hashPassword(rand(0,999999));
		$seriesID = self::hashPassword(rand(0,999999));
		$remember = $username.'/'.$token.'/'.$seriesID;

		try {
			$collection = $db->users;

			$collection->findAndModify(
				array('emailAddress' => $username),
				array('$set' => array('remember' => $remember))
			);

			return $remember;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function resetPassword($token, $newPassword)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$newPassword = self::hashPassword($newPassword);

		try {
			$collection = $db->users;

			$doc = $collection->findAndModify(
				array('reset' => $token),
				array('$set' => array('password' => $newPassword, 'reset' => ''))
			);

			$this->loadUser($doc['emailAddress']);
			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function resetPasswordRequest($username)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		// Generate url friendly token
		$token = \Houston\Component\Helper::urlFriendly(uniqid());

		try {
			$collection = $db->users;

			$collection->findAndModify(
				array('emailAddress' => $username),
				array('$set' => array('reset' => $token))
			);

			return $token;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public static function generateVerificationToken($username)
	{
		return md5(DEFAULT_SALT.$username);
	}

	public function isVerified($username = null, $token = null)
	{
		unset($this->user);
		
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
		$this->user = $db->users->findOne($criteria);

		$verified = (empty($this->user)) ? false : true;
		return $verified;
	}

	public function verifyAccount($username)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		try {
			$collection = $db->users;

			$collection->findAndModify(
				array('emailAddress' => $username),
				array('$set' => array('verify' => true))
			);

			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	private function saveUser($user)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		// Save user to database
		try {
			$collection = $db->users;
			$collection->save($user);
			$this->user = $user;

			return $this->user;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function registerUser($user)
	{
		// Hash password
		$user->password = self::hashPassword($user->password);

		// Generate email verification token
		$user->verify = self::generateVerificationToken($user->emailAddress);

		$user->role = 'ADMIN';

		// Save user to database
		return $this->saveUser($user);
	}

	public function addAgent($user)
	{
		// Generate email verification token
		$user->verify = self::generateVerificationToken($user->emailAddress);

		// Lookup current authenticated session company ID
		$this->loadUserByID($this->app['session']->get('uid'));
		$user->companyID = $this->user['companyID'];

		$user->role = 'AGENT';

		// Save user to database
		return $this->saveUser($user);
	}

	public function addUser($user)
	{
		// Generate email verification token
		$user->verify = self::generateVerificationToken($user->emailAddress);

		// Lookup current authenticated session company ID
		$this->loadUserByID($this->app['session']->get('uid'));
		$user->companyID = $this->user['companyID'];

		if(isset($user->clientID)) $user->clientID = new \MongoID($user->clientID);

		$user->role = 'USER';

		// Save user to database
		return $this->saveUser($user);
	}

	public function removeUser($userID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;

		$userID = new \MongoID($userID);

		try {
			$collection = $db->users;
			$collection->remove(
				array('_id' => $userID),
				array('justOne' => true)
			);

			 return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}
}
