var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-companies-header">'+
			'<h2>Clients</h2>'+
			'<a class="btn">New Client</a>'+
		'</div>'+
		'<ul id="company-stream">'+
			'<div class="add-person add-client">'+
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

		this.listenTo(this.collection, 'sync', this.render);	
		
		_.bindAll(this, "renderClient");
		// this.listenTo(this.collection.attributes.users, "sync", this.render);

		this.addClientModel = new ClientModel();
		this.addClientModel.view = this;
	},

	renderClient: function(model) {
		var clientView = new ClientView({model: model});
		this.$el.find('#clients-stream').append(clientView.$el);
		clientView.render();
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		this.delegateEvents({
			'click .box-companies-header .btn':'addToggle',
			'click .add-client .cancel-btn':'addToggle',
			'click #form-add-client button': 'addClient'
		});
		return this;
	},

	addToggle: function() {
		this.$el.find('.add-client').slideToggle().find('input[type="text"]').focus();
	},


	addClient: function(e) {
		console.log(this.collection);
		var name = this.$el.find('#form-add-client input[type="text"]').val();
		var attributes = 
			{
				"name": name
			}


		this.addClientModel.save(attributes,{
			success: _.bind(function(model){
				this.addClientModel.clear();
			}, this)
		});
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
			'<div class="add-person add-client-user">'+
				'<form class="form-add-client-user">'+
					'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
					'<input type="text" placeholder="Email Address" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'<div id="{{id}}">'+

			'</div>'+
		'</ul>'
	),	

	initialize: function(){
		this.listenTo(this.model, "sync", this.render);

		//new model
		this.addClientModel = new ClientUserModel();
		//give model reference to this view
		this.addClientModel.view = this;

		var usersCollection = new Users();
		usersCollection.url = '/clients/users/' + this.model.id //!!!!! Also need to set the usersCollection.url 
		this.usersView = new UsersView({ collection: usersCollection});
		this.usersView.parent = this;

		//Do something to fetch users?
		this.listenTo(this.model, "sync", this.usersView.collection.fetch());
	},

	render: function(){
		this.$el.html(this.template(this.model));

		this.delegateEvents({
			'click .new-client-user':'addToggle',
			'click .add-client-user .cancel-btn':'addToggle',			
			'click .form-add-client-user button': 'addUser'
		});
	},

	addToggle: function() {
		this.$el.find('.add-client-user').slideToggle().find('input[type="text"]').focus();
	},

	addUser: function() {
		console.log('addingUser')
		var emailAddress = this.$el.find('.form-add-client-user input[type="text"]').val();
		var clientID = this.model.id;
		var attributes = 
			{
				"emailAddress": emailAddress,
				"clientID": clientID

			}

		this.addClientModel.save(attributes,{
			success: _.bind(function(model){
				this.addClientModel.clear();
			}, this)
		});

	}

});

var UsersView = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render);	
		
		_.bindAll(this, "renderUser");
	},

	renderUser: function(model) {
		var userView = new UserView({model: model}); 
		//get ID of parent client model to append view to correct element in the DOM
		//could be done with a class because of the specificity of this.$el
		var ID = '#' + this.parent.model.id;
		this.$el.find(ID).append(View.$el);
		userView.render();
	},

	render: function(){
		this.$el.html(this.template());	
		this.collection.each(this.renderUser);
		return this;
	}

});

var UserView = Backbone.View.extend({
	template: Handlebars.compile(
		'<li class="person">'+
			'<img class="avatar" src="{{attributes.avatar}}" />'+
			'<h3>{{attributes.emailAddress}}test</h3>'+
			'<h4>{{position}}</h4>'+
		'</li>'
	),

	initialize: function(){

	},

	render: function(){
		console.log('userViewRender')
		this.$el.html(this.template(this.model));
	}

});