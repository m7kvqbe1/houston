var ResetView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/#/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div class="box box-log">'+
			'<h2>Change Password</h2>'+
			'<h3 class="log-tag">Please enter a new password below</h3>'+
			'<form id="form-pass-confirm">'+
				'<input type="password" name="pass" placeholder="Password" />'+
				'<input type="password" name="pass-c" placeholder="Confirm Password" />'+			
				'<button class="reset" type="button">Confirm</button>'+
				'<div class="beige">or</div>'+
				'<a class="btn-can">Cancel</a>'+
			'</form>'+			
		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/#/register">Lets Go</a>'+
		'</div>'
	),
	
	initialize: function() {
		
	},

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .reset': 'reset'
		});
		return this;
	},
		
	reset: function(e) {
		// verification first needs to be performed on new password		
		if(this.$el.find('input[name=pass]').val() !== this.$el.find('input[name="pass-c"]').val()) {
			this.$el.find('.box-log h2').text('Oops!');
			this.$el.find('.box-log h3.log-tag').text('Please ensure passwords match');
			
			return;
		}
		
		this.model.url = '/api/auth/reset/complete';
		this.model.set({
			password: this.$el.find('input[name="pass-c"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: function(model,response,options){
					window.location.href = '/';
				},
				error: _.bind(function(){
					this.$el.find('.box-log h2').text('Oops!');
					this.$el.find('.box-log h3.log-tag').text('Something went wrong');
				}, this)
			}
		);	
	},
});