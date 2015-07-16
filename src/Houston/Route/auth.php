<?php
use Silex\Application;

use Houston\Controller\AuthController;

$app['auth.controller'] = $app->share(function() use ($app) {
	return new AuthController($app);
});

$app->get('/logout', 'auth.controller:authLogoutAction');

$app->get('/api/auth/logout', 'auth.controller:authLogoutAction');

$app->post('/api/auth/login', 'auth.controller:authLoginAction');

$app->post('/api/register', 'auth.controller:registerAction');

$app->post('/api/verify', 'auth.controller:verifyPasswordAction');

$app->get('/api/verify/{token}', 'auth.controller:verifyAction');

$app->post('/api/auth/reset', 'auth.controller:authResetAction');

$app->post('/api/auth/reset/complete', 'auth.controller:authResetCompleteAction');
