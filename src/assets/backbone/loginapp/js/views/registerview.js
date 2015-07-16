var RegisterView = Backbone.View.extend({
	template: JST.registerview,

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.model.unset('password');
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .details-confirm': 'detailsConfirm',
			'blur input': 'validate',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch',
			'focus .email': 'hideAlert',
			'focus .company': 'hideAlert'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			window.location.href = 'http://' + window.location.hostname;
		} else if (keyCode == 13){
			this.$el.find('form').focus();
			this.detailsConfirm();
		}
	},
	
	passMatch: function(e){
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e) {	
		validate.registerPasswordShowCount(e.currentTarget);
	},
	
	validate: function(e){
		validate.inputValidation(e.currentTarget);
	},
	
	detailsConfirm: function(){
		if(validate.registerCreateValidate(this.$el)){
			this.model.set({
				firstName: this.$el.find('input[name="reg-fn"]').val().capitalize(),
				lastName: this.$el.find('input[name="reg-ln"]').val().capitalize(),
				emailAddress: this.$el.find('input[name="reg-e"]').val(),
				company: this.$el.find('input[name="reg-c"]').val(),
				password: this.$el.find('input[name="reg-p"]').val()
			});

			var planView = new PlanView({model: this.model});
			app.showView(planView);	
		}
	}
});