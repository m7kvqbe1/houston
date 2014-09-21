var AppRouter = Backbone.Router.extend({
	routes: {
	//set up routes
		"": "list",
		"tickets/new": "ticketForm",
		"tickets/:ticket": "ticketDetails",
		"people": "peopleOverview"
	},
	
	initialize: function() {
	
		//USER OBJECT
		//instantiate the user model
		this.user = new UserModel();
		//fetch user data
		this.user.fetch();
	
		//TICKETS
		//instantiate the ticket collection
		this.tickets = new Tickets();		
		//fetch ticket collection data from server
		this.tickets.fetch();		
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
		//instantiate the companies collection
		this.companies = new Companies([
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
				]);
		//instantiate the people view and set it the companies collection
		this.peopleView = new PeopleView(
			{
				collection: this.companies
			}
		); 
		
	},

	list: function() {
		$('#app').html(this.ticketsView.render().el);
	},

	ticketDetails: function(ticket) {
		this.ticketDetailView.model = this.tickets.get(ticket);
		$('#app').html(this.ticketDetailView.render().el);
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

