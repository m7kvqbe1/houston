var trimMessage = function(str) {
	if(str.length > 30) {
		msg = str.substr(0, 30);
		return msg+'...';		
	}
	return str;	
};

module.exports = {
	trimMessage: trimMessage	
};