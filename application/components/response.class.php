<?php
namespace Houston\Components;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponse extends Response {
	protected $app;
	
	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function error($code, $customMessage = null) {
		if(isset($customMessage)) $message = $customMessage;
		return self::encodeResponse(array('code' => $code, 'status' => 'error', 'message' => $message));
	}
	
	public function success($code, $customMessage = null) {
		if(isset($customMessage)) $message = $customMessage;
		return self::encodeResponse(array('code' => $code, 'status' => 'success', 'message' => $message));
	}
	
	public function fetchErrorMessage($code) {
		
	}
	
	public function setResponseHeader($code) {
		switch($code) {
			default:
				break;
		}
	}
	
	public static function encodeResponse(array $response) {
		return json_encode($response);
	}
}