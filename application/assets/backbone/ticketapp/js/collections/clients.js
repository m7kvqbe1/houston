var Clients = Backbone.Collection.extend({
	model: ClientModel,	
	url: '/api/clients',	
	comparator: 'name',
	initialize: function() {
		this.on("sync", function() {
			console.log('B');
		});
	}
});
