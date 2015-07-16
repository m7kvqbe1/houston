<?php
namespace Houston\Tests;

use Silex\Application;
use Houston\Component\Notify;
use Houston\Model\UserModel;

class NotifyTest extends \PHPUnit_Framework_TestCase
{
	public function testSocketBroadcast()
	{		
		$payload = new \stdClass();
		
		$payload->attachments = 'data';
		$payload->message = 'test';
		
		$result = Notify::socketBroadcast('/update/users', $payload, '559fac2fd21a58a623636995');
		$this->assertEquals('', $result);
	}
}
