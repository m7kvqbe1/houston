<?php
namespace Houston\Index\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class IndexController {
	public function generateAssets(Request $request, Application $app) {
		// If not authenticated serve login screen initial assets
		if(!$app['session']->get('isAuthenticated')) {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/ticketapp/index.html');
		} else {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/loginapp/index.html');
		}
		
		return $template;
	}
}