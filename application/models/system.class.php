<?php
namespace Houston\Common;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class System {
	public static function generateAssets(Request $request, Application $app) {
		// If not authenticated serve login screen initial assets
		if(!$app['session']->get('isAuthenticated')) {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/loginapp/index.html');
		} else {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/ticketapp/index.html');
		}
		
		return $template;
	}
}