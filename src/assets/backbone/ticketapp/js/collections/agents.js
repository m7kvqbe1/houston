var Agents = Backbone.Collection.extend({
	model: AgentModel,
	initialize: function() {
		// Fetch user data when agent is added, removed or amended
		this.on('add change destroy', function(){
			app.fetchUsers();
		});
	}
});