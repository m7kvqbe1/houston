<?php
// Start timer for profiling
define('PHP_START', microtime(true));

// Import application config
$ini_array = parse_ini_file(__DIR__ . '/config.ini');
foreach($ini_array as $key => $val) {
	define($key, $val);
}