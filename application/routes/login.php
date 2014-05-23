<?php
/*
*	Dynamically call methods within the relevant controller based on route.
*	These routes will have to be defined for GET, POST, PUT, DELETE functionality
*
*/

$app->get('/login', function() {
	$login = new Houston\Login\Controller\LoginController();
	return $login->test();
	
	// Service initial content for this view
});

$app->get('/login/{method}', function(Silex\Application $app, $method) {
	// Instantiate controller
    $login = new Houston\Login\Controller\LoginController();
    
    // Check if method exists
    if(method_exists($login, $method)) {
    	// Call method dynamically based on route
		return $login->{$method}('Hello World');    
    };    
});