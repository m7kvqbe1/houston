<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;	

use Houston\Extra\Payment;

// Charge payment to customer - Combine controller code with registration controller!
$app->post('/payment/charge', function(Request $request, Application $app) {
	$data = json_decode(file_get_contents('php://input'));
	
	$payment = new Payment($app);
	
	$payment->setPlan($data->plan);
	
	$payment->setToken($data->token);
	
	try {
		$customer = $payment->createStripeCustomer($payment->token, '54c7c89dd21a58416e3b8941', $payment->plan['id']);	// Hard coded user object MongoID for the purpose of testing
		return $customer->__toJSON();
	} catch(\Stripe_Error $e) {
		$body = $e->getJsonBody();
		return json_encode($body['error']);
	}
});

// Create stripe customer with relevant subscription plan - Complete

// Update Houston user with stripeCustomerID - Complete

// On login check that stripe customer has valid subscription if not redirect to payment page