<?php
die('Access Denied');

$user = array(
	'user' => 'tom@muska.co.uk',
	'password' => 'password',
	'first_name' => 'Tom',
	'last_name' => 'Humphris'
);

// Config
$database = 'houston';

// Connect to test database
$m = new MongoClient("mongodb://localhost");
$db = $m->$database;

// Get the users collection
$c_users = $db->users;

// Insert this new document into the users collection
$c_users->save($user);

$cursor = $db->users->find();
foreach($cursor as $document) {
	echo $document['first_name'];
}