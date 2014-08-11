<?php
namespace Houston\User\Model;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class UserModel {
	public static function hashPassword($password) {
		return $password;
	}
}