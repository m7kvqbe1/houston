<?php
namespace Houston\Component;

use Silex\Application;

use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

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
		
		\Stripe::setApiKey(STRIPE_API_KEY);
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
	
	public function fetchStripeCustomer($stripeCustomerID) {
		$this->customer = \Stripe_Customer::retrieve($stripeCustomerID);
	}
	
	public function createStripeCustomer($token, $userID, $plan = null) 
	{		
		// Load user object
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($userID);
		
		// Load company associated with user
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		// Create stripe customer
		$this->customer = \Stripe_Customer::create(array(
			'description' => $companyModel->company['companyName'],
			'card' => $token,
			'email' => $userModel->user['emailAddress'],
			'plan' => $plan
		));
		
		// Update company with stripeCustomerID
		$companyModel->setProperty($companyModel->company['_id'], 'stripeCustomerID', $this->customer->id);
		
		return $this->customer;
	}
	
	public function validSubscription($stripeCustomerID) {
		$this->fetchStripeSubscriptionPlan($stripeCustomerID);
		if(!isset($this->plan->data[0]->current_period_end) || $this->plan->data[0]->current_period_end < time()) return false; // No active subscription found
		return true;
	}
	
	public function fetchStripeSubscriptionPlan($stripeCustomerID)
	{
		$this->plan = \Stripe_Customer::retrieve($stripeCustomerID)->subscriptions->all(array('limit' => 1));
		return $this->plan;
	}
	
	public function cancelStripeSubscriptionPlan($stripeSubscriptionPlan)
	{
		$stripeSubscriptionPlan->cancel();
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
}