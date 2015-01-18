var Agents = Backbone.Collection.extend({
	model: AgentModel,	
	urlRoot: '/agents',
	url: '/agents'
});