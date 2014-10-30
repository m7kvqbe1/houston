var CompanyModel = Backbone.Model.extend({
	urlRoot: '/companies/all',
	url: '/companies/all',
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
		users: [],
		clients: []
	}
});