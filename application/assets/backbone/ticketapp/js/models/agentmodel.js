var BufferAgentModel = Backbone.Model.extend({
	url: '/agents',
	
	initialize: function() {
		this.on("sync", function() {
			// On save of app.addAgentModel fetch app.agents which triggers the peopleview to render
			app.agents.fetch();
		});
	},
	
	parse: function(response) {
		if(response._id) {
			response.id = response._id['$id'];
			delete response._id;
		}		
		if(response.companyID.$id) {
			response.companyID = response.companyID['$id'];
		}	
		return response;
	}
});