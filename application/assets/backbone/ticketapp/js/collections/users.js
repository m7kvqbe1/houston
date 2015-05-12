var Users = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users',	

	initialize: function() {
		this.on("sync", function() {

			//Reset agentsCollection with all agent/admins
			app.agentsCollection.set(this.agentUsers());

			// this.addUsersToClient(); //Removed as now triggered in app.fetchClients
		});

	},

	addUsersToClient: function(){
		// console.log(app.clients.length);
		var theModel;
		for(var i=0; i<app.clients.length; i++) {
			theModel = app.clients.models[i];
	        theModel.usersCollection.set(this.usersByClient(theModel.id));	
	        // console.log(i);
	    }
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