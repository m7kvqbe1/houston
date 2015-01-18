var AppRouter = Backbone.Router.extend({
	routes: {
		//set up routes
		"": "list",
		"tickets/new": "ticketForm",
		"tickets/:ticket": "ticketDetails",
		"people": "peopleOverview",
		"account": "accountMain"
	},
	
	initialize: function() {
		
		//add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for the various File API support.
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) console.log('The File APIs are not fully supported in this browser.');

		//USER OBJECT
		//instantiate the user model
		this.user = new UserModel();
		//fetch user data
		this.user.fetch({
			reset: true,
			success: _.bind(function(){
				//fetch ticket collection data from server
				//is it better to render the view here and call the ticketdata as soon as spossible?
				// this.tickets.fetch();
			}, this)
		});
	
		//TICKETS
		//instantiate the ticket collection
		this.tickets = new Tickets();		
				
		//instantiate the ticketDetail model
		this.ticketDetailModel = new TicketDetailModel();

		//instantiate the ticket view and set it the ticket model
		this.ticketDetailView = new TicketDetailView(
			{
				model: new TicketDetailModel()
			}
		);	
		//instantiate the tickets view and set it the tickets collection
		this.ticketsView = new TicketView(
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
		
		//PEOPLE/COMPANIES
		//instantiate the agents collection
		this.agents = new Agents();
		//fetch agent data
		this.agents.fetch();
		//instantiate the people view and set it the company model
		this.peopleView = new PeopleView(
			{
				collection: this.agents
			}
		); 

		//ACCOUNT
		this.accountView = new AccountView(
			{ 
				model: this.user
			}
		);
	},

	list: function() {
		this.tickets.fetch({
			reset: true,
			success: _.bind(function(){
				$('#app').html(this.ticketsView.render().el);
			}, this)
		});
	},

	ticketDetails: function(ticket) {
		var attributes = this.tickets.get(ticket).attributes;
		this.ticketDetailView.model.set(attributes);
		this.ticketDetailView.model.fetchMessages(ticket);
		$('#app').html(this.ticketDetailView.render().el);		
	},

	ticketForm: function() {
		$('#app').html(this.formView.render().el);
	},
	
	peopleOverview: function() {
		this.peopleView.clientsView.collection.fetch();
		$('#app').html(this.peopleView.render().el);
	},
	
	accountMain: function() {
		$('#app').html(this.accountView.render().el);
	}

});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});


//TicketDetail
// Most recent previous way
		// this.ticketDetailView.model.set('id', ticket);
		// this.ticketDetailView.model.fetch({
		// 	success: _.bind(function(){
		// 		$('#app').html(this.ticketDetailView.render().el);
		// 	}, this)
		// });