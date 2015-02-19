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
		$message = (isset($customMessage)) ? $customMessage : self::fetchErrorMessage($code);		
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
	
	const ATTACHMENT_DELETE_FAIL = 'There was a problem deleting this attachment.';
	
	const USER_NOT_FOUND = 'The specified user does not exist.';
	const USER_REMOVE_FAIL = 'There was a problem removing this user.';
}