var TicketsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Open Tickets</h2>' +
					'<a href="/tickets/new" class="btn">New Ticket</a>' +
				'</div>' +
				
				'<div class="box-app-nav">' +
					'<div class="helper">'+
						'<div class="box-app-nav-inner">'+
							'<div class="sort">' +
								'<a class="sortByDate">Sort By Date {{dateArrow}}</a>' +
								'<a class="sortByCompany mid-link">Sort By Company {{companyArrow}}</a>' +
							'</div>' +
							'<div class="filter">' +
								
								'<a class="allTickets">All<span> Tickets</span></a>' +
								'<a class="updatedTickets">Updated<span> Tickets</span></a>' +
								'<a class="myTickets"><span class="mine">Mine</span><span>My Tickets</span></a>' +
								'<a class="completedTickets">Completed<span> Tickets</span></a>' +
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
					'<a href="/tickets/{{attributes.id}}">'+
						'<div class="update-alert {{updateCheck attributes.updated}}"></div>' +
						'<div class="ticket-info">' +					
							'<div class="date">{{convertToDate attributes.date}}</div>' +
							'<div class="ticket-info-inner">' +
								'<div class="name">{{getUserName attributes.authorID}}</div>' +
								'<div class="company-name">{{getCompanyName attributes.authorID}}</div>' +
								'<div class="summary">{{attributes.subject}}</div>' +
							'</div>' +
						'</div>' +
						'<div class="ticket-status">' +
							'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>' +
							'{{#if attributes.agent}}'+
								'<div class="ticket-agent">{{getUserName attributes.agent}}</div>' +
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
	},

	onClose: function(){
		this.stopListening();
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		this.delegateEvents({
			'click .sortByDate': 'sortByDate',
			'click .sortByCompany': 'sortByCompany',
			'click .myTickets': 'byAgent',
			'click .completedTickets': 'byCompleted',
			'click .updatedTickets': 'updated',
			'click .allTickets': 'all'
		});

		//reset filesUploadCollection (after a cancelled new ticket)
		// app.filesUploadCollection.reset();
		return this;		
	},
	
	all: function(){
		this.collection.reset(app.tickets.allTickets());
	},

	updated: function(){
		this.collection.reset(app.tickets.updatedTickets());
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

var UpdateAlertView = Backbone.View.extend({
	className: 'update-alert-wrap',
	template: Handlebars.compile(
		'{{calculateUpdates}}'
	),

	initialize: function(){
		this.listenTo(this.collection, "reset add remove change sync", this.render);

		Handlebars.registerHelper("calculateUpdates", function() {
			return new Handlebars.SafeString(app.tickets.countUpdated());
		});		
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		return this;
	}
});