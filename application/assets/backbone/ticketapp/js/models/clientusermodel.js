var BufferClientUserModel = Backbone.Model.extend({
	url: '/user',
	initialize: function(){
		this.on("sync", function(){
			// Fetch the users Collection, which resets the client's userCollections
			app.users.fetch();
		});
	}
});

var ClientUserModel = Backbone.Model.extend({
	url: '/user',
	initialize: function(){
		// Create model's view as an attribute of itself
		this.modelView = new UserView({model: this});
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		if(response.clientID){
			response.clientID = response.clientID['$id'];
		}
		if(response.companyID){
			response.companyID = response.companyID['$id'];
		}
		return response;
	}
});