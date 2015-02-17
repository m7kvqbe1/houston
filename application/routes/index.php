<?php
use Silex\Application;

use Houston\Controller\IndexController;

use Houston\Component\ApiResponse;

$app['index.controller'] = $app->share(function() use ($app) {
	return new IndexController($app);
});

$app->get('/', 'index.controller:indexAction');