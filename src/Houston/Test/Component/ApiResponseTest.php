<?php
namespace Houston\Tests;
	
use Symfony\Component\HttpFoundation\Response;
use Houston\Component\ApiResponse;

class ApiResponseTest extends \PHPUnit_Framework_TestCase
{
	public function testErrorResponse()
	{
		$response = ApiResponse::error('USER_ADD_FAIL');
		
		$this->assertInstanceOf('Symfony\Component\HttpFoundation\Response', $response);
	}
	
	public function testSuccessResponse()
	{
		$response = ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		
		$this->assertInstanceOf('Symfony\Component\HttpFoundation\Response', $response);
	}
}
