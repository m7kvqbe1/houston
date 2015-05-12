var ClientModel = Backbone.Model.extend({
	initialize: function(){
		// Create usersCollection
		this.usersCollection = new ClientUsers();
		// this.usersCollection = new ClientUsers(app.users.usersByClient(this.id)); //Removed as now clientUsers are fetched in app.fetchClients

		// Create model's view as an attribute of itself
		// this.modelView = new ClientView({model: this});
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
