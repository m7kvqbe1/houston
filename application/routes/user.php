<?php
/*
*	Dynamically call methods within the relevant controller based on route.
*	These routes will have to be defined for GET, POST, PUT, DELETE functionality
*
*/

$app->get('/user', function() {
	$user = new Houston\User\Controller\UserController();
	return $user->test();
	
	// Service initial content for this view
});

$app->get('/user/{method}', function(Silex\Application $app, $method) {
	// Instantiate controller
    $user = new Houston\User\Controller\UserController();
    
    // Check if method exists
    if(method_exists($user, $method)) {
    	// Call method dynamically based on route
		return $user->{$method}('Bar');
    };    
});