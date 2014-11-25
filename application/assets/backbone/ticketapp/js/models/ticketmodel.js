var TicketModel = Backbone.Model.extend({
	//http://backbonejs.org/#Model-idAttribute
	//https://www.google.co.uk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=backbone%20using%20mongodb%20id
	//idAttribute: "_id",
	initialize: function(){
		this.files = new Files();
		this.messages = new Messages();
		this.messages.on("sync",  function(){
			// console.log('messagesSync');
			app.ticketDetailView.render();
		});
	},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	// urlRoot: '/tickets/add',
	urlRoot: '/tickets',
	defaults: {
		status: 'New',
		agent: false,
		files: [],
		// messages: [],
		updated: [],
		// url: '/tickets/add'
		url: '/tickets'
		
	}
});