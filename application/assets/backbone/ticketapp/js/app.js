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
			success: function(){
				app.list();
			}
		});
	
		//TICKETS
		//instantiate the ticket collection
		this.tickets = new Tickets();
		//fetch ticket data	
		this.tickets.fetch({
			success: function(){				
				app.list();
				// app.navigate('', {trigger: true});
			}
		});
		//instantiate the tickets view and set it the tickets collection
		this.ticketsView = new TicketView(
			{
				collection: this.tickets.filtered
			}
		);	
		
		//SINGLE TICKET		
		//instantiate the ticketDetail model
		this.ticketDetailModel = new TicketDetailModel();
		//instantiate the ticket view and set it the ticket model
		this.ticketDetailView = new TicketDetailView(
			{
				model: new TicketDetailModel()
			}
		);	

		//NEW TICKET
		//instantiate the new ticket view and set it the ticket model 
		this.formView = new FormView({ model: new TicketModel()});
		
		//PEOPLE
		//instantiate the clients collection
		this.clients = new Clients();
		//fetch client data
		this.clients.fetch({
			success: function(){
				app.list();
			}
		});
		//instantiate the addClientModel
		this.addClientModel = new AddClientModel();

		//instantiate the client view and set it the clients collection
		this.clientsView = new ClientsView(
			{ 
				collection: this.clients
			});

		//instantiate the agents collection
		this.agents = new Agents();
		//fetch agent data
		this.agents.fetch();
		//instantiate the addAgent model
		this.addAgentModel = new AgentModel();

		//instantiate the people view and pass it the agents collection and the addAgentModel
		this.peopleView = new PeopleView(
			{
				collection: this.agents
			}
		); 

		//instantiate the addClientUser model
		this.addClientUserModel = new ClientUserModel();

		//ACCOUNT
		this.accountView = new AccountView(
			{ 
				model: this.user
			}
		);
	},

	clientUserCount: 0,

	list: function() {
		if(this.user && this.tickets && this.clients && this.clients.models.length == this.clientUserCount){ 
			$('#app').html(this.ticketsView.render().el);
		} else {
			$('#app').html('<h1>Loading</h1>');
		}
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
		// this.peopleView.clientsView.collection.fetch(); //was removed by adding fetch call in initialize above //was removed by adding the fetch call into the Agents collection on sync
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