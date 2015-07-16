<?php
define('DOCUMENT_ROOT', '/var/www/tom.houston.com/public_html/houston');
	
// Import application config
$ini_array = parse_ini_file(DOCUMENT_ROOT.'/src/config.ini');
foreach($ini_array as $key => $val) {
	define($key, $val);
}

// Require Composer autoloader
require_once DOCUMENT_ROOT.'/vendor/autoload.php';