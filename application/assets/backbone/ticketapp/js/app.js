var AppRouter = Backbone.Router.extend({
	routes: {
		"": "indexFrontController",
		"tickets/new": "ticketFormFrontController",
		"tickets/:ticket": "ticketDetailsFrontController",
		"people": "peopleOverviewFrontController",
		"account": "accountMainFrontController",
		"analytics": "analyticsMainFrontController"
	},
	
	initialize: function() {
		// Add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for File API support
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) console.warn('The File API is not fully supported by this browser');
		
		// USERS COLLECTION
		this.users = new Users();
		this.users.fetch({
			success: function(){
				app.usersFetched = true;
				app.loaded();
			}
		});

		// AUTHENTICATED SESSION USER MODEL
		this.user = new UserModel();
		this.user.fetch({
			success: function(){
				app.userFetched = true;
				app.loaded();

				app.setUpSocket();
			}
		});
		
		//----------------------------------------
	
		// TICKETS COLLECTION
		this.tickets = new Tickets();
		this.tickets.fetch({
			success: function(){
				app.ticketsFetched = true;	
				app.loaded();
			}
		});
		
		// TICKET MODEL
		this.ticketDetailModel = new TicketDetailModel();
		
		
		//----------------------------------------
		
		// CLIENTS COLLECTION
		this.clients = new Clients();
		this.clients.fetch({
			success: function(){
				app.clientsFetched = true;
				app.loaded();
			}
		});

		// AGENTS COLLECTION
		this.agentsCollection =  new Backbone.Collection();

		//FILES COLLECTION
		this.filesUploadCollection = new FilesUpload();
		
		// BUFFER CLIENT MODEL
		this.addClientModel = new BufferClientModel();
		
		// BUFFER CLIENT USER MODEL
		this.addClientUserModel = new BufferClientUserModel();
		
		// AGENTS COLLECTION
		this.agentsCollection =  new Backbone.Collection();
		
		// BUFFER AGENT MODEL
		this.addAgentModel = new BufferAgentModel();

		//BUFFER MESSAGE MODEL
		this.addMessageModel = new BufferMessageModel();

	},

	setUpSocket: function(){
		// Connect to namespaced socket using company ID
		var socket = io('http://houstonsupportdesk.com:3000/'+app.user.attributes.companyID);
		// On receiving a notify event display the notification popup
		socket.on('notify', function(data) {	
			$('#notice span').html(data);
			$('#notice').fadeIn(1000, function() { $(this).delay(5000).fadeOut(1000); });
			socket.emit('response', 'success');

			app.tickets.fetch({reset:true});
		});
		
	},

	// Data fetched flags
	userFetched: false,
	ticketsFetched: false,
	clientsFetched: false,
	usersFetched: false,
	
	loaded: function() {
		if(this.userFetched && this.ticketsFetched && this.clientsFetched && this.usersFetched) this.initViews();
		return false;
	},

	viewInit: false,
	initViews: function() {
		// TICKETS VIEW
		this.ticketsView = new TicketView({ collection: this.tickets.filtered });
		
		// TICKET VIEW
		this.ticketDetailView = new TicketDetailView({ model: this.ticketDetailModel });

		// NEW TICKET VIEW
		this.formView = new FormView({ model: new TicketModel() });
		
		//----------------------------------------
		
		// PEOPLE VIEW
		// var peopleCollection = new Backbone.Collection(app.users.agentUsers());
		this.peopleView = new PeopleView({ collection: this.agentsCollection }); 

		// CLIENTS VIEW
		this.clientsView = new ClientsView({ collection: this.clients });
		
		// ANALYTICS VIEW
		this.analyticsView = new AnalyticsView({ model: this.user });
		
		// ACCOUNT VIEW
		this.accountView = new AccountView({ model: this.user });
		
		this.viewInit = true;
	},
	
	onLoadRender: function(view) {
		var _this = this;
					
		(function check() {
			if(_this.viewInit) {
				$('#app').html(_this[view].render().el);
				clearTimeout(timer);
			} else {
				var timer = setTimeout(check, 50);	
			}
		})();
	},

	// Define controllers
	indexFrontController: function() {
		this.onLoadRender('ticketsView');
	},

	ticketDetailsFrontController: function(ticket) {
		var attributes = this.tickets.get(ticket).attributes;
		this.ticketDetailView.model.set(attributes);
		this.ticketDetailView.model.fetchMessages(ticket);
		// app.onLoadRender('ticketDetailView');
	},

	ticketFormFrontController: function() {
		this.onLoadRender('formView');
	},
	
	peopleOverviewFrontController: function() {
		this.onLoadRender('peopleView');
	},
	
	accountMainFrontController: function() {
		this.onLoadRender('accountView');
	},
	
	analyticsMainFrontController: function() {
		this.onLoadRender('analyticsView');
	}
});

var app = new AppRouter();

$(function() { Backbone.history.start(); });