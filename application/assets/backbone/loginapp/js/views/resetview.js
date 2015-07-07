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
				'<div class="reg-vrf">'+
					'<input class="reg-p required pass-input" type="password" name="pass" placeholder="Password" />'+
					'<div class="vrf">'+
						'<div class="vrf-cir vrf-count">8</div>'+
						'<div class="vrf-msg"></div>'+
					'</div>'+						
				'</div>'+
				'<div class="reg-vrf">'+					
					'<input class="inp-lst required" type="password" name="pass-c" placeholder="Confirm Password" />'+			
					'<div class="vrf">'+
						'<div class="vrf-cir ok"><i class="icon-ok-1"></i></i></div>'+
						'<div class="vrf-msg"></div>'+
					'</div>'+
				'</div>'+						
				'<button class="reset" type="button">Confirm</button>'+
				'<div class="beige">or</div>'+
				'<a href="/" class="btn-can">Cancel</a>'+
			'</form>'+			
		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/#/register">Lets Go</a>'+
		'</div>'
	),

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
		login.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		login.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e){	
		login.registerPasswordShowCount(e.currentTarget);
	},	

	resetErrorMessage: function(){
		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');
	},
		
	reset: function() {
		if(!login.validateForm(this.$el.find('#form-pass-confirm'))) return;

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
					Backbone.history.navigate('');
					Backbone.history.loadUrl();
				},
				error: _.bind(function(){
					this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
					this.$el.find('.box-log h3.log-tag').hide().text('Something went wrong').addClass('text-animate');
				}, this)
			}
		);	
	},
});

var ValidateView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/#/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div class="box box-log">'+
			'<h2>Set Password</h2>'+
			'<h3 class="verify-tag">Please set your password below</h3>'+
			'<form id="form-verify">'+
				'<div class="reg-vrf">'+
					'<input class="reg-p required pass-input" type="password" name="pass" placeholder="Password" />'+
					'<div class="vrf">'+
						'<div class="vrf-cir vrf-count">8</div>'+
						'<div class="vrf-msg"></div>'+
					'</div>'+						
				'</div>'+
				'<div class="reg-vrf">'+					
					'<input class="inp-lst required" type="password" name="pass-c" placeholder="Confirm Password" />'+			
					'<div class="vrf">'+
						'<div class="vrf-cir ok"><i class="icon-ok-1"></i></i></div>'+
						'<div class="vrf-msg"></div>'+
					'</div>'+
				'</div>'+	
				'<h3>Just this final step and your new Houston account will be good to go!</h3>'+							
				'<button class="validate" type="button">Login</button>'+
			'</form>'+			
		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/#/register">Lets Go</a>'+
		'</div>'
	),

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .validate': 'validate',
			'input input': 'resetErrorMessage',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch'
		});
		return this;
	},

	passMatch: function(e){
		console.log('match');
		login.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		login.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e){	
		login.registerPasswordShowCount(e.currentTarget);
	},	

	resetErrorMessage: function(){
		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.verify-tag').show().removeClass('text-animate');
	},
		
	validate: function() {
		if(!login.validateForm(this.$el.find('#form-verify'))) return;

		if(this.$el.find('input[name=pass]').val() !== this.$el.find('input[name="pass-c"]').val()) {
			this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			this.$el.find('.box-log h3.verify-tag').hide().text('Please ensure passwords match').addClass('text-animate');		
			return;
		}

		this.model.url = '/api/verify';
		this.model.set({
			password: this.$el.find('input[name="pass-c"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: function(model,response,options){
					Backbone.history.navigate('/profile');
					Backbone.history.loadUrl();
				},
				error: _.bind(function(model, response){
					console.log(response);
					this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
					this.$el.find('.box-log h3.verify-tag').hide().text('Something went wrong').addClass('text-animate');
				}, this)
			}
		);	
	},
});