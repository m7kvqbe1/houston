var AppRouter = Backbone.Router.extend({
	routes: {
	//set up routes
		"": "list",
		"tickets/new": "ticketForm",
		"tickets/:ticket": "ticketDetails"
	},
	
	initialize: function() {
		
		this.user = new UserModel();
		var userID = '';
		this.user.urlRoot = '/user/' + userID;
		this.user.fetch();
	
		//instantiate the collection
		this.tickets = new Tickets();
		
		//fetch collection data from server
		this.tickets.fetch();
		
		//instantiate the ticket model
		this.ticketModel = new TicketModel();
		
		//instantiate the ticket view and set it the ticket model
		this.ticketDetailView = new TicketDetail (
			{
				model: this.ticketModel
			}
		);
		
		//instantiate the tickets view and set it the tickets collection
		this.ticketsView = new TicketView (
			{
				collection: this.tickets.filtered
			}
		);
				
		//instantiate the new ticket view and set it the ticket model 
		this.formView = new FormView(
			{
				model: new TicketModel()
			}
		);
		
	},

	list: function () {
		$('#app').html(this.ticketsView.render().el);
	},

	ticketDetails: function (ticket) {
		this.ticketDetailView.model = this.tickets.get(ticket);
		$('#app').html(this.ticketDetailView.render().el);
	},

	ticketForm: function () {
		$('#app').html(this.formView.render().el);
	}
	
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});