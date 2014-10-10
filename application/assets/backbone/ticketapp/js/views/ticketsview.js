var TicketView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<div class="box-app-top">' +
			'<h2>Open Tickets</h2>' +
			'<a href="#/tickets/new" class="btn">New Ticket</a>' +
		'</div>' +
		'<div class="box-app">' +
			'<div class="box-app-nav">' +
				'<div class="sort">' +
					'<a class="sortByDate">Sort By Date</a>' +
					'<a class="sortByCompany mid-link">Sort By Company</a>' +
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
						'<div class="update-alert {{showUpdates attributes.updated}}"></div>' +
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
		this.listenTo(this.collection, "sort", this.listening);
		//http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers
		Handlebars.registerHelper("convertToClass", function(attribute) {
			return houston.convertToClass(attribute);
		});
		Handlebars.registerHelper("convertToDate", function(attribute) {
			return houston.convertToDate(attribute);
		});
		Handlebars.registerHelper("showUpdates", function(arr) { 
		//stackoverflow.com/questions/3943494/how-to-loop-through-array-in-jquery
			var i;
			for (i = 0; i < arr.length; ++i) {
				if(arr[i] == app.user.attributes.id) {					
					return new Handlebars.SafeString('update-seen');
				}
			}
			
			//return new Handlebars.SafeString(houston.showUpdates(arr));
			
			/*why arr.map method not working?
			arr.map(function(item) {
				console.log(item);
				if(item == app.user.attributes.firstName + ' ' + app.user.attributes.lastName) {
					
					return new Handlebars.SafeString('update-seen');
				}
			});*/
		});
		
	},
	
	listening: function(){
		console.log('listening');
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
		var results = app.tickets.allTickets();
		this.collection.reset(results);
		this.$el.html(this.template(this.collection));
	},
	
	byAgent: function(){
		//var results = app.tickets.byFilter("agent", "Edd N.");
		var results = app.tickets.byAgent();
		this.collection.reset(results);
		this.$el.html(this.template(this.collection));
	},
	
	byCompleted: function(){
		//var results = app.tickets.byFilter("status", "Completed");
		var results = app.tickets.byCompleted();
		this.collection.reset(results);
		this.$el.html(this.template(this.collection));	
	},
	
	sortByDate: function(e){
		app.tickets.byDate();	
	},
	
	sortByCompany: function(){
		app.tickets.byCompany();
	}
			
});