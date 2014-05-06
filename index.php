<?php
require_once(__DIR__.'/system/silex/autoload.php');

$app = new Silex\Application();

// Check authenticated session

// Routes instantiate relevant controller dynamically and feet it input

// Default controller used to push assets down to browser

$app->get('/', function() {
    return 'Hello Houston!';
});




$app->run();