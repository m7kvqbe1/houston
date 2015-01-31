var BufferClientUserModel = Backbone.Model.extend({
	url: '/user',
	initialize: function(){
		this.on("sync", function(){
			// Fetch the usersCollection of the model that has had a user added to it, which triggers its render
			this.currentView.model.usersCollection.fetch();
		});

		// Create model's view as an attribute of itself
		this.modelView = new UserView({model: this});
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});