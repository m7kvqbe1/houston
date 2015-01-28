<?php
namespace Houston\Extra;

use Silex\Application;
use Houston\Model\UserModel;

class Payment 
{
	private static $availablePlans = array(
		1 => array('name' => 'Houston Unlimited Monthly', 'amount' => 1000, 'currency' => 'USD'),
		2 => array('name' => 'Houston Unlimited Annual', 'amount' => 12000, 'currency' => 'USD')
	);
	
	private $app;
	private $token;

	public $plan;
	public $charge;
	public $customer;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
		
		\Stripe::setApiKey(\Config::STRIPE_API_KEY);
	}
	
	public function getPlan() 
	{
		return $this->plan;
	}
	
	public function setPlan($planID) 
	{
		$planID = (int) $planID;
		if(!array_key_exists($planID, self::$availablePlans)) throw new \UnexpectedValueException('Invalid subscription plan');
		$this->plan = self::$availablePlans[$planID];
	}
	
	public function getToken() 
	{
		return $this->token;
	}
	
	public function setToken($token) 
	{
		$this->token = $token;
	}
	
	public function fetchStripeCustomer($userID) 
	{
		
	}
	
	public function createStripeCustomer() 
	{
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID('54c7c89dd21a58416e3b8941');	// Hard coded MongoID for the purposes of testing
		
		// Create stripe customer
		$this->customer = \Stripe_Customer::create(array(
			'description' => 'Houston Customer',
			'card' => $this->token,
			'email' => $userModel->user['emailAddress']
		));
		
		// Update Houston user with stripeCustomerID
		$userModel->setProperty('54c7c89dd21a58416e3b8941', 'stripeCustomerID', $this->customer->id);		// Hard coded MongoID for the purposes of testing
		
		return $this->customer;
	}
	
	public function createStripeCharge() 
	{	
		if(!isset($this->customer->id)) throw new \Exception('Customer not found');
		
		if(!isset($this->plan)) throw new \Exception('Subscription plan not found');
		
		$this->charge = \Stripe_Charge::create(array(
			'card'	=> 	null,
			'customer' => $this->customer->id,
			'amount' => $this->plan['amount'],
			'currency' => $this->plan['currency'],
			'description' => $this->plan['name']
		));
		
		return $this->charge;
	}
}