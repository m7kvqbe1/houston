<?php
namespace Houston\Extra;
	
class Notify 
{	
	public static function sendRequest($url, $payload) 
	{
		$payload = json_encode($payload);
		
		// Send HTTP request via cURL to Node.js server
		$ch = curl_init($url);
    	
    	// Use HTTP Header authentication for Node.js server also restrict access to localhost only
    	//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    	//curl_setopt($ch, CURLOPT_USERPWD, $username.':'.$password);
		
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    		'Content-Type: application/json', 
    		'Content-Length: '.strlen($payload))
    	);
    	
    	$output = curl_exec($ch);
    	curl_close($ch);
		
		return $output;
	}
	
	public static function socketBroadcast($route, $payload, $socketNamespace = null) 
	{
		if(isset($socketNamespace)) $payload->socketNamespace = (string) $socketNamespace;
		self::sendRequest(\Config::NODE_HOST.$route, $payload);
	}
}