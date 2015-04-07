var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-companies-header">'+
			'<h2>Clients</h2>'+
			'<a class="btn">New Client</a>'+
		'</div>'+
		'<div id="company-stream">'+
			'<div class="add-person add-client">'+
				'<form id="form-add-client">'+
					'<h4>To add a new client, simply add the client\'s name below.</h4>'+
					'<input class="required" type="text" placeholder="Clients Name" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'<ul id="clients-stream">'+
	
			'</ul>'+
		'</div>'
	),

	initialize: function() {	
		this.listenTo(this.collection, 'sync', this.render);		
		_.bindAll(this, "renderClient");
	},

	onClose: function(){
		this.stopListening();
		this.collection.each(function(model){
			model.modelView.close();
		});
	},

	renderClient: function(model) {
		var clientView = model.modelView;
		clientView.parent = this;
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
		if(!houston.validateForm(e.currentTarget)) return;
		var name = this.$el.find('#form-add-client input[type="text"]').val();
		var attributes = { "name": name };

		app.addClientModel.save(attributes,{
			success: _.bind(function(model){
				app.addClientModel.clear();
			}, this)
		});
	}

});

var ClientView = Backbone.View.extend({
	tagName: "li",
	className: "client",
	template: Handlebars.compile(
		'<div class="company-info">'+
			'<h3>{{attributes.name}}</h3>'+
			'<a>Edit</a>'+
			'<a class="new-client-user">New User</a>'+
		'</div>'+
		'<div class="client-stream">'+
			'<div class="add-person add-client-user">'+
				'<form class="form-add-client-user">'+
					'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
					'<input class="required" type="email" placeholder="Email Address" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'<ul class="client-user-stream">'+

			'</ul>'+
		'</div>'
	),	

	initialize: function(){	
		this.listenTo(this.model, "sync", this.render);	//Listener only required when edit client functionality is added as changes to the collection above trigger a render
		// Create usersView as a child of the client view, populate it with the model's usersCollection
		this.usersView = new UsersView({ collection: this.model.usersCollection});
		this.usersView.parent = this;
	},

	onClose: function(){
		this.stopListening();
		this.usersView.close();
	},

	render: function(){	
		this.$el.html(this.template(this.model));
		//render the usersView child view
		this.usersView.render();
		this.delegateEvents({
			'click .new-client-user':'addToggle',
			'click .add-client-user .cancel-btn':'addToggle',			
			'click .form-add-client-user button': 'addClientUser'
		});
	},

	addToggle: function() {
		this.$el.find('.add-client-user').slideToggle().find('input[type="email"]').focus();
	},

	addClientUser: function(e) {
		if(!houston.validateForm(e.currentTarget)) return;
		var emailAddress = this.$el.find('.form-add-client-user input[type="email"]').val();
		var clientID = this.model.id;
		var attributes = 
			{
				"emailAddress": emailAddress,
				"clientID": clientID
			};

		app.addClientUserModel.save(attributes,{
			success: _.bind(function(model){
				//Hide form with render
				this.render();
				app.addClientUserModel.clear();
			}, this)
		});
	}

});

var UsersView = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.collection, 'add change remove', this.render);			
		_.bindAll(this, "renderUser");
	},

	onClose: function(){
		this.stopListening();
	},

	renderUser: function(model) {
		var userView = model.modelView;
		userView.parent = this;
		this.parent.$el.find('.client-user-stream').append(userView.$el); //find from the parentViews $el
		userView.render();
	},

	render: function(){
		this.parent.$el.find('.client-user-stream').html(''); //clear out existing userViews
		this.collection.each(this.renderUser);
		return this;
	}

});

var UserView = Backbone.View.extend({
	tagName: "li",
	className: "person",
	template: Handlebars.compile(
			'<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{attributes.firstName}} {{attributes.lastName}}"/>'+
			'{{#if attributes.password}}'+									
				'<h3>{{attributes.firstName}} {{attributes.lastName}}</h3>'+
				'<h4>Support Agent</h4>'+
			'{{else}}'+
				'<h3>{{attributes.emailAddress}}</h3>'+
				'<h4>Awaiting Verification</h4>'+
			'{{/if}}'
	),

	render: function(){
		console.log(this.model);
		this.$el.html(this.template(this.model));
	}

});