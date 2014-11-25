var AppRouter = Backbone.Router.extend({
	routes: {
	//set up routes
		"": "list",
		"tickets/new": "ticketForm",
		"tickets/:ticket": "ticketDetails",
		"people": "peopleOverview"
	},
	
	initialize: function() {
		
		//add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}

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
				
		//instantiate the ticket model
		this.ticketModel = new TicketModel();		
		//instantiate the ticket view and set it the ticket model
		this.ticketDetailView = new TicketDetail(
			{
				model: this.ticketModel
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
		// Previous way where event listeners weren't firing
		// this.ticketDetailView.model = this.tickets.get(ticket); 

		// Previous way that got ticket from tickets collection
		// var attributes = this.tickets.get(ticket).attributes
		// this.ticketDetailView.model.set(attributes);
		
		this.ticketDetailView.model.urlRoot = '/tickets',
		this.ticketDetailView.model.set('id', ticket);
		// this.ticketDetailView.files.reset();
		this.ticketDetailView.model.fetch({
			success: _.bind(function(model){
				var files = model.attributes.files;
				 for (i = 0; i < files.length; ++i) {
					var fileMdl = new FileModel();
					fileMdl.urlRoot = '/tickets/file/meta';
					fileMdl.set('id', files[i]);
					fileMdl.fetch();
					this.ticketDetailView.model.files.add(fileMdl);

					this.ticketDetailView.model.messages.url = '/tickets/reply/get/' + ticket;
					this.ticketDetailView.model.messages.fetch({
						success: _.bind(function(){
							// console.log('fetched');
							$('#app').html(this.ticketDetailView.render().el);
						}, this)
					});
				}
			}, this)
		});

		// var files = attributes.files;

		// for (i = 0; i < files.length; ++i) {
		// 	var fileMdl = new FileModel({id:files[i]});
		// 	this.ticketDetailView.model.files.add(fileMdl);
		// }
		// this.ticketDetailView.model.files.fetch({
		// 	success: function(){
		// 		console.log('modelFetchSuccess')
		// 	}
		// });
		
		// this.ticketDetailView.model.files.fetch({
		// 	data: {
		// 		file_ids: attributes.files
		// 	}
		// });

		// var files = this.ticketDetailView.model.attributes.files;
		// console.log(files);
		//  for (i = 0; i < files.length; ++i) {
		//  	console.log(files[i]);
		// 	// var fileMdl = new FileModel();
		// 	// fileMdl.set('id', files[i]);
		// 	// fileMdl.fetch();
		// 	// this.ticketDetailView.model.files.add(fileMdl);
		// }


		
	},

	ticketForm: function() {
		$('#app').html(this.formView.render().el);
	},
	
	peopleOverview: function() {
		$('#app').html(this.peopleView.render().el);
	}
	
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});

/*
Houston To Do List:
# Add avatar to user object
# Get Mark to make default user icon
# Sort by date/company reverse order

People Page Users
# A user has a people collection of persons
# They see a list of agents and a list of their fellow users within their company

People Page Agents
# An admin has a people collection of persons
# They see a list of agents and have the ability to add new agents
# They see a list of companies and have the ability to add new users to those companies

People Page Admins
# An admin has a people collection of persons
# They see a list of agents and have the ability to add new agents
# They see a list of companies and have the ability to add new companies
# Within those companies they have the ability to add new users

a company model in a companies collection 
company models contains arrays of agents and arrays of users

An admin or an agent people view loads a companies collection 

A user loads a single company model

After user is authenticated and user object is instantiated Company name is used to fetch company object
*/


/*[
					{
						"id": null,
						'companyName': 'Paramount Recruitment',
						
						'users': [
							{
								'name': 'Eugene McDaid',
								'position': 'Director',
								'avatar': 'application/assets/img/avatar.png'
							},
							{
								'name': 'Dan Berryman',
								'position': 'Director',
								'avatar': 'application/assets/img/avatar.png'
							},
							{
								'name': 'Joe Bloggs',
								'position': 'Minion',
								'avatar': 'application/assets/img/avatar.png'
							},
							{
								'name': 'James Brown',
								'position': 'Sex Machine',
								'avatar': 'application/assets/img/avatar.png'
							}						
						]						
					},
					{
						"id": null,
						'companyName': 'Anatech Resource',
						'users': [
							{
								'name': 'Colin Pearson',
								'position': 'Director',
								'avatar': 'application/assets/img/avatar.png'
							},
							{
								'name': 'Nick Wilkins',
								'position': 'Associate Director',
								'avatar': 'application/assets/img/avatar.png'
							}						
						]
					}
				]*/
