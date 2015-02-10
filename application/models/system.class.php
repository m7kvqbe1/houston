<?php
namespace Houston\Common;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class System 
{
	public static function generateAssets(Request $request, Application $app) 
	{
		// If session not authenticated serve login screen initial assets
		if(!$app['session']->get('isAuthenticated')) {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/loginapp/index.html');
		} else {
			$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/backbone/ticketapp/index.html');
		}
		
		return $template;
	}
	
	// Refactor? Move this into company model or move other methods into here
	public static function generateDatabaseIdentifier($token, $prefix = null) 
	{
		if(!isset($prefix)) $prefix = 'db_';
		return $prefix.md5(\Config::DEFAULT_SALT.$token);
	}
}