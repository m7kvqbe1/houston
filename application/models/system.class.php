<?php
namespace Houston\Core;

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
	
	public static function generateDatabaseIdentifier($token, $prefix = null) 
	{
		if(!isset($prefix)) $prefix = 'db_';
		return $prefix.md5(\Config::DEFAULT_SALT.$token);
	}
	
	public static function setupSession(Application $app, $authenticated = false, $database, $uid, $cid) 
	{
		$app['session']->set('isAuthenticated', $authenticated);
		$app['session']->set('database', $database);
	    $app['session']->set('uid', $uid);
	    $app['session']->set('cid', $cid);	
	}
	
	public static function destroySession(Application $app) 
	{
		$app['session']->set('isAuthenticated', false);
		$app['session']->set('database', '');
		$app['session']->set('uid', '');
		$app['session']->set('cid', '');
	}
}