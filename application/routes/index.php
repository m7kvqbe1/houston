<?php
use Silex\Application;

use Houston\Controller\IndexController;

$app['index.controller'] = $app->share(function() use ($app) {
	return new IndexController($app);
});

$app->get('/', 'index.controller:indexAction');

$app->get('/api', 'index.controller:apiIndexAction');