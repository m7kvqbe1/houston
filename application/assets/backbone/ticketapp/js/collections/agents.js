var Agents = Backbone.Collection.extend({
	model: AgentModel,	
	url: '/api/agents'
});

// var Agents = Backbone.Collection.extend({
// 	model: BufferAgentModel,	
// 	url: '/api/agents'
// });