var TicketView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<div class="box-app-top">' +
			'<h2>Open Tickets</h2>' +
			'<a href="#/tickets/new" class="btn">New Ticket</a>' +
		'</div>' +
		'<div class="box-app">' +
			'<div class="box-app-nav">' +
				'<div class="sort">' +
					'<a class="sortByDate">Sort By Date {{dateArrow}}</a>' +
					'<a class="sortByCompany mid-link">Sort By Company {{companyArrow}}</a>' +
				'</div>' +
				'<div class="filter">' +
					'<a class="allTickets">All Tickets</a>' +
					'<a class="myTickets mid-link">My Tickets</a>' +
					'<a class="completedTickets">Completed Tickets</a>' +
				'</div>' +
			'</div>' +
			'<ul id="ticket-stream">' +
			'{{#each models}}'+
				'<li class="ticket">' +
					'<a href="/#/tickets/{{attributes.id}}">'+
						'<div class="update-alert {{updateCheck attributes.updated}}"></div>' +
						'<div class="ticket-info">' +					
							'<div class="date">{{convertToDate attributes.date}}</div>' +
							'<div class="ticket-info-inner">' +
								'<div class="name">{{attributes.name}}</div>' +
								'<div class="company-name">{{attributes.company}}</div>' +
								'<div class="summary">{{attributes.subject}}</div>' +
							'</div>' +
						'</div>' +
						'<div class="ticket-status">' +
							'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>' +
							'{{#if attributes.agent}}'+
								'<div class="ticket-agent">{{attributes.agent}}</div>' +
							'{{else}}'+
								'<div class="ticket-agent">Awaiting Agent</div>'+
							'{{/if}}'+								
						'</div>' +
					'</a>'+
				'</li>'+
			'{{/each}}'+					
			'</ul>' +
		'</div>' 
	),
	
	initialize: function() {	
		this.listenTo(this.collection, "reset add remove change sort", this.render);

		//http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers
		Handlebars.registerHelper("convertToClass", function(attribute) {
			return houston.convertToClass(attribute);
		});
		Handlebars.registerHelper("convertToDate", function(attribute) {
			return houston.convertToDate(attribute);
		});

		Handlebars.registerHelper("updateCheck", function(arr) { 
			return new Handlebars.SafeString(houston.updateCheck(arr));			
		});

		Handlebars.registerHelper("dateArrow", function() {
			if(app.tickets.byDateOrder === 1){
				return new Handlebars.SafeString('<i class="icon-up-dir"></i>');
			} else if(app.tickets.byDateOrder === 2){
				return new Handlebars.SafeString('<i class="icon-down-dir-1"></i>');
			}	
		});
		Handlebars.registerHelper("companyArrow", function() {
			if(app.tickets.byCompanyOrder === 1){
				return new Handlebars.SafeString('<i class="icon-up-dir"></i>');
			} else if(app.tickets.byCompanyOrder === 2){
				return new Handlebars.SafeString('<i class="icon-down-dir-1"></i>');
			}	
		});
		
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		this.delegateEvents({
			'click .sortByDate': 'sortByDate',
			'click .sortByCompany': 'sortByCompany',
			'click .myTickets': 'byAgent',
			'click .completedTickets': 'byCompleted',
			'click .allTickets': 'all'
		});
		return this;		
	},
	
	all: function(){
		this.collection.reset(app.tickets.allTickets());
	},
	
	byAgent: function(){
		this.collection.reset(app.tickets.byAgent());
	},
	
	byCompleted: function(){
		this.collection.reset(app.tickets.byCompleted());	
	},
	
	sortByDate: function(){
		app.tickets.byDate();	
	},
	
	sortByCompany: function(){
		app.tickets.byCompany();
	}
			
});