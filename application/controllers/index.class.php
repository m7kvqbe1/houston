<?php
namespace Houston\Index\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class IndexController {
	public function test() {
		print_r($_SESSION);
		
		return 'DefaultController';
	}
}