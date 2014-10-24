var LoginView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/#/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div class="box box-log">'+
			'<h2>Login Here</h2>'+
			'<h3 class="log-tag">Great to see you again!</h3>'+
			'<form id="form-log">'+
				'<input type="text" name="log-e" placeholder="Email Address" />'+
				'<input type="password" name="log-p" placeholder="Password" />'+			
				'<label>'+
					'<input id="log-rem" type="checkbox" name="log-r" value="remember" />'+
					'Remember me on this computer'+
				'</label>'+
				'<button class="login" type="button">Sign In</button>'+
			'</form>'+
			'<h3 class="ib">Help!</h3>&nbsp;'+
			'<a class="forgot">Ive forgotten my password</a>'+
		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/#/register">Lets Go</a>'+
		'</div>'
	),
	
	templatePass: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/#/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div class="box box-pass">'+
			'<h2>Reset Your Password</h2>'+
			'<h3 class="pass-tag">out with the old in with the new!</h3>'+
			'<form id="form-pass">'+
				'<input type="text" name="pass-e" placeholder="Email Address" />'+
				'<h3>A reset link will be sent to this email address, click the link and follow the simple directions.</h3>'+
				'<button class="reset" type="button">Reset</button>'+
			'</form>'+
			'<div class="beige">or</div>'+
			'<a class="btn-can">Cancel</a>'+
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
			'click .forgot': 'forgot',
			'click .btn-can': 'render',
			'click .login': 'login',
			'click .reset': 'reset'
		});
		return this;
	},
	
	forgot: function() {
		this.$el.html(this.templatePass());
	},
	
	
	login: function(e) {
		if(login.loginValidate(e.currentTarget)){
			this.model.urlRoot = '/auth/login';
			this.model.set({
				user: this.$el.find('input[name="log-e"]').val(),
				password: this.$el.find('input[name="log-p"]').val(),
				remember: this.$el.find('input[name="log-r"]').attr('checked')
			});
			this.model.save(this.model.attributes,
				{
				//http://stackoverflow.com/questions/11167698/backbone-js-binding-this-to-success-error-callbacks
					success: _.bind(function(model,response,options){
						if(response === 1){
							location.reload();
						} else {
							this.$el.find('.box-log h2').text('Oops!');
							this.$el.find('.box-log h3.log-tag').text('Please try again');
						}
					}, this)
				}
			);
		}
	},
	
	reset: function() {
		this.model.urlRoot = '';
		this.model.set({
			emailAddress: this.$el.find('input[name="pass-e"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(model,response,options){
					if(response === 1){
						this.$el.find('.box-log h2').text('Password Sent');
						this.$el.find('.box-log h3.pass-tag').text('Please check your email');
					} else {
						this.$el.find('.box-log h2').text('Oops!');
						this.$el.find('.box-log h3.pass-tag').text('We dont recognise that email address');
					}
				}, this)
			}
		);
	},
	
});