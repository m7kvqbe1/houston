<?php
// Purge all Houston data from MongoDB	
require_once('../../index.php');

$connections = $app['mongo'];

$db = $connections['default'];
$db = $db->houston;

try {	
	$collection = $db->replies;
	$collection->remove(array());
	
	$collection = $db->tickets;
	$collection->remove(array());
	
	$collection = $db->users;
	$collection->remove(array());
	
	$collection = $db->companies;
	$collection->remove(array());
	
	$gridfs = $db->getGridFS();
	$gridfs->remove(array());
} catch(MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch(MongoException $e) {
	die('Error: '.$e->getMessage());
}