<?php
namespace Houston\Component;

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;

class ApiResponse extends Response
{
	public static function error($code, $customMessage = null)
	{
		return self::responseFactory($code, 'error', $customMessage);
	}

	public static function success($code, $customMessage = null)
	{
		return self::responseFactory($code, 'success', $customMessage);
	}

	private static function responseFactory($code, $status, $customMessage = null)
	{
		$response = self::create();
		$response->setContent(self::generateResponseBody($code, $status, $customMessage));
		self::setResponseStatusCode($response, $code);

		return $response;
	}

	private static function generateResponseBody($code, $status, $customMessage = null)
	{
		$message = (isset($customMessage)) ? $customMessage : self::fetchErrorMessage($code);
		return self::encodeResponse(array('code' => $code, 'status' => $status, 'message' => $message));
	}

	private static function fetchErrorMessage($code)
	{
		return constant("\Houston\Component\ErrorMessageDefinition::$code");
	}

	private static function encodeResponse(array $response)
	{
		return json_encode($response);
	}

	private static function setResponseStatusCode($response, $code)
	{
		switch($code) {
			case 'DEFAULT_RESPONSE_SUCCESS':
				// 200 - Success
				$response->setStatusCode(Response::HTTP_OK);
				break;

			case 'USER_EXISTS':
			case 'COMPANY_EXISTS':
			case 'USER_NOT_FOUND':
			case 'USER_FETCH_FAIL':
			case 'USER_REMOVE_FAIL':
			case 'USER_PROPERTY_DELETE_FAIL':
			case 'USER_PROPERTY_SET_FAIL':
			case 'USER_ADD_FAIL':
			case 'USER_COMPANY_NOT_FOUND':
			case 'CLIENT_ADD_FAIL':
			case 'CLIENT_EDIT_FAIL':
			case 'CLIENT_NOT_FOUND':
			case 'FILE_NOT_FOUND':
			case 'FILE_UPLOAD_FAIL':
			case 'REPLIES_NOT_FOUND':
			case 'REPLY_FAIL':
			case 'TICKET_EDIT_FAIL':
			case 'TICKET_ADD_FAIL':
			case 'TICKET_NOT_FOUND':
			case 'ATTACHMENT_DELETE_FAIL':
				// 400 - Bad Request
				$response->setStatusCode(Response::HTTP_BAD_REQUEST);
				break;

			case 'PASSWORD_INVALID':
			case 'USER_UNVERIFIED':
			case 'INVALID_VERIFICATION_CODE':
				// 403 - Unauthorized
				$response->setStatusCode(Response::HTTP_FORBIDDEN);
				break;

			case 'STRIPE_INVALID_SUBSCRIPTION':
				// 402 - Payment Required
				$response->setStatusCode(Response::HTTP_PAYMENT_REQUIRED);
				break;

			default:
				// 200 - Success
				$response->setStatusCode(Response::HTTP_OK);
				break;
		}
	}
}

class ErrorMessageDefinition
{
	const DEFAULT_RESPONSE_SUCCESS = 'DEFAULT_RESPONSE_SUCCESS';

	const PASSWORD_INVALID = 'The password provided is incorrect.';
	const USER_UNVERIFIED = 'This user account has not yet been verified.';
	const INVALID_VERIFICATION_CODE = 'The supplied verification code is invalid.';

	const STRIPE_INVALID_SUBSCRIPTION = 'No valid subscription found.';

	const USER_EXISTS = 'This user account already exists';
	const USER_NOT_FOUND = 'The specified user does not exist.';
	const USER_FETCH_FAIL = 'No users found';
	const USER_REMOVE_FAIL = 'There was a problem removing this user.';
	const USER_PROPERTY_DELETE_FAIL = 'There was a problem removing the specified user property.';
	const USER_PROPERTY_SET_FAIL = 'There was a problem setting the specified user property.';
	const USER_ADD_FAIL = 'There was a problem creating this user.';
	const USER_COMPANY_NOT_FOUND = 'The authenticated users company could not be found.';

	const COMPANY_EXISTS = 'This company already exists';

	const CLIENT_ADD_FAIL = 'There was a problem creating this client.';
	const CLIENT_EDIT_FAIL = 'There was a problem editing this client.';
	const CLIENT_NOT_FOUND = 'The specified client(s) could not be found.';

	const FILE_NOT_FOUND = 'The specified file(s) could not be found.';
	const FILE_UPLOAD_FAIL = 'There was a problem saving the file.';

	const REPLIES_NOT_FOUND = 'No replies were found.';
	const REPLY_FAIL = 'There was a problem replying to the ticket.';

	const TICKET_EDIT_FAIL = 'There was a problem editing the ticket.';
	const TICKET_ADD_FAIL = 'There was a problem adding this ticket.';
	const TICKET_NOT_FOUND = 'The specified ticket(s) could not be found.';

	const ATTACHMENT_DELETE_FAIL = 'There was a problem deleting this attachment.';
}
