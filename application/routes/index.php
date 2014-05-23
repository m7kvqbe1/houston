<?php
$app->get('/', function() {
    $foo = new Houston\Index\Controller\IndexController();
    return $foo->test();
    
    // Serve initial content
});