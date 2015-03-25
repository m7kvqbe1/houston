<?php
use Silex\Application;

use Houston\Controller\UserController;

$app['user.controller'] = $app->share(function() use ($app) {
	return new UserController($app);
});

$app->get('/api/user/self', 'user.controller:getUserSelfAction')->before($secure);

$app->get('/api/users', 'user.controller:getUsersAction')->before($secure);

$app->delete('/api/user/{userID}', 'user.controller:deleteUserAction')->before($secure);

$app->put('/api/user/update/{userID}/{property}', 'user.controller:putUserPropertyAction')->before($secure);

$app->delete('/api/user/delete/{userID}/{property}', 'user.controller:deleteUserPropertyAction')->before($secure);

$app->get('/api/check/email', 'user.controller:checkExistsEmailAction');

$app->get('/api/check/company', 'user.controller:checkExistsCompanyNameAction');
