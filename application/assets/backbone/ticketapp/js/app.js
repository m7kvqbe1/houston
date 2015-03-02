//danialk.github.io/blog/2013/06/08/backbone-tips-after-and-before-methods-for-router/
var AppRouter = Backbone.Router.extend({
	routes: {
		"": "indexFrontController",
		"tickets/new": "ticketFormFrontController",
		"tickets/:ticket": "ticketDetailsFrontController",
		"people": "peopleOverviewFrontController",
		"account": "accountMainFrontController",
		"analytics": "analyticsMainFrontController"
	},

	changed: false,

	checkIfChanged: function () {
		if(!this.changed) return true;
		this.modalWarningView.model.set({type: 'Warning', message: 'All unsaved changes will be lost, are you sure you want to continue?', cancel: true});
		$('#modal-window').show();
		this.modalWarningView.render();
		var confirmation = this.modalWarningView.evaluate();

		//www.developphp.com/video/JavaScript/Custom-Confirm-Box-Programming-Tutorial

		// var confirmation = confirm('All unsaved changes will be lost, are you sure you want to continue?');
		// if(confirmation){
		// 	this.changed = false;
		// 	return true;
		// } else {
		// 	return false;
		// }
	},

	execute: function(callback, args, name) {
		var router = this;
		var confirmation = this.checkIfChanged.apply(router, arguments);
	    if(!confirmation){
	    	app.navigate(this.changed, {trigger: false});
	    	return this;
	    } 
      	if (callback) callback.apply(this, args);
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

		//FILESUPLOAD COLLECTION
		this.filesUploadCollection = new FilesUpload();

		//FILEPREVIEW COLLECTION
		this.filesPreviewCollection = new FilesPreview();
		
		// BUFFER CLIENT MODEL
		this.addClientModel = new BufferClientModel();
		
		// BUFFER CLIENT USER MODEL
		this.addClientUserModel = new BufferClientUserModel();
		
		// BUFFER AGENT MODEL
		this.addAgentModel = new BufferAgentModel();

		//BUFFER MESSAGE MODEL
		this.addMessageModel = new BufferMessageModel();

		//MODAL WARNING MODEL
		// this.modalWarningModel = new modalWarningModel();

		$.when(this.user.fetch(), this.users.fetch(), this.tickets.fetch(), this.clients.fetch())
		.done(function(){
			app.setUpSocket();
			app.initViews();
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

	viewInit: false,
	initViews: function() {
		// TICKETS VIEW
		this.ticketsView = new TicketView({collection: this.tickets.filtered});
		
		// TICKET VIEW
		this.ticketDetailView = new TicketDetailView({model: this.ticketDetailModel});

		// NEW TICKET VIEW
		this.formView = new FormView({model: new TicketModel()});
		
		//----------------------------------------
		
		// PEOPLE VIEW
		this.peopleView = new PeopleView({collection: this.agentsCollection}); 

		// CLIENTS VIEW
		this.clientsView = new ClientsView({collection: this.clients});
		
		// ANALYTICS VIEW
		this.analyticsView = new AnalyticsView({model: this.user});
		
		// ACCOUNT VIEW
		this.accountView = new AccountView({model: this.user});

		// PREVIEW WINDOW
		this.previewWindow = new PreviewWindow({collection: app.filesPreviewCollection});

		// UPDATE ALERT VIEW 
		this.updateAlertView = new UpdateAlertView({collection: this.tickets});

		// MODAL WARNING VIEW
		this.modalWarningView = new ModalWarningView({model: new Backbone.Model({type: 'Warning', message: 'This is a test message', cancel: true})});

		handlebarsHelpers.bindHelpers();

		//EVENTS
		$(window).on("resize", this.ticketsView.pageResize).on("resize", this.previewWindow.imgMaxHeight);

		//Mobile menu
		$('.nav-icon, .mob-menu a').click(function(){
			$('.outer-wrap, .mob-menu').fadeToggle(300);
			$('.nav-icon').toggleClass('cross');
			// $('body').toggleClass('dark');
		});
		
		// Close notification popup
		$('#notice .close').click( function() {
			$(this).parent().hide();
		});

		this.viewInit = true;
	},
	
	onLoadRender: function(view) {
		var _this = this;
					
		(function check() {
			if(_this.viewInit) {
				$('#app').html(_this[view].render().el);
				$('#preview-window').append(app.previewWindow.$el);
				$('#modal-window').append(app.modalWarningView.$el);
				app.modalWarningView.render();
				$('#update-alert').html(app.updateAlertView.$el);
				app.updateAlertView.render();
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

 //    navigate: function(fragment, options) {
 //    	console.log('navigate');
	// 	var router = this;
	// 	var confirmation = this.checkIfChanged.apply(router, arguments);
	//     if(!confirmation) {
	//     	console.log(this.changed.model.attributes);
	//     	return this; 
	//     }
	// 	Backbone.history.navigate(fragment, options);
	// 	return this;
	// },













// Backbone.Router.prototype.before = function () {
// 	if(!this.changed) return true;
// 	var confirmation = confirm('You have unsaved changes, are you sure you want to continue?');
// 	if(confirmation){
// 		this.changed = false;
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// Backbone.Router.prototype.navigate = function(fragment, options) {
//  	console.log('navigate');
// 	var router = this;
// 	var confirmation = this.before.apply(router, arguments);
//     if(!confirmation)return this; 
// 	Backbone.history.navigate(fragment, options);
// 	return this;
// };

// Backbone.Router.prototype.after = function () {};

// Backbone.Router.prototype.route = function (route, name, callback) {
//   if (!_.isRegExp(route)) route = this._routeToRegExp(route);
//   if (_.isFunction(name)) {
//     callback = name;
//     name = '';
//   }
//   if (!callback) callback = this[name];

//   var router = this;

//   Backbone.history.route(route, function(fragment) {
//     var args = router._extractParameters(route, fragment);

//     // router.before.apply(router, arguments);
//     var confirmation = router.before.apply(router, arguments);
//     if(!confirmation)return this; 
//     callback && callback.apply(router, args);
//     router.after.apply(router, arguments);
//     router.trigger.apply(router, ['route:' + name].concat(args));
//     router.trigger('route', name, args);
//     Backbone.history.trigger('route', router, name, args);
//   });
//   return this;
// };