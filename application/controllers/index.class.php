<?php
namespace Houston\Index\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class IndexController {
	public function generateAssets() {
		$template = file_get_contents(DOCUMENT_ROOT.'/application/assets/index.html');
		return $template;
	}
}