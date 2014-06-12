var AppRouter = Backbone.Router.extend({
	routes: {
	//set up routes
		"": "list",
		"tickets/new": "ticketForm",
		"tickets/:ticket": "ticketDetails",
		"filter/:filter": "filterTickets",
		"sort-by/:sort": "sortTickets"
	},
	
	initialize: function() {
		//instantiate the collection
		this.tickets = new Tickets();
		//fetch collection data
		this.tickets.fetch();
		
		//instantiate the ticket model
		this.ticketModel = new TicketModel();
		//instantiate the ticket view and set it the ticket model
		this.ticketDetailView = new TicketDetail (
			{
				model: this.ticketModel
			}
		);
		
			//this.ticketList = new TicketList();
		
		//instantiate the tickets view and set it the tickets collection
		this.ticketsView = new TicketView (
			{
				collection: this.tickets
			}
		);
				
		//instantiate the new ticket view and set it the ticket model 
		this.formView = new FormView({model: new TicketModel()});
		
		this.filterView = new FilterView(
			{
				collection: this.tickets
			}
		);
		
		this.sortView = new SortView(
			{
				collection: this.tickets
			}
		);
	},

	list: function () {
		$('#app').html(this.ticketsView.render().el);
	},

	ticketDetails: function (ticket) {
		//this.ticketModel.set('id', ticket);	
		//this.ticketModel.fetch();
		this.ticketDetailView.model = this.tickets.get(ticket);
		$('#app').html(this.ticketDetailView.render().el);
	},

	ticketForm: function () {
		$('#app').html(this.formView.render().el);
	},
	
	filterTickets: function(filter){
		this.filterView.options.filter = filter;
		$('#app').html(this.filterView.render().el);
	},
	
	sortTickets: function(sort){
		this.sortView.options.sort = sort;
		$('#app').html(this.sortView.render().el);
	}
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});