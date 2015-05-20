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
		
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + name +'?', cancel: true},
	    	function(){
	    		theModel.destroy({wait:true});		    				
			}
	    );		
	}
});