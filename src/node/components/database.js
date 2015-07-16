// Setup database connection
var mongojs = require('mongojs');
var uri = 'mongodb://houston:ZB~fljf023943!F@localhost:27017/houston';
var db = mongojs(uri, ['companies']);

var getAllCompanyIds = function(callback) {
	db.companies.find({}, {}, function(err, records) {
		var companyIds = [];
		records.forEach( function(record) {
			companyIds.push(record._id);	
		});
		
		callback(err, companyIds);
	});
};

module.exports = {
	getAllCompanyIds: getAllCompanyIds
};