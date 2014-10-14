<?php
namespace Houston\Company\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class CompanyModel {		
	protected $app;

	public function __construct(Application $app) {
		$this->app = $app;
	}
}