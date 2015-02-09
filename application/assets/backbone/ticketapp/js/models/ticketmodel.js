var TicketModel = Backbone.Model.extend({
	url: '/tickets',

	initialize: function(){
		this.on("sync", function(model){
			//when a new ticket is saved fetch the tickets collection
			// app.tickets.fetch();
			app.tickets.add(model);
		});
	},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
	if(response.authorID['$id']){
		response.authorID = response.authorID['$id'];
	}
		return response;
	},
	defaults: {
		status: 'New',
		agent: false,
		files: [],
		hasMessages: false,
		updated: []		
	}
});