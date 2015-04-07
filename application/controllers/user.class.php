<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Component\ApiResponse;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

class UserController
{
	protected $app;

	public function __construct(Application $app)
	{
		$this->app = $app;
	}

	public function getUserSelfAction()
	{
		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));

		// Add company name to user JSON returned to backbone
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		$userModel->user['companyName'] = $companyModel->company['companyName'];

		if(!isset($userModel->user)) return ApiResponse::error('USER_NOT_FOUND');

		unset($userModel->user['password']);

		return json_encode($userModel->user);
	}

	public function putUserSelfAction()
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);
		$userModel->loadUserByID($this->app['session']->get('uid'));

		if(!isset($userModel->user)) return ApiResponse::error('USER_NOT_FOUND');

		// First Name
		$userModel->setProperty(null, 'firstName', $data->firstName);

		// Last Name
		$userModel->setProperty(null, 'lastName', $data->lastName);

		// Avatar
		$userModel->setProperty(null, 'avatar', $data->avatar);

		// Email Address
		if($data->emailAddress === $userModel->user['emailAddress']) return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		$userModel->setProperty(null, 'emailAddressTmp', $data->emailAddress);

		// Generate and set new verification code
		$token = generateVerificationToken($data->emailAddress);
		$userModel->setProperty(null, 'verify', $token);

		// Send verification email
		$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/email/emailchange.phtml');
		$emailBody = str_replace('{button_url}', DOMAIN."/api/verify/".$token, $template);

		$message = \Swift_Message::newInstance()
			->setSubject('Email Change Request')
			->setFrom(array(DEFAULT_FROM))
			->setTo(array($data->emailAddress))
			->setBody($emailBody, 'text/html');

		$this->app['mailer']->send($message);

		return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
	}


	public function getUsersAction()
	{
		$userModel = new UserModel($this->app);

		try {
			$users = $userModel->getAllUsers();
			return json_encode($users);
		} catch(\Exception $e) {
			return ApiResponse::error('USER_FETCH_FAIL');
		}
	}

	public function deleteUserAction($userID)
	{
		$userModel = new UserModel($this->app);

		if($userModel->removeUser($userID)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_REMOVE_FAIL');
		}
	}

	public function putUserPropertyAction($userID, $property)
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);

		if($userModel->setProperty($userID, $property, $data->value)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_PROPERTY_SET_FAIL');
		}
	}

	public function deleteUserPropertyAction($userID, $property)
	{
		$data = json_decode(file_get_contents('php://input'));

		$userModel = new UserModel($this->app);

		if($userModel->deleteProperty($userID, $property)) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('USER_PROPERTY_DELETE_FAIL');
		}
	}

	public function checkExistsEmailAction(Request $request)
	{
		$email = $request->query->get('email');


		$userModel = new UserModel($this->app);

		try {
			$userModel->loadUser($email);
			return ApiResponse::error('USER_EXISTS');
		} catch(\Exception $e) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		}
	}

	public function checkPassword(Request $request)
	{
		$password = $request->query->get('password');

		$userModel = new UserModel($this->app);

		try {
			$userModel->loadUserByID($this->app['session']->get('uid'));

			if($userModel::hashPassword($password) === $userModel->user['password']) {
				return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
			} else {
				return ApiResponse::error('PASSWORD_INVALID');
			}
		} catch(\Exception $e) {
			return ApiResponse::error('USER_NOT_FOUND');
		}
	}

	public function checkExistsCompanyNameAction(Request $request)
	{
		$company = $request->query->get('company');

		$companyModel = new CompanyModel($this->app);

		if($companyModel->companyExists($company)) {
			return ApiResponse::error('COMPANY_EXISTS');
		} else {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		}
	}
}
