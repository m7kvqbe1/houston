<?php
namespace Houston\Extra;
	
class Notify 
{	
	public static function sendRequest($url, $ticket) 
	{
		$ticket = json_encode($ticket);
		
		// Send HTTP request via cURL to Node.js server
		$ch = curl_init($url);
    	
    	// Use HTTP Header authentication for Node.js server also restrict to localhost only
    	//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    	//curl_setopt($ch, CURLOPT_USERPWD, $username.':'.$password);
		
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $ticket);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    		'Content-Type: application/json', 
    		'Content-Length: '.strlen($ticket))
    	);
    	
    	$output = curl_exec($ch);
    	curl_close($ch);
		
		return $output;
	}
	
	public static function newTicket($ticket) 
	{
		self::sendRequest('http://localhost:3000/new/ticket', $ticket);
	}
	
	public static function newReply($ticket) 
	{
		self::sendRequest('http://localhost:3000/new/reply', $ticket);
	}
	
	public static function newStatus($ticket) 
	{
		self::sendRequest('http://localhost:3000/new/status', $ticket);
	}
}