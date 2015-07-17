<?php
namespace Houston\Test;

use Silex\WebTestCase;

class IndexControllerTest extends WebTestCase
{	
	public function createApplication()
	{
		return require __DIR__ . '/../bootstrap.php';
	}
}
