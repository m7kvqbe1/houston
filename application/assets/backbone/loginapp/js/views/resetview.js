var ResetView = Backbone.View.extend({
	template: JST.resetview,

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .reset': 'reset',
			'input input': 'resetErrorMessage',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch'
		});
		return this;
	},

	passMatch: function(e){
		console.log('match');
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e){	
		validate.registerPasswordShowCount(e.currentTarget);
	},	

	resetErrorMessage: function(){
		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');
	},
		
	reset: function() {
		if(!validate.validateForm(this.$el.find('#form-pass-confirm'))) return;

		if(this.$el.find('input[name=pass]').val() !== this.$el.find('input[name="pass-c"]').val()) {
			this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			this.$el.find('.box-log h3.log-tag').hide().text('Please ensure passwords match').addClass('text-animate');		
			return;
		}
		
		this.model.url = '/api/auth/reset/complete';
		this.model.set({
			password: this.$el.find('input[name="pass-c"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: function(model,response,options){
					window.location.href = '';
				},
				error: _.bind(function(){
					this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
					this.$el.find('.box-log h3.log-tag').hide().text('Something went wrong').addClass('text-animate');
				}, this)
			}
		);	
	},
});