var ClientModel = Backbone.Model.extend({
	url: '/clients',
	initialize: function(){
		// Create userCollection within model, give it model specific url and fetch data
		this.usersCollection = new Users(app.clients.usersByClient(this.id));

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
	url: '/clients',
	initialize: function(){
		// On save of app.addClientModel fetch app.clients which triggers the clientview to render
		this.on("sync", function(){
			app.clients.fetch();
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

// this.usersCollection.url = '/client/users/' + this.id;
// this.usersCollection.fetch({
// 	success: function(){
// 		app.clientUserCount += 1;
// 		app.initViews();
// 	}
// });