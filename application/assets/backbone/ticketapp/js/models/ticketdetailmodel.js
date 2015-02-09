var TicketDetailModel = Backbone.Model.extend({
	urlRoot: '/tickets',
	initialize: function(){
		this.on("sync",  function(){
			app.tickets.fetch({reset:true});
			
			app.ticketDetailView.messagesView.collection.url = '/tickets/reply/' + this.id;
			app.ticketDetailView.messagesView.collection.fetch({reset:true});
		});

		this.messagesCollection = new Messages();
	},

	fetchMessages: function(ticket){
		app.ticketDetailView.messagesView.collection.url = '/tickets/reply/' + ticket;
		app.ticketDetailView.messagesView.collection.fetch({
			success: _.bind(function(){
				app.onLoadRender('ticketDetailView');
			}, this)
		});
	},

	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	}
});