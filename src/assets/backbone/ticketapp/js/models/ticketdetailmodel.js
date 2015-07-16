var TicketDetailModel = Backbone.Model.extend({
	urlRoot: '/api/tickets',
	initialize: function(){
		this.on('sync',  function(){
			app.tickets.fetch({reset:true});
		});

		this.messagesCollection = new Messages();
	},

	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	}
});