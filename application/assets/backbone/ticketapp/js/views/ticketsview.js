var TicketView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Open Tickets</h2>' +
					'<a href="#/tickets/new" class="btn">New Ticket</a>' +
				'</div>' +
				
				'<div class="box-app-nav">' +
					'<div class="helper">'+
						'<div class="box-app-nav-inner">'+
							'<div class="sort">' +
								'<a class="sortByDate">Sort By Date {{dateArrow}}</a>' +
								'<a class="sortByCompany mid-link">Sort By Company {{companyArrow}}</a>' +
							'</div>' +
							'<div class="filter">' +
								'<a class="allTickets">All Tickets</a>' +
								'<a class="myTickets mid-link">My Tickets</a>' +
								'<a class="completedTickets">Completed Tickets</a>' +
							'</div>' +
						'</div>'+
					'</div>' +
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app tickets-box-app" style="{{fullHeightPage}}">' +
			'<ul id="ticket-stream">' +
			'{{#each models}}'+
				'<li class="ticket">' +
					'<a href="/#/tickets/{{attributes.id}}">'+
						'<div class="update-alert {{updateCheck attributes.updated}}"></div>' +
						'<div class="ticket-info">' +					
							'<div class="date">{{convertToDate attributes.date}}</div>' +
							'<div class="ticket-info-inner">' +
								'{{getAuthorDetails attributes.authorRole attributes.authorID attributes.companyID}}'+
								// '<div class="name">{{getUserName attributes.authorID}}</div>' +
								// '<div class="company-name">Company Name</div>' +
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
		this.listenTo(this.collection, "reset add remove change sort sync", this.render);

		Handlebars.registerHelper("getAuthorDetails", function(authorRole,authorID,companyID) {
			return new Handlebars.SafeString(houston.getAuthorDetails(authorRole,authorID,companyID));
			console.log(authorRole);
			console.log(authorID);
			console.log(companyID);
		});

		Handlebars.registerHelper("getUserName", function(attribute) {
			return houston.getUserName(attribute);
		});

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
			return new Handlebars.SafeString(houston.dateArrow());
		});

		Handlebars.registerHelper("companyArrow", function() {
			return new Handlebars.SafeString(houston.companyArrow());	
		});

		Handlebars.registerHelper("fullHeightPage", function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});

		//Resize event, unbind
		$(window).on("resize", this.pageResize);
		
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

	pageResize: function(){
		this.$('.box-app').css('min-height', houston.calculateBoxHeight());
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