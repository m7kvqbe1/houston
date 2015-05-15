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
										'<input id="modal-form-input" type="text" />'+
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
		this.listenTo(this.collection, 'add change remove sort', this.render);
		_.bindAll(this, 'renderClient');
	},

	onClose: function(){
		this.stopListening();
		// console.log(app.clients);
		app.clients.each(function(model){
			console.log(model);
			model.modelView.close();
		});
	},

	renderClient: function(model) {
		model.modelView = new ClientView({model: model});
		model.modelView.parent = this;
		this.$el.find('#clients-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		return this;
	}

});

var ClientView = Backbone.View.extend({
	tagName: 'li',
	className: 'client',
	template: Handlebars.compile(
		'<div class="company-info">'+
			'<h3>{{attributes.name}}</h3>'+
			'<a class="edit-client" data-form="3" data-model="{{attributes.id}}">Rename</a>'+
			'<a class="delete-client">Delete</a>'+
			'<a class="new-client-user" data-form="2" data-model="{{attributes.id}}">New User</a>'+
		'</div>'+
		'<div class="client-stream">'+
			'<ul class="client-user-stream">'+

			'</ul>'+
		'</div>'
	),	

	initialize: function(){	
		this.usersView = new UsersView({collection: this.model.usersCollection});
		this.usersView.parent = this;
	},

	onClose: function(){
		this.stopListening();
		this.usersView.close();
	},

	render: function(){	
		this.$el.html(this.template(this.model));
		this.usersView.render();
		this.delegateEvents({
			'click .delete-client': 'deleteClient'
		});
		return this;
	},

	deleteClient: function(){
		var theModel = this.model;
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + theModel.attributes.name +' and all of its users?', cancel: true},
	    	function(){
	    		theModel.destroy({
    				wait:true,
    				success: function(model){
    					app.users.fetch({
    						success: function(){
		    					app.clients.fetch({
		    						reset: true,
		    						success: function(){
		    							app.users.addUsersToClient();
		    						}
		    					}); 
    						}
    					});
    				}
    			});			
			}
	    );		
	}
});

var UsersView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h4 class="client-has-no-users">This client currently has no users</h4>'
	),

	initialize: function(){
		this.listenTo(this.collection, 'add change remove', this.render);
		_.bindAll(this, 'renderUser');
	},

	logSomething: function(){
		console.log('log');
	},

	onClose: function(){
		this.stopListening();
		this.collection.each(function(model){
			model.modelView.close();
		});
	},

	renderUser: function(model) {
		model.modelView = new UserView({model: model});
		model.modelView.parent = this;
		this.parent.$el.find('.client-user-stream').append(model.modelView.$el);
		model.modelView.render();	
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
	tagName: 'li',
	className: 'person',
	template: Handlebars.compile(
		'<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{attributes.firstName}} {{attributes.lastName}}" />'+
		'<h3>{{#if attributes.firstName}}{{attributes.firstName}} {{attributes.lastName}}{{else}}{{attributes.emailAddress}}{{/if}}</h3>'+
		'{{#ifCond attributes.verify true}}'+
			'<h4>{{getCompanyName id}} {{convertUserRole attributes.role}}</h4>'+
		'{{else}}'+
			'<h4>Awaiting Verification</h4>'+
			'<a class="resend-verification">Resend</a> '+
		'{{/ifCond}}'+
		'<a class="delete-user">Delete</a>'
	),

	onClose: function(){
		this.stopListening();
	},

	render: function(){
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .delete-user': 'deleteUser'
		});
		return this;
	},

	deleteUser: function(){
		var theModel = this.model
		var attributes = theModel.attributes;
		var name;
		if(attributes.firstName){
			name = attributes.firstName + ' ' + attributes.lastName;
		} else {
			name = attributes.emailAddress;
		}
		console.log(theModel.attributes);
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + name +'?', cancel: true},
	    	function(){
	    		theModel.destroy({
	    			wait:true,
	    			success: function(){
	    				console.log('userDestroyed');
	    			}
	    		});		    				
			}
	    );		
	}
});