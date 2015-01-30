var ClientModel = Backbone.Model.extend({
	initialize: function(){
		// Create userCollection within model, give it model specific url and fetch data
		this.usersCollection = new Users();
		this.usersCollection.url = '/client/users/' + this.id;
		this.usersCollection.fetch({
			success: function(){
				app.clientUserCount += 1;
				app.initViews();
			}
		});

		// Create model's view as an attribute of itself
		this.modelView = new ClientView({model: this});
	},
	
	urlRoot: '/clients',
	
	url: '/clients',
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});

var BufferClientModel = Backbone.Model.extend({
	initialize: function(){
		// On save of app.addClientModel fetch app.clients which triggers the clientview to render
		this.on("sync", function(){
			app.clients.fetch();
		});

	},
	
	urlRoot: '/clients',
	
	url: '/clients',
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
//lostechies.com/derickbailey/2011/10/11/backbone-js-getting-the-model-for-a-clicked-element/