<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;	

use Houston\Extra\Payment;

// Charge payment to customer - Move to become part of registration controller!
$app->post('/payment/charge', function(Request $request, Application $app) {
	$data = json_decode(file_get_contents('php://input'));
	
	$payment = new Payment($app);
	
	$payment->setPlan($data->plan);
	
	$payment->setToken($data->token);
	
	$payment->createStripeCustomer();
	
	print_r($payment->customer);
	
	//$charge = $payment->createStripeCharge();
	//$return = str_replace('Stripe_Charge JSON: ', '', $return);
	//return json_encode($return);
	
	return 'hello world';
});

// Create user account

// Create Stripe customer

// Charge Stripe customer

// On login check that stripe customer has valid subscription