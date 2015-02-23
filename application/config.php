<?php
class Config 
{	
	const DOMAIN = 'http://tom.houstonsupportdesk.com';
	const DOMAIN_SSL = 'https://tom.houstonsupportdesk.com';
	
	const DEFAULT_SALT = 'Adfkjasf93482394!!';
	
	const MONGO_HOST = 'localhost:27017';
	const MONGO_USER = 'houston';
	const MONGO_PASSWORD = 'ZB~fljf023943!F';
	
	const ERROR_REPORTING = true;
	
	const LOG_PATH = '/application/log/development.log';
	const LOG_LEVEL = 'ERROR';
	
	const STRIPE_API_KEY = 'sk_0BVRYmClEHeZvUq5hEdwluffwn0dp';
	
	const AIRBRAKE_API_KEY = '8d1b91c7738c496048b077615e11c166';
	
	const NODE_HOST = 'http://localhost:3000';
	const NODE_USER = '';
	const NODE_PASSWORD = '';
	
	// This will be taken from company account preferences stored in database
	const MAILBOX_HOST = '{imap.gmail.com:993/ssl/novalidate-cert}[Gmail]/All Mail';
	const MAILBOX_USER = 'support@muska.co.uk';
	const MAILBOX_PASSWORD = 'BBsdfjsa902k';
	const TEMPLATE_DIR = '/application/assets/email/';
}