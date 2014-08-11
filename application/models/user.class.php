<?php
namespace Houston\User\Model;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class UserModel {
	public static function hashPassword($password) {
		$salt = 'Adfkjasf93482394!!';
		$password = crypt($password, $salt);
		return $password;
	}
}