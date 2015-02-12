<?php
namespace Houston\Component;

class ErrorTrap {
	protected $callback;
	protected $errors = array();
	
	public function __construct($callback) {
		$this->callback = $callback;
	}

	public function call() {
		$result = null;
		set_error_handler(array($this, 'onError'));
		try {
			$result = call_user_func_array($this->callback, func_get_args());
		} catch (Exception $ex) {
			restore_error_handler();        
			throw $ex;
		}
		
		restore_error_handler();
		return $result;
	}

	public function onError($errno, $errstr, $errfile, $errline) {
		$this->errors[] = array($errno, $errstr, $errfile, $errline);
	}

	public function ok() {
		return count($this->errors) === 0;
	}

	public function errors() {
		return $this->errors;
	}
}