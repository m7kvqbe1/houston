<?php
namespace Houston\Base\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

abstract class HoustonController {
	public $id;
	
	public function getID() {
		return $this->id;
	}
	
	public function setID($id) {
		$this->id = $id;
		return $this->id;
	}
}