var TicketDetailModel = Backbone.Model.extend({
	urlRoot: '/tickets',
	initialize: function(){
		this.messagesCollection = new Messages();

		this.on("sync",  function(){
			this.messagesCollection.url = '/tickets/reply/' + this.id;
			this.messagesCollection.fetch();
		});


	},

	fetchMessages: function(){
		this.messagesCollection.url = '/tickets/reply/' + this.id;
		this.messagesCollection.fetch({
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