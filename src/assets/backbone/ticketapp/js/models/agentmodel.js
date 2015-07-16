var AgentModel = Backbone.Model.extend({
	url: '/api/agents',	
	parse: function(response) {
		if(response._id) {
			response.id = response._id['$id'];
			delete response._id;
		}		
		return response;
	}
});