<?php
$app->get('/', function() {
    $index = new Houston\Index\Controller\IndexController();
 
	// Serve initial assets
    return $index->generateAssets();
});