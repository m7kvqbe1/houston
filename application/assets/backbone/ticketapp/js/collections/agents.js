var Agents = Backbone.Collection.extend({
	model: BufferAgentModel,	
	url: '/agents'
});