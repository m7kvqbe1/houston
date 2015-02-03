var Users = Backbone.Collection.extend({
	model: BufferClientUserModel,	
	url: '/users',	

	initialize: function() {
		this.on("sync", function() {
			app.agentsCollection.set(this.agentUsers());

			var theModel
			for(var i=0; i<app.clients.length; i++) {
			  theModel = app.clients.models[i];
			  theModel.usersCollection.set(this.usersByClient(theModel.id));
			}
		});

	},

	usersByClient: function(clientID){
		filtered = this.filter(function(data){
			return data.get('clientID') === clientID;
		});
		return filtered;
	},
	agentUsers: function(){
		filtered = this.filter(function(data){
			return data.get('role') !== 'USER';
		});
		return filtered;
	}
});