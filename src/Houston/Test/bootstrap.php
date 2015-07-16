<?php
define('DOCUMENT_ROOT', '/var/www/tom.houston.com/public_html/houston');
	
// Import application config
$ini_array = parse_ini_file(DOCUMENT_ROOT.'/application/config.ini');
foreach($ini_array as $key => $val) {
	define($key, $val);
}

// Require Composer autoloader
require_once DOCUMENT_ROOT.'/vendor/autoload.php';

// Autoload houston components
foreach(glob(DOCUMENT_ROOT."/application/components/*.php") as $filename) {
    require_once $filename;
}

// Autoload models
foreach(glob(DOCUMENT_ROOT."/application/models/*.php") as $filename) {
    require_once $filename;
}

// Autoload controllers
foreach(glob(DOCUMENT_ROOT."/application/controllers/*.php") as $filename) {
    require_once $filename;
}