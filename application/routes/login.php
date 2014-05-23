<?php
$app->get('/login', function() {
    $login = new Houston\Login\Controller\LoginController();
    return $login->test();
});