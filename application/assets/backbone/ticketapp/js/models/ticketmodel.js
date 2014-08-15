var TicketModel = Backbone.Model.extend({
	urlRoot: '/tickets/add',
	defaults: {
		status: 'New',
		agent: "Awaiting Agent",
		updated: "updated",
		messages: []
	}
});