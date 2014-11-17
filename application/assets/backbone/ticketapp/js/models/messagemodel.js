var MessageModel = Backbone.Model.extend({

	initialize: function(){
		this.on("sync",  function(){
			console.log('messageModelSync');
			// app.ticketDetailView.render();
			app.ticketDetailView.model.messages.fetch({success: console.log('modelFetched')});

		});
	},
	// urlRoot: '/tickets/reply',
	defaults: {
		// url: 'tickets/reply'
	}
});