<?php
// Serve initial assets
$app->get('/', 'Houston\Index\Controller\\IndexController::generateAssets');