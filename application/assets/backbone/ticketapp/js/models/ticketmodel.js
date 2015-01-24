var TicketModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			//when a new ticket is saved fetch the tickets collection
			app.tickets.fetch();
		});
	},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	urlRoot: '/tickets',
	defaults: {
		status: 'New',
		agent: false,
		files: [],
		hasMessages: false,
		updated: [],
		url: '/tickets'		
	}
});