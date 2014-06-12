var TicketModel = Backbone.Model.extend({
	urlRoot: '/tickets',
	defaults: {
		status: 'New',
		agent: "Awaiting Agent",
		updated: "updated",
	}
});