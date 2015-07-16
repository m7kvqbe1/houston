var TicketsView = Backbone.View.extend({
	template: JST.ticketsview,
	
	initialize: function() {	
		this.listenTo(this.collection, 'reset add remove change sort sync', this.render);		
	},

	onClose: function(){
		this.stopListening();
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		
		this.delegateEvents({
			'click .sortByDate': 'sortByDate',
			'click .sortByCompany': 'sortByCompany',
			'click .myTickets': 'byAgent',
			'click .completedTickets': 'byCompleted',
			'click .updatedTickets': 'updated',
			'click .allTickets': 'all'
		});

		return this;		
	},
	
	all: function(){
		this.collection.reset(app.tickets.allTickets());
	},

	updated: function(){
		this.collection.reset(app.tickets.updatedTickets());
	},
	
	byAgent: function(){
		this.collection.reset(app.tickets.byAgent());
	},
	
	byCompleted: function(){
		this.collection.reset(app.tickets.byCompleted());	
	},
	
	sortByDate: function(){
		app.tickets.byDate();	
	},
	
	sortByCompany: function(){
		app.tickets.byCompany();
	}		
});