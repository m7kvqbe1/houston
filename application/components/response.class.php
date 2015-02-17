<?php
namespace Houston\Component;

use Silex\Application;

class ApiResponse
{		
	public static function error($code, $customMessage = null) 
	{
		return self::generateResponse($code, 'error', $customMessage);
	}
	
	public static function success($code, $customMessage = null) 
	{
		return self::generateResponse($code, 'success', $customMessage);
	}
	
	private static function generateResponse($code, $status, $customMessage = null) {
		if(isset($customMessage)) {
			$message = $customMessage;	
		} else {
			$message = self::fetchErrorMessage($code);	
		}
		
		return self::encodeResponse(array('code' => $code, 'status' => $status, 'message' => $message));		
	}
	
	private static function fetchErrorMessage($code) 
	{
		return constant("\Houston\Component\ErrorDefinition::$code");
	}
	
	private static function encodeResponse(array $response) 
	{
		return json_encode($response);
	}
	
	private static function setResponseHeader($code) 
	{
		switch($code) {
			default:
				break;
		}
	}
}

class ErrorDefinition
{
	const DEFAULT_RESPONSE_SUCCESS = 'DEFAULT_RESPONSE_SUCCESS';
	
	const PASSWORD_INVALID = 'The password provided is incorrect.';
	const USER_UNVERIFIED = 'This user account has not yet been verified.';
	
	const STRIPE_INVALID_SUBSCRIPTION = 'No valid subscription found.';	
}