<?php
namespace Silex\Provider;
 
use Silex\Application;
use Silex\SilexEvents;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
 
class BasicAuthControllerProvider implements ControllerProviderInterface {
	public function authenticatePassword() {
		// Check password matches that stored in mongo
	}
	
	public function lookupUser() {
		// Lookup user in mongo and return user document
	}

    public function connect(Application $app) {
        // Init - OLD SCHOOL - REPLACE WITH MONGO AUTH
        $app['login.username'] = (isset($app['login.username']))? $app['login.username']: "houston";
        $app['login.password'] = (isset($app['login.password']))? $app['login.password']: "password";
        $app['login.redirect'] = (isset($app['login.redirect']))? $app['login.redirect']: "home";
        
        $app['login.basic_login_response'] = function() {
            $response = new Response();
            $response->headers->set('WWW-Authenticate', sprintf('Basic realm="%s"', 'Basic Login'));
            $response->setStatusCode(401, 'Please sign in.');
            return $response;
        };
        
        // Controllers
        $controllers = $app['controllers_factory'];
        
        // Login
        $controllers->post('/', function (Request $request, Application $app) {
            //$username = $request->server->get('PHP_AUTH_USER', false);
            //$password = $request->server->get('PHP_AUTH_PW');
            $username = $request->server->post('username');
            $password = $request->server->post('password');
            
			// Authenticate! Change to lookupUser and authenticatePassword methods!!!
            if ($app['login.username'] === $username && $app['login.password'] === $password) {
                $app['session']->set('isAuthenticated', true);
                
                //return $app->redirect($app['url_generator']->generate($app['login.redirect']));
                return $app->redirect('/');
            }
            
            //return $app['login.basic_login_response'];
            return $app->redirect('/');
        })->bind('login');
 
        // Logout
        $controllers->get('/logout', function (Request $request, Application $app) {
            $app['session']->set('isAuthenticated', false);
            
            //return $app['login.basic_login_response'];
            return $app->redirect('/');
        })->bind('logout');
 
        // Add before event
        $this->addCheckAuthEvent($app);
        return $controllers;
    }
 
    private function addCheckAuthEvent($app) {	
    	// Check login
    	$app->before( function(Request $request) use ($app) {
            if ($request->getRequestUri() === $app['url_generator']->generate('login')) {
                return;
            }
            $app['session']->get('isAuthenticated');
            if (!$app['session']->get('isAuthenticated')) {
                //$ret = $app->redirect('/');
                $ret = null;
            } else {
                $ret = null;
            }
            if ($ret instanceof Response) {
                return $ret;
            }
    	});
    }
}