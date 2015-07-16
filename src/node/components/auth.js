// Basic HTTP authentication
var secureRoute = function(req, res, next) {
	var auth;

	if (req.headers.authorization) {
		auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
	}

	if (!auth || auth[0] !== 'cd8aec6611227907a7260e280fc87361' || auth[1] !== '0ec138408802d5aca30112cbd48478c6') {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="Houston Support Desk"');
		res.end('Unauthorized');
	} else {
		next();
	}
};

module.exports = {
	secureRoute: secureRoute
}