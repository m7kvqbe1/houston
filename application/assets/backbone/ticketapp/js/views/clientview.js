var ClientView = Backbone.View.extend({
	tagName: 'li',
	className: 'client',
	template: JST.clientview,	

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