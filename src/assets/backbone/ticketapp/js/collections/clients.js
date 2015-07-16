var Clients = Backbone.Collection.extend({
	model: ClientModel,	
	url: '/api/clients',	
	comparator: 'name',
	initialize: function() {
		// Fetch user data when client is added, removed or amended
		this.on('add change destroy', function(){
			app.fetchUsers();
		});
	}
});
