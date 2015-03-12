<?php
use Silex\Application;

use Houston\Controller\IndexController;

$app['index.controller'] = $app->share(function() use ($app) {
	return new IndexController($app);
});

$app->get('/', 'index.controller:indexAction');

// Serve all routes that aren't prefixed with /api with indexAction method
$app->get('/{uri}', 'index.controller:indexAction')->assert('uri', '^((?!api).)*$');