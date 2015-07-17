<?php
namespace Houston\Test;

use Silex\WebTestCase as BaseWebTestCase;

class WebTestCase extends BaseWebTestCase
{
    public function createApplication()
    {
        $app = require $_SERVER['APP_DIR'] . '/src/app.php';

        return $app;
    }
}