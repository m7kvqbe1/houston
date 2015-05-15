<?php
use Silex\Application;

use Houston\Controller\PeopleController;

$app['people.controller'] = $app->share(function() use ($app) {
	return new PeopleController($app);
});

$app->get('/api/companies', 'people.controller:getCompaniesAction')->before($secure);

$app->get('/api/clients', 'people.controller:getClientsAction')->before($secure);

$app->post('/api/clients', 'people.controller:postClientAction')->before($secure);

$app->delete('/api/clients/{clientID}', 'people.controller:deleteClientAction')->before($secure);

$app->put('/api/clients/{clientID}', 'people.controller:putClientAction')->before($secure);

$app->post('/api/agents', 'people.controller:postAgentAction')->before($secure);

$app->post('/api/user', 'people.controller:postUserAction')->before($secure);