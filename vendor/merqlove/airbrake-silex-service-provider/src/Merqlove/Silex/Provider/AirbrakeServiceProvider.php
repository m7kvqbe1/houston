<?php

namespace Merqlove\Silex\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;
use Airbrake\Client;
use Airbrake\Configuration;

class AirbrakeServiceProvider implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app['airbrake.options'] = array();
        
        $app['airbrake'] = $app->share(function () use ($app) {            
            if (!isset($app['airbrake.api_key'])) {
                throw new \RuntimeException('Airbrake config must include airbrake.api_key');                      
            }

            $config = new Configuration($app['airbrake.api_key'], $app['airbrake.options']);
            return new Client($config);
        });
    }

    public function boot(Application $app)
    {
    }
}