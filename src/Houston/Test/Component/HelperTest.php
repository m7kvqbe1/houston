<?php
namespace Houston\Tests;
	
use Houston\Component\Helper;

class HelperTest extends \PHPUnit_Framework_TestCase
{
	public function testUrlFriendly()
	{
		$result = Helper::urlFriendly(' Hello!!!%%  %World');
		
		$this->assertEquals('hello-world', $result);
	}
	
	public function testHexToBin()
	{
		$result = Helper::hexToBin('0A2B');
		
		$this->assertEquals(pack('h*', '0A2B'), $result);
	}
	
	public function testObjectToArray() 
	{
		$obj = new \stdClass();
		$obj->testProperty = 'test';
		
		$result = Helper::objectToArray($obj);
		
		$this->assertEquals(array('testProperty' => 'test'), $result);
	}
	
	public function testCreateZipArchive() 
	{
		$files = array(
			0 => array(
				'fileName' => 'test', 
				'data' => 'data'
			)
		);
		
		$filename = 'test-archive.zip';
		$expectedPath = DOCUMENT_ROOT . '/tmp/zip/' . 'test-archive.zip';
		
		$result = Helper::createZipArchive($files, $filename);
		
		$this->assertEquals($result, $result);
		
		if(file_exists($result)) {
			unlink($result);
			$this->assertTrue(true);
		} else {
			$this->assertTrue(false);
		}
	}
}
