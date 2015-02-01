var AppRouter = Backbone.Router.extend({
	routes: {
		"": "indexController",
		"tickets/new": "ticketFormController",
		"tickets/:ticket": "ticketDetailsController",
		"people": "peopleOverviewController",
		"account": "accountMainController"
	},
	
	initialize: function() {
		// Add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for File API support
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) console.warn('The File APIs are not fully supported in this browser');

		// AUTHENTICATED SESSION USER MODEL
		this.user = new UserModel();
		this.user.fetch({
			success: function(){
				console.log('userFetch');
				app.userFetched = true;
				app.initViews();
			}
		});
		
		//----------------------------------------
	
		// TICKETS COLLECTION
		this.tickets = new Tickets();
		this.tickets.fetch({
			success: function(){
				console.log('ticketFetch');	
				app.ticketsFetched = true;	
				app.initViews();
			}
		});
		
		// TICKET MODEL
		this.ticketDetailModel = new TicketDetailModel();
		
		
		//----------------------------------------
		
		// CLIENTS COLLECTION
		this.clients = new Clients();
		this.clients.fetch({
			success: function(){
				console.log('clientsFetch');
				app.clientsFetched = true;
				app.initViews();
			}
		});
		
		// BUFFER CLIENT MODEL
		this.addClientModel = new BufferClientModel();

		// AGENTS COLLECTION
		this.agents = new Agents();
		this.agents.fetch({
			success: function(){
				console.log('agentsFetch');
				app.agentsFetched = true;
				app.initViews();
			}
		});
		
		// BUFFER AGENT MODEL
		this.addAgentModel = new BufferAgentModel();

		// BUFFER CLIENT USER MODEL
		this.addClientUserModel = new BufferClientUserModel();
	},

	// Data fetched flags
	userFetched: false,
	ticketsFetched: false,
	clientsFetched: false,
	agentsFetched: false,
	clientUserCount: 0,
	
	loaded: function() {
		if(this.userFetched && this.ticketsFetched && this.clientsFetched && this.agentsFetched && this.clients.models.length == this.clientUserCount) return true;
		return false;
	},

	viewInit: false,
	initViews: function() {
		if(app.loaded()) {			
			// TICKETS VIEW
			this.ticketsView = new TicketView({ collection: this.tickets.filtered });
			
			// TICKET VIEW
			this.ticketDetailView = new TicketDetailView({ model: this.ticketDetailModel });

			// NEW TICKET VIEW
			this.formView = new FormView({ model: new TicketModel() });
			
			//----------------------------------------
			
			// CLIENTS VIEW
			this.clientsView = new ClientsView({ collection: this.clients });
			
			// PEOPLE VIEW
			this.peopleView = new PeopleView({ collection: this.agents }); 
			
			//----------------------------------------
			
			// ACCOUNT VIEW
			this.accountView = new AccountView({ model: this.user });
			
			this.viewInit = true;
		}
	},
	
	onLoadRender: function(view) {
		var check = setInterval(function() {			
			if(app.viewInit) {
				$('#app').html(app[view].render().el);
				clearInterval(check);
			}
		}, 50);
	},

	// Define controllers
	indexController: function() {
		this.onLoadRender('ticketsView');
	},

	ticketDetailsController: function(ticket) {
		var attributes = this.tickets.get(ticket).attributes;
		this.ticketDetailView.model.set(attributes);
		this.ticketDetailView.model.fetchMessages();
	},

	ticketFormController: function() {
		this.onLoadRender('formView');
	},
	
	peopleOverviewController: function() {
		this.onLoadRender('peopleView');
	},
	
	accountMainController: function() {
		this.onLoadRender('accountView');
	}
});

var app = new AppRouter();

$(function() { Backbone.history.start(); });