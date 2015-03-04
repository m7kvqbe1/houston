var TicketDetailModel = Backbone.Model.extend({
	urlRoot: '/api/tickets',
	initialize: function(){
		this.on("sync",  function(){
			app.tickets.fetch({reset:true});
		});

		this.messagesCollection = new Messages();
	},

	fetchMessages: function(ticket){
		app.ticketDetailView.messagesView.collection.url = '/api/tickets/reply/' + ticket;
		app.ticketDetailView.messagesView.collection.fetch({
			success: function(){
				app.onLoadRender('ticketDetailView');
			}
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