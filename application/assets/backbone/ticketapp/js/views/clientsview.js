var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div id="company-stream">'+
			'<div id="modal-form" class="active">'+
				'<div class="modal-window-inner">'+
	                '<div class="modal-outer">'+
						'<div class="modal-wrap">'+
							'<div class="box">'+
								'<form>'+
									'<h3>Text</h3>'+
									'<h4>Text</h4>'+
									'<div class="modal-buttons">'+
										'<input class="required" type="text" />'+
										'<div class="validated-marker">'+
					                        '<div class="vrf-cir">'+
					                            '<i class="icon-cancel"></i>'+
					                        '</div>'+
					                    '</div>'+
										'<button class="confirm" type="button">OK</button>'+
										'<div class="beige or">or</div>'+
										'<button class="btn-can" type="button">Cancel</button>'+				
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
	            '</div>'+		
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
		return this;
	}

});

var ClientView = Backbone.View.extend({
	tagName: "li",
	className: "client",
	template: Handlebars.compile(
		'<div class="company-info">'+
			'<h3>{{attributes.name}}</h3>'+
			'<a class="edit-client" data-form="3" data-model="{{attributes.id}}">Edit</a>'+
			'<a class="new-client-user" data-form="2" data-model="{{attributes.id}}">New User</a>'+
		'</div>'+
		'<div class="client-stream">'+
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
	}
});

var UsersView = Backbone.View.extend({

	template: Handlebars.compile(
		'<h4 class="client-has-no-users">This client currently has no users</h4>'
	),

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
		if(this.collection.length == 0){
			this.parent.$el.find('.client-user-stream').html(this.template);
		} else {
			this.collection.each(this.renderUser);
		}
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
			'{{/if}}'+
			'<a class="delete-user" data-model="{{attributes.id}}">Delete</a>'
	),

	render: function(){
		this.$el.html(this.template(this.model));
	}

});