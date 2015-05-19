var Users = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users',	

	initialize: function() {
		this.on("sync", function() {
			//On fetch reset agentsCollection with all agent/admin users
			app.agentsCollection.reset(this.agentUsers());
			// this.addUsersToClient(); //Removed as now triggered in app.fetchClients
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
	},

	addUsersToClient: function(){
		var theModel;
		for(var i=0; i<app.clients.length; i++) {
			theModel = app.clients.models[i];
	        theModel.usersCollection.set(app.users.usersByClient(theModel.id));	
	    }
	}
});