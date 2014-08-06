<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

// Setup application constants
define('DOCUMENT_ROOT', dirname(__FILE__));

// Instantiate Silex
require_once(__DIR__.'/system/silex/autoload.php');
$app = new Silex\Application();
$app['debug'] = true;


$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\SessionServiceProvider());

// Autoload application controllers and models
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

// Autoload controllers
foreach (glob(__DIR__."/application/controllers/*.php") as $filename) {
    include $filename;
}

// Autoload models
foreach (glob(__DIR__."/application/models/*.php") as $filename) {
    include $filename;
}

// Autoload routes
foreach (glob(__DIR__."/application/routes/*.php") as $filename) {
    include $filename;
}

$app->run();