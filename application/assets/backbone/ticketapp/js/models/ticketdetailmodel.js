var TicketDetailModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync",  function(){
			// app.ticketDetailView.messagesView.collection.url = '/tickets/reply/' + this.id;
			// app.ticketDetailView.messagesView.collection.fetch();
			this.view.messagesView.collection.url = '/tickets/reply/' + this.id;
			this.view.messagesView.collection.fetch();
		});
	},

	fetchMessages: function(id){
		this.view.messagesView.collection.url = '/tickets/reply/' + id;
		this.view.messagesView.collection.fetch();
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
		url: '/tickets'		
	}
});