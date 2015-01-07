var Clients = Backbone.Collection.extend({
	model: ClientModel,	
	url: '/clients',	
	initialize: function(){
	}
});