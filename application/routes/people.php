<?php
use Silex\Application;

use Houston\Controller\PeopleController;

$app['people.controller'] = $app->share(function() use ($app) {
	return new PeopleController($app);
});

$app->get('/companies', 'people.controller:getCompaniesAction')->before($secure);

$app->get('/clients', 'people.controller:getClientsAction')->before($secure);

$app->post('/clients', 'people.controller:postClientAction')->before($secure);

$app->post('/user', 'people.controller:postUserAction')->before($secure);

$app->delete('/client/{clientID}', 'people.controller:deleteClientAction')->before($secure);

$app->post('/agents', 'people.controller:postAgentAction')->before($secure);