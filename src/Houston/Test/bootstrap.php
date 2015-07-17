<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Session\Storage\Handler\MongoDbSessionHandler;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\SwiftmailerServiceProvider;
use Mongo\Silex\Provider\MongoServiceProvider;
use Merqlove\Silex\Provider\AirbrakeServiceProvider;

// Character encoding
mb_internal_encoding('UTF-8');
mb_detect_order(array('UTF-8', 'ASCII'));
mb_http_output('UTF-8');

// Default timezone
date_default_timezone_set('UTC');

// Define document root
define('DOCUMENT_ROOT', '/var/www/tom.houston.com/public_html/houston');
	
// Import application config
$ini_array = parse_ini_file(DOCUMENT_ROOT.'/src/config.ini');
foreach($ini_array as $key => $val) {
	define($key, $val);
}

// Require Composer autoloader
require DOCUMENT_ROOT.'/vendor/autoload.php';

// Instantiate Silex application
$app = new Application();
$app['charset'] = 'UTF-8';

// Enable raw error reporting (easier for CLI interpretation)
error_reporting(E_ALL);
ini_set('display_errors', 1);
$app['debug'] = true;
unset($app['exception_handler']);

// Register MongoDB service provider
$app->register(new MongoServiceProvider, array(
	'mongo.connections' => array(
		'default' => array(
			'server' => 'mongodb://'.MONGO_USER.':'.MONGO_PASSWORD.'@'.MONGO_HOST,
			'options' => array('connect' => true)
		)
	),
));

// Register session handling service provider
$app->register(new SessionServiceProvider());
$app['session.storage.handler'] = $app->share(function ($app) {
	return new MongoDbSessionHandler(
		$app['mongo']['default'],
		array('database' => 'houston', 'collection' => 'sessions')
	);
});

// Setup Airbrake error tracking service provider
$app->register(new AirbrakeServiceProvider(), array(
    'airbrake.api_key' => AIRBRAKE_API_KEY,
	'airbrake.options' => array(
		'secure' => false,
		'environmentName' => APP_ENV
	)
));

// Register Swiftmailer service provider
$app->register(new SwiftmailerServiceProvider());
$app['swiftmailer.options'] = array(
	'host' => SMTP_HOST,
	'port' => SMTP_PORT,
	'username' => SMTP_USERNAME,
	'password' => SMTP_PASSWORD,
	'encryption' => null,
	'auth_mode' => null
);