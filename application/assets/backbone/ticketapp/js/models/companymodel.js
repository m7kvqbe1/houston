var CompanyModel = Backbone.Model.extend({
	// initialize: function(){
	// 	this.users = new Users();
	// 	this.users.url = '/users/' + this.id;
	// 	this.on('sync', this.users.fetch());
	// },
	urlRoot: '/companies',
	url: '/companies',
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
		// users: [],
		// clients: []
	}
});