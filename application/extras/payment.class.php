<?php
namespace Houston\Extra;

use Silex\Application;
use Houston\Model\UserModel;

class Payment 
{
	private static $subscriptionPlans = array(
		1 => array('id' => 'houston-monthly', 'name' => 'Monthly Houston Subscription (Unlimited)', 'amount' => 9999, 'currency' => 'GBP'),
		2 => array('id' => 'houston-annual', 'name' => 'Annual Houston Subscription (Unlimited)', 'amount' => 12000, 'currency' => 'GBP')
	);
	
	private $app;
	
	public $token;
	public $plan;
	public $customer;
	public $charge;
	
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
		self::checkValidPlan($planID);
		$this->plan = self::$subscriptionPlans[$planID];
	}
	
	public function getToken() 
	{
		return $this->token;
	}
	
	public function setToken($token) 
	{
		$this->token = $token;
	}
	
	private static function checkValidPlan($planID) 
	{
		if(!array_key_exists($planID, self::$subscriptionPlans)) throw new \InvalidArgumentException('Invalid subscription plan');
		return true;
	}
	
	public function createStripeCustomer($token, $userID, $plan = null) 
	{		
		// Load Houston user object
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($userID);
		
		// Create stripe customer
		$this->customer = \Stripe_Customer::create(array(
			'description' => 'Houston Customer',
			'card' => $token,
			'email' => $userModel->user['emailAddress'],
			'plan' => $plan
		));
		
		// Update Houston user with stripeCustomerID
		$userModel->setProperty($userID, 'stripeCustomerID', $this->customer->id);
		
		return $this->customer;
	}
	
	public function createStripeCharge($plan = array(), $customerID = null, $token = null) 
	{	
		$this->charge = \Stripe_Charge::create(array(
			'card'	=> 	null,
			'customer' => $customerID,
			'amount' => $plan['amount'],
			'currency' => $plan['currency'],
			'description' => $plan['name']
		));
		
		return $this->charge;
	}
	
	public function fetchStripeSubscriptionPlan($stripeCustomerID)
	{
		$this->plan = \Stripe_Customer::retrieve($stripeCustomerID)->subscriptions->all(array('limit' => 1));
		return $this->plan;
	}
}