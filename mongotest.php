<?php
$user = array(
	'first_name' => 'MongoDB',
	'last_name' => 'Fan',
	'tags' => array('developer','user')
);

// Config
$host = 'localhost';
$database = 'test';

// Connect to test database
$m = new Mongo("mongodb://$host");
$db = $m->$database;

// Get the users collection
$c_users = $db->users;

// Insert this new document into the users collection
//$c_users->save($user);

$cursor = $db->users->find();
foreach($cursor as $document) {
	echo $document['first_name'];
} 