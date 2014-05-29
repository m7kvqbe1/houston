<?php
$app->get('/', function() {
    $index = new Houston\Index\Controller\IndexController();
    
	// Serve initial content
    return $index->buildPayload();
});