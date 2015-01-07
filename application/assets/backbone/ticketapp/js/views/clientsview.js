var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-companies-header">'+
			'<h2>Clients</h2>'+
			'<a class="btn">New Client</a>'+
		'</div>'+
		'<ul id="company-stream">'+
			'<div class="add-person">'+
				'<form id="form-add-client">'+
					'<h4>To add a new client, simply add the client\'s name below.</h4>'+
					'<input type="text" placeholder="Clients Name" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'{{#each models}}'+			
			'<li class="company">'+
				'<div class="company-info">'+
					'<h3>{{clientName}}</h3>'+
					'<a>Edit</a>'+
					'<a class="new-client-user">New User</a>'+
				'</div>'+
				'<ul class="client-stream">'+
				'<div class="add-person">'+
					'<form id="form-add-client-user">'+
						'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
						'<input type="text" placeholder="Clients Name" />'+
						'<button type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>'+
				'</div>'+
				'{{#each clientUsers}}'+
					'<li class="person">'+
						'<img class="avatar" src="{{avatar}}" />'+
						'<h3>{{name}}</h3>'+
						'<h4>{{position}}</h4>'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+					
			'</li>'+		
			'{{/each}}'+	
		'</ul>'
	),

	initialize: function() {	

		this.listenTo(this.collection, "sync", this.render);	
	},

	render: function() {
		this.$el.html(this.template(this.collection));
	}
});