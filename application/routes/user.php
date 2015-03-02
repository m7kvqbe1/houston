<?php
use Silex\Application;

use Houston\Controller\UserController;

$app['user.controller'] = $app->share(function() use ($app) {
	return new UserController($app);
});

$app->get('/user/self', 'user.controller:getUserSelfAction')->before($secure);

$app->get('/users', 'user.controller:getUsersAction')->before($secure);

$app->delete('/user/{userID}', 'user.controller:deleteUserAction')->before($secure);

$app->put('/user/update/{userID}/{property}', 'user.controller:putUserPropertyAction')->before($secure);

$app->delete('/user/delete/{userID}/{property}', 'user.controller:deleteUserPropertyAction')->before($secure);

$app->post('/check/email', 'user.controller:checkExistsEmailAction');

$app->post('/check/company', 'user.controller:checkExistsCompanyNameAction');