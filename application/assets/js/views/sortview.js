var SortView = Backbone.View.extend({
	
	template: Handlebars.compile(
			'<div class="box-app-top">' +
				'<h2>Open Tickets</h2>' +
				'<a href="#/tickets/new" class="btn">New Ticket</a>' +
			'</div>' +
			'<div class="box-app">' +
				'<div class="box-app-nav">' +
					'<div class="sort">' +
						'<a href="">Sort By Date</a>' +
						'<a class="mid-link" href="">Sort By Company</a>' +
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
		//this.$el.html(this.template(this.collection.sortByCompany()));
		this.$el.html(this.template(this.collection));
		return this;
	}
	
});