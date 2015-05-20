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
	    		theModel.destroy({wait:true});			
			}
	    );		
	}
});