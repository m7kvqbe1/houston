var FilterView = Backbone.View.extend({
	
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
						'<a href="#">All Tickets</a>' +
						'<a class="mid-link" href="/#/filter/my-tickets">My Tickets</a>' +
						'<a href="/#/filter/Completed">Completed Tickets</a>' +
					'</div>' +
				'</div>' +
				'<ul id="ticket-stream">' +
					'{{#each models}}<li class="ticket">' +
						'<a href="/#/tickets/{{attributes.url}}">'+
							'<div class="update-alert {{attributes.updated}}"></div>' +
							'<div class="ticket-info">' +					
								'<div class="date">{{attributes.date}}</div>' +
								'<div class="ticket-info-inner">' +
									'<div class="name">{{attributes.name}}</div>' +
									'<div class="company-name">{{attributes.company}}</div>' +
									'<div class="summary">{{attributes.subject}}</div>' +
								'</div>' +
							'</div>' +
							'<div class="ticket-status">' +
								'<div class="btn">{{attributes.status}}</div>' +
								'<div class="ticket-agent">{{attributes.agent}}</div>' +
							'</div>' +
						'</a>'+
					'</li>{{/each}}' +	
				'</ul>' +
			'</div>' 
	),
	
	initialize: function(){
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "change", this.render);
		
		this.listenTo(this.collection, "sort", this.render);
	},
	
	render: function(){		
		if(this.options.filter === 'my-tickets'){
			this.$el.html(this.template(this.collection.byFilter("agent", "Edd N.")));
		} else {
			this.$el.html(this.template(this.collection.byFilter("status", this.options.filter)));
		}
		this.delegateEvents({
			'click .sortByDate': 'sortByDate',
			'click .sortByCompany': 'sortByCompany'
		});
		return this;
	},
	
	sortByDate: function() {
		this.collection.comparator = function(ticketA, ticketB) {
		  if (ticketA.get('date') > ticketB.get('date')) return -1; // before
		  if (ticketB.get('date') > ticketA.get('date')) return 1; // after
		  return 0; // equal
		};
		this.collection.sort();
	},
		
	sortByCompany: function(){
	console.log('trens');
		this.collection.sortBy = function(model) {
			return model.get('company');
			console.log('trens2');
		}
		this.collection.sort();
		console.log('trens3');
	}
	
});