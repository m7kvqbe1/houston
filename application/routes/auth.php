<?php
use Silex\Application;

use Houston\Controller\AuthController;

$app['auth.controller'] = $app->share(function() use ($app) {
	return new AuthController($app);
});

$app->get('/auth/logout', 'auth.controller:authLogoutAction');

$app->post('/auth/login', 'auth.controller:authLoginAction');

$app->post('/register', 'auth.controller:registerAction');

$app->get('/verify/{token}', 'auth.controller:verifyAction');

$app->post('/auth/reset', 'auth.controller:authResetAction');

$app->post('/auth/reset/complete', 'auth.controller:authResetCompleteAction');