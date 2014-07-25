<?php
namespace Houston\User\Model\UserModel;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class UserModel {
	public function lookupUser($username) {
		$c_users = $db->users;
		return $c_users;
	}
	
	public function checkPassword() {
		
	}
}