<?php
use Silex\Application;

use Houston\Controller\IndexController;

$app['index.controller'] = $app->share(function() use ($app) {
	return new IndexController($app);
});

// Serve assets to all routes that aren't prefixed with /api
$app->get('/{uri}', 'index.controller:indexAction')->assert('uri', '^((?!api).)*$');

$app->get('/', 'index.controller:indexAction');

$app->get('/api/session/check', 'index.controller:sessionCheckAction');