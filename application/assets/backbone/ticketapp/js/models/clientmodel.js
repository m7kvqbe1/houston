var ClientModel = Backbone.Model.extend({
	// url: '/api/clients', Removed so edit name functionality uses default url that includes id
	initialize: function(){
		// Create userCollection within model, give it model specific url and fetch data
		this.usersCollection = new Backbone.Collection(app.users.usersByClient(this.id));

		// Create model's view as an attribute of itself
		this.modelView = new ClientView({model: this});
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});

var BufferClientModel = Backbone.Model.extend({
	url: '/api/clients',
	initialize: function(){
		// On save of app.addClientModel fetch app.clients which triggers the clientview to render
		this.on("sync", function(){
			app.clients.fetch({reset:true});
		});

	},

	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
