<?php
namespace Houston\Extra;
	
class Helper {
	public static function urlFriendly($string) {
    	return strtolower(trim(preg_replace('~[^0-9a-z]+~i', '-', html_entity_decode(preg_replace('~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);~i', '$1', htmlentities($string, ENT_QUOTES, 'UTF-8')), ENT_QUOTES, 'UTF-8')), '-'));
	}
	
	public static function hexToBin($hexstr) { 
		$n = strlen($hexstr); 
		$sbin = "";   
		$i = 0; 
		while($i<$n) {       
			$a =substr($hexstr, $i, 2);           
			$c = pack("h*", $a); 
			if ($i==0) { $sbin = $c; } 
			else { $sbin .= $c; } 
			$i += 2; 
    	} 
		return $sbin;
	}
	
	public static function objectToArray($object) {
   		if(!is_object($object) && !is_array($object))
   		    return $object;
   		
   		return array_map('\Houston\Extra\Helper::objectToArray', (array) $object);
	}
}