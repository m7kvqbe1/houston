<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;	

use Houston\Extra\Payment;

// Charge payment to customer
$app->post('/payment/charge', function(Request $request, Application $app) {
	$data = json_decode(file_get_contents('php://input'));
	
	$payment = new Payment($app);
	
	$payment->setPlan($data->plan);
	
	$payment->setToken($data->token);
	
	$return = $payment->generateStripeCharge();
	$return = str_replace('Stripe_Charge JSON: ', '', $return);
	return json_encode($return);
	
	// Store last charge data against company / user object
});