var ClientModel = Backbone.Model.extend({
	urlRoot: '/api/clients',
	initialize: function(){
		this.usersCollection = new ClientUsers();
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
