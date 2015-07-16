var UserView = Backbone.View.extend({
	tagName: 'li',
	className: 'person',
	template: JST.userview,

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
		
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + name +'?', cancel: true},
	    	function(){
	    		theModel.destroy({wait:true});		    				
			}
	    );		
	}
});