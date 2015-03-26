<?php
require __DIR__.'../../components/mailbox.class.php';
use Houston\Component;

class MailboxTest extends PHPUnit_Framework_TestCase
{
	public function testConnectionInvalidArgument()
	{
		$mailbox = new \Houston\Component\MailboxExtended();
		$inbox = $mailbox->connect();

		$this->assertEquals(1, $inbox);
	}
}
