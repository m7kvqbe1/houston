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
		//instantiate the company model
		this.companyModel = new CompanyModel();
		//fetch company data
		this.companyModel.fetch();
		//instantiate the people view and set it the company model
		this.peopleView = new PeopleView(
			{
				model: this.companyModel
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
		var attributes = this.tickets.get(ticket).attributes
		this.ticketDetailView.model.set(attributes);
		this.ticketDetailView.model.fetchMessages(ticket);
		$('#app').html(this.ticketDetailView.render().el);

		// this.ticketDetailView.model.set('id', ticket);
		// this.ticketDetailView.model.fetch({
		// 	success: _.bind(function(){
		// 		$('#app').html(this.ticketDetailView.render().el);
		// 	}, this)
		// });
		
	},

	ticketForm: function() {
		$('#app').html(this.formView.render().el);
	},
	
	peopleOverview: function() {
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
// Previous way where event listeners weren't firing
// this.ticketDetailView.model = this.tickets.get(ticket); 

// Previous way that got ticket from tickets collection
// var attributes = this.tickets.get(ticket).attributes
// this.ticketDetailView.model.set(attributes);

//Previous Way that fetched messages as a property of the model
// this.ticketDetailView.model.set('id', ticket);
// this.ticketDetailView.model.fetch({
// 	success: _.bind(function(){
// 		this.ticketDetailView.model.messages.url = '/tickets/reply/' + ticket;
// 		this.ticketDetailView.model.messages.fetch({
// 			success: _.bind(function(model){
// 				$('#app').html(this.ticketDetailView.render().el);
// 				console.log(model);
// 			}, this)
// 		});
// 	}, this)
// });

// Previous way that built file collections
// this.ticketDetailView.model.urlRoot = '/tickets',
// this.ticketDetailView.model.set('id', ticket);
// // this.ticketDetailView.files.reset();
// this.ticketDetailView.model.fetch({
// 	success: _.bind(function(model){
// 		var files = model.attributes.files;
// 		 for (i = 0; i < files.length; ++i) {
// 			var fileMdl = new FileModel();
// 			fileMdl.urlRoot = '/tickets/file/meta';
// 			fileMdl.set('id', files[i]);
// 			fileMdl.fetch();
// 			this.ticketDetailView.model.files.add(fileMdl);

// 			this.ticketDetailView.model.messages.url = '/tickets/reply/get/' + ticket;
// 			this.ticketDetailView.model.messages.fetch({
// 				success: _.bind(function(){
// 					// console.log('fetched');
// 					$('#app').html(this.ticketDetailView.render().el);
// 				}, this)
// 			});
// 		}
// 	}, this)
// });