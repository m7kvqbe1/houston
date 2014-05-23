<?php
namespace Houston\Login\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class LoginController {
	public function test() {
		return 'LoginController';
	}
	
	public function foo($arg) {
		return $arg;
	}
}