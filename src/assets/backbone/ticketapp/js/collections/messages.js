var Messages = Backbone.Collection.extend({
	model: MessageModel,	
	url: '/api/tickets/reply/',
	comparator: 'date'
});