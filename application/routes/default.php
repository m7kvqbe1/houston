<?php
$app->get('/', function() {
    $foo = new Houston\Index\Controller\IndexController();
    return $foo->test();
    
    call_user_func();
});