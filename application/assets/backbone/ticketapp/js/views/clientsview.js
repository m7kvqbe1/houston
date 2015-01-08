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
					'<h3>{{attributes.name}}</h3>'+
					'<a>Edit</a>'+
					'<a class="new-client-user">New User</a>'+
				'</div>'+
				'<ul class="client-stream">'+
				'<div class="add-person">'+
					'<form class="form-add-client-user" data-clientID="{{id}}">'+
						'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
						'<input type="text" placeholder="Clients Name" />'+
						'<button type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>'+
				'</div>'+
				'{{#users.models}}'+
					'<li class="person">'+
						'<img class="avatar" src="{{attributes.avatar}}" />'+
						'<h3>{{attributes.emailAddress}}</h3>'+
						'<h4>{{position}}</h4>'+
					'</li>'+
				'{{/users.models}}'+
				'</ul>'+					
			'</li>'+		
			'{{/each}}'+	
		'</ul>'
	),

	initialize: function() {	

		this.listenTo(this.collection, "sync", this.render);	

		// this.listenTo(this.collection.attributes.users, "sync", this.render);
	},

	render: function() {
		console.log(this.collection);
		this.$el.html(this.template(this.collection));

		this.delegateEvents({
			'click .form-add-client-user button': 'addClient'
		});
		return this;
	},

		addClient: function(e) {

		var clicked = $(e.currentTarget);
		var form = clicked.closest('form');
		var clientID = form.data(clientID);
		var clientID = clientID.clientid;
		var emailAddress = form.find('input[type="text"]').val()
		console.log(emailAddress);
		console.log(clientID);

		var clt = 
			{
				"emailAddress": emailAddress,
				"clientID": clientID

			}

		var client = new ClientModel(clt);
		client.url = 'user';
		//maybe use different model? 
		client.save();
	}
});