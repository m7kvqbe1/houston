<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

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
		$this->plan = self::$availablePlans[$planId];
	}
	
	private function getToken() 
	{
		return $this->token;
	}
	
	public function setToken($token) 
	{
		$this->token = $token;
	}
	
	public function generateStripeCharge() 
	{
		$this->charge = \Stripe_Charge::create(array(
			'card'	=> 	$this->token,
			'amount' => $this->plan['amount'],
			'currency' => $this->plan['currency'],
			'description' => $this->plan['name']
		));
		
		return $this->charge;
	}
}