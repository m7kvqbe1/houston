<?php
namespace Houston\Component;

interface ExceptionInterface
{
    // Protected methods inherited from Exception class
	public function getMessage();                 
    public function getCode();                    
    public function getFile();                    
    public function getLine();                    
    public function getTrace();                   
    public function getTraceAsString();           

    // Overrideable methods inherited from Exception class
    public function __toString();
    public function __construct($message = null, $code = 0);
}

abstract class CustomException extends \Exception implements ExceptionInterface
{
    protected $message = 'Unknown exception';     
    private   $string;                            
    protected $code    = 0;                       
    protected $file;                              
    protected $line;                              
    private   $trace;

    public function __construct($message = null, $code = 0)
    {
        if(!$message) throw new $this('Unknown '. get_class($this));
        parent::__construct($message, $code);
    }

    public function __toString()
    {
        return get_class($this) . " '{$this->message}' in {$this->file}({$this->line})\n"
                                . "{$this->getTraceAsString()}";
    }
}

// Define all custom exception types
class ApiException extends CustomException implements ExceptionInterface
{
	
}