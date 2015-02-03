<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Extra\Helper;

class ReplyModel 
{
	protected $app;
	public $reply;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function loadReplyByID($replyID) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		$this->reply = $db->replies->findOne(array('_id' => new \MongoID($id)));
		
		if(!empty($this->reply)) {			
			return $this->reply;
		} else {
			throw new \Exception('Reply not found');
		}
	}
	
	public function getReplies($ticketID) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$collection = $db->replies;
		$result = $collection->find(array('ticketID' => $ticketID));
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		return $docs;
	}
	
	public function generateReply($ticketID, $message, $author) 
	{
		$this->reply = new \stdClass();
		
		$this->reply->ticketID = $ticketID;
		$this->reply->message = $message;
		$this->reply->date = Helper::convertTimestamp(date('Y-m-d H:i:s'));
		
		return $this->reply;
	}
	
	public function reply($reply) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {	
			$collection = $db->replies;
			$collection->save($reply);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}