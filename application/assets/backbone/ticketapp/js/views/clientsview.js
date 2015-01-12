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
			'<li id="clients-stream">'+
			// '{{#each models}}'+			
			// '<li class="company">'+
			// 	'<div class="company-info">'+
			// 		'<h3>{{attributes.name}}</h3>'+
			// 		'<a>Edit</a>'+
			// 		'<a class="new-client-user">New User</a>'+
			// 	'</div>'+
			// 	'<ul class="client-stream">'+
			// 	'<div class="add-person">'+
			// 		'<form class="form-add-client-user" data-clientID="{{id}}">'+
			// 			'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
			// 			'<input type="text" placeholder="Clients Name" />'+
			// 			'<button type="button">Submit</button>' +
			// 			'<div class="beige or">or</div>' +
			// 			'<a class="cancel-btn ib">Cancel</a>' +
			// 		'</form>'+
			// 	'</div>'+
			// 	'{{#users.models}}'+
			// 		'<li class="person">'+
			// 			'<img class="avatar" src="{{attributes.avatar}}" />'+
			// 			'<h3>{{attributes.emailAddress}}</h3>'+
			// 			'<h4>{{position}}</h4>'+
			// 		'</li>'+
			// 	'{{/users.models}}'+
			// 	'</ul>'+					
			// '</li>'+		
			// '{{/each}}'+	
			'</li>'+
		'</ul>'
	),

	initialize: function() {	

		this.listenTo(this.collection, 'add sync', this.render);	
		
		_.bindAll(this, "renderClient");
		// this.listenTo(this.collection.attributes.users, "sync", this.render);
	},

	renderClient: function(model) {
		var clientView = new ClientView({model: model});
		this.$el.find('#clients-stream').append(clientView.$el);
		clientView.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection));	
		this.collection.each(this.renderClient);
		this.delegateEvents({
			'click #form-add-client button': 'addClient'
		});
		return this;
	},

	addClient: function(e) {
		console.log(this.collection);
		var name = this.$el.find('#form-add-client input[type="text"]').val();
		var clt = 
			{
				"name": name
			}

		var client = new ClientModel(clt);
		client.save();
	}

});

var ClientView = Backbone.View.extend({
	template: Handlebars.compile(
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
		'</ul>'
	),	

	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},

	render: function(){
		this.$el.html(this.template(this.model));

		this.delegateEvents({
			'click .form-add-client-user button': 'addUser'
		});
	},

	addUser: function(e) {
	var clicked = $(e.currentTarget);
	var form = clicked.closest('form');
	var emailAddress = form.find('input[type="text"]').val()
	var clientID = this.model.id;
	var attributes = 
		{
			"emailAddress": emailAddress,
			"clientID": clientID

		}

	var client = new UserModel(attributes);
	client.url = 'user';
	//maybe use different model? 
	client.save();
	}

});