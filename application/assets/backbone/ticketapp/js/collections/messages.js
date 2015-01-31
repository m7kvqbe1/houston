var Messages = Backbone.Collection.extend({
	model: MessageModel,	
	url: '/tickets/reply/',
	comparator: 'date'
});