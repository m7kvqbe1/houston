//danialk.github.io/blog/2013/06/08/backbone-tips-after-and-before-methods-for-router/
//lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
//lostechies.com/derickbailey/2012/02/06/3-stages-of-a-backbone-applications-startup/
var AppRouter = Backbone.Router.extend({
	root: '/',
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

		// AUTHENTICATED SESSION USER MODEL
		this.user = new UserModel();
		
		// USERS COLLECTION
		this.users = new Users();
		
		//----------------------------------------
	
		// TICKETS COLLECTION
		this.tickets = new Tickets();
		
		// TICKET MODEL
		this.ticketDetailModel = new TicketDetailModel();
			
		//----------------------------------------
		
		// CLIENTS COLLECTION
		this.clients = new Clients();

		// AGENTS COLLECTION
		this.agentsCollection =  new Backbone.Collection();

		//FILES COLLECTION
		this.files = new Files();
		
		// BUFFER CLIENT MODEL
		this.addClientModel = new BufferClientModel();
		
		// BUFFER CLIENT USER MODEL
		this.addClientUserModel = new BufferClientUserModel();
		
		// BUFFER AGENT MODEL
		this.addAgentModel = new BufferAgentModel();

		//BUFFER MESSAGE MODEL
		this.addMessageModel = new BufferMessageModel();

		$.when(this.user.fetch(), this.users.fetch(), this.tickets.fetch(), this.clients.fetch())
		.done(function(){
			app.setUpSocket();
			app.startHistory();
		});

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

	startHistory: function() {
		handlebarsHelpers.bindHelpers();
		events.bindEvents();
		this.modalWindow = $('#modal-window');
		this.appElement = $("#app");
		this.updateElem = $("update-alert");
		this.tickets.countUpdated();

		$(function() { Backbone.history.start({ pushState: true, root: app.root })});		
	},
	
 	currentView: false,
	showView: function(view) {
		if (this.currentView) this.currentView.close();
		this.currentView = view;
		this.appElement.html(this.currentView.render().el);
	},

	// Define controllers
	indexFrontController: function() {
		var ticketsView = new TicketsView({collection: this.tickets.filtered});
		this.showView(ticketsView);
	},

	ticketDetailsFrontController: function(ticket) {
		this.ticketDetailModel.messagesCollection.url = '/api/tickets/reply/' + ticket;
		this.ticketDetailModel.set(this.tickets.get(ticket).attributes);
		$.when(this.ticketDetailModel.messagesCollection.fetch())
		.done(function(){
			var ticketDetailView = new TicketDetailView({model: app.ticketDetailModel});
			app.showView(ticketDetailView);
		});
	},

	ticketFormFrontController: function() {
		var formView = new FormView({model: new TicketModel()});
		this.showView(formView);
	},
	
	peopleOverviewFrontController: function() {
		var peopleView = new PeopleView({collection: this.agentsCollection});
		this.showView(peopleView);
	},
	
	accountMainFrontController: function() {
		var accountView = new AccountView({model: this.user});
		this.showView(accountView);
	},
	
	analyticsMainFrontController: function() {
		var analyticsView = new AnalyticsView({model: this.user});
		this.showView(analyticsView);
	},

	// modal: false,
	// modalB: false,

	// 	CUSTOM EXECUTE METHOD
	changed: false,
	executeArguments: false,
	execute: function(callback, args, name) {
	    //If nothing has been changed  and no arguments have been set then continue with execute as normal
	    if(!this.changed && !this.executeArguments){
	    	if (callback) callback.apply(this, args);
	    	//Close modal view if exists
	    	if (app.modal) app.modal.close();
	    //If something has been changed and arguments have been previously set by an attempted execute use the arguments
		} else if (!this.changed && this.executeArguments){
			this.executeArguments.callback.apply(this, this.executeArguments.args);
	    	this.executeArguments = false;
	    //If something has changed set the arguments to global variables to be use in the future and create modal
	    } else {
	    	this.executeArguments = {
		    	callback: callback,
		    	args: args,
		    	name: name
		    }
	    	houston.createModal({type: 'Warning', message: 'Any unsaved changes will be lost, would you like to continue?', cancel: true},
		    	function(){
					app.changed = false;
					app.execute();
				},
				function(){
					app.navigate(app.changed, {trigger: false});
				}
		    );			    
	    }
    }

});

var app = new AppRouter();

// var modal = {

// 	createModal: function(attributesObj, confirmCallback, cancelCallback){
// 		var modalView = new ModalView({model: new Backbone.Model(attributesObj)});
// 		if(confirmCallback) modalView.confirmBehaviour = confirmCallback;
// 		if(cancelCallback) modalView.cancelBehaviour = cancelCallback;
// 		app.modalWindow.append(modalView.$el); //Why does this only work with $ and seperate render?
// 		modalView.render();
// 	}
// }