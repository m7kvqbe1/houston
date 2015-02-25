<?php
namespace Houston\Component;

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;

// Extend Symfony response component

// Generate new response via factory method (generateResponse)

// Create and couple response body

// Set response HTTP status code

// Return response object

class ApiResponse extends Response
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
	const INVALID_VERIFICATION_CODE = 'The supplied verification code is invalid.';
	
	const STRIPE_INVALID_SUBSCRIPTION = 'No valid subscription found.';	
	
	const ATTACHMENT_DELETE_FAIL = 'There was a problem deleting this attachment.';
	
	const USER_NOT_FOUND = 'The specified user does not exist.';
	const USER_FETCH_FAIL = 'No users found';
	const USER_REMOVE_FAIL = 'There was a problem removing this user.';
	const USER_PROPERTY_DELETE_FAIL = 'There was a problem removing the specified user property.';
	const USER_PROPERTY_SET_FAIL = 'There was a problem setting the specified user property.';
	const USER_ADD_FAIL = 'There was a problem creating this user.';
	const USER_COMPANY_NOT_FOUND = 'The authenticated users company could not be found.';
	
	const CLIENT_ADD_FAIL = 'There was a problem creating this client.';
	const CLIENT_NOT_FOUND = 'The specified client(s) could not be found.';
	
	const FILE_NOT_FOUND = 'The specified file(s) could not be found.';
	const FILE_UPLOAD_FAIL = 'There was a problem saving the file.';
	
	const REPLIES_NOT_FOUND = 'No replies were found.';	
	const REPLY_FAIL = 'There was a problem replying to the ticket.';
	
	const TICKET_EDIT_FAIL = 'There was a problem editing the ticket.';
	const TICKET_ADD_FAIL = 'There was a problem adding this ticket.';
	const TICKET_NOT_FOUND = 'The specified ticket(s) could not be found.';	
}