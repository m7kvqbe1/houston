<?php
// Setup application config
define('DOCUMENT_ROOT', dirname(__FILE__));
require_once(__DIR__.'/application/config.php');

// Error reporting
if(Config::ERROR_REPORTING === true) {
	error_reporting(E_ALL);
	ini_set("display_errors", 1);	
}

// Instantiate Silex
require_once(__DIR__.'/vendor/autoload.php');
$app = new Silex\Application();
$app['debug'] = true;

// Setup URL generator
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

// Setup session handling
$app->register(new Silex\Provider\SessionServiceProvider());

// Setup MongoDB connection
use Mongo\Silex\Provider\MongoServiceProvider;
$app->register(new MongoServiceProvider, array(
    'mongo.connections' => array(
        'default' => array(
            'server' => Config::MONGO_HOST,
            'options' => array("connect" => true)
        )
    ),
));

// Autoload application controllers and models - MAKE THIS WORK!
/*spl_autoload_register(null, false);
spl_autoload_extensions('.php, .class.php');

function controllerLoader($class) {
    $filename = strtolower($class) . '.class.php';
    $file = __DIR__.'/application/controllers/' . $filename;
    if (!file_exists($file))
    {
        return false;
    }
    include $file;
}
spl_autoload_register('controllerLoader');*/

// Autoload models
foreach (glob(__DIR__."/application/models/*.php") as $filename) {
    include $filename;
}

// Autoload routes & controllers
foreach (glob(__DIR__."/application/controllers/*.php") as $filename) {
    include $filename;
}

$app->run();