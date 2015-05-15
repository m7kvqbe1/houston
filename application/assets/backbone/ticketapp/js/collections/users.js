var Users = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users',	

	initialize: function() {
		this.on("sync", function() {
			console.log('A');
			//Reset agentsCollection with all agent/admins
			app.agentsCollection.set(this.agentUsers());

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
		// console.log(app.clients.length);
		var theModel;
		for(var i=0; i<app.clients.length; i++) {
			theModel = app.clients.models[i];
	        theModel.usersCollection.set(app.users.usersByClient(theModel.id));	
	        console.log(i);
	    }
	},	

	fetchPeopleAndClients(){
	}
});