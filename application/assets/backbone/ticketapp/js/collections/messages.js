var Messages = Backbone.Collection.extend({
	model: MessageModel,
	urlRoot: '/tickets/reply',	
	url: '/tickets/reply',	
	initialize: function(){
	}
});