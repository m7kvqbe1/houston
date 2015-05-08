var Agents = Backbone.Collection.extend({
	model: AgentModel,	
	url: '/api/agents'
});