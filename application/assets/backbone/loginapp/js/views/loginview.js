var LoginView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div id="login-form-wrap">'+

		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/register">Lets Go</a>'+
		'</div>'
	),

	passReset: false,
	render: function (){
		var formView;	
		this.$el.html(this.template());
		if(!this.passReset){
			formView = new LoginFormView();
		} else {
			formView = new ResetPassView();
		}
		this.showForm(formView);
		return this;
	},

	currentView: false,
	showForm: function(view) {
		if (this.currentView) this.currentView.close();
		this.currentView = view;
		this.$el.find('#login-form-wrap').append(this.currentView.$el);
		this.currentView.render();
	}	
});

var LoginFormView = Backbone.View.extend({
	className: "box box-log",
	template: Handlebars.compile(
		'<h2>Login Here</h2>'+
		'<h3 class="log-tag">Great to see you again!</h3>'+
		'<form id="form-log">'+
			'<input class="required" type="email" name="log-e" placeholder="Email Address" autofocus />'+
			'<input class="required" type="password" name="log-p" placeholder="Password" />'+			
			'<label>'+
				'<input id="log-rem" type="checkbox" name="log-r" value="remember" />'+
				'Remember me on this computer'+
			'</label>'+
			'<button class="login" type="button">Sign In</button>'+
		'</form>'+
		'<h3 class="ib">Help!</h3>&nbsp;'+
		'<a class="forgot">Ive forgotten my password</a>'
	),

	initialize: function() {
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .forgot': 'passwordView',
			'click .login': 'login'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 13){
			e.preventDefault();
			this.login();
		} 
	},

	passwordView: function(){
		app.currentView.passReset = true;
		app.currentView.render();
	},	

	login: function() {
		if(!login.validateForm(this.$el.find('#form-log'))) return;

		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');

		var data = {
			user: this.$el.find('input[name="log-e"]').val(),
			password: this.$el.find('input[name="log-p"]').val(),
			remember: this.$el.find('input[name="log-r"]').is(':checked')
		};

		var request = $.ajax({
			url: "/api/auth/login",
			method: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});

		request.done(function( msg ) {
			window.location.reload();
		});

		request.fail(function( jqXHR, textStatus ) {
			app.currentView.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			app.currentView.$el.find('.box-log h3.log-tag').hide().text('Please try again').addClass('text-animate');
		});
	}
});

var ResetPassView = Backbone.View.extend({
	className: "box box-pass",
	template: Handlebars.compile(
		'<h2>Reset Your Password</h2>'+
		'<h3 class="pass-tag">Out with the old in with the new!</h3>'+
		'<form id="form-pass">'+
			'<input class="required" type="email" name="pass-e" placeholder="Email Address" />'+
			'<h3>A reset link will be sent to this email address, click the link and follow the simple directions.</h3>'+
			'<button class="reset" type="button">Reset</button>'+
		'</form>'+
		'<div class="beige">or</div>'+
		'<a class="btn-can">Cancel</a>'
	),

	initialize: function() {
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .btn-can': 'resetCancel',
			'click .reset': 'resetPassword'
		});
		return this;
	},	

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode === 13){
			e.preventDefault();
			this.resetPassword();
		} else if (keyCode === 27){
			this.resetCancel();
		}
	},

	resetCancel: function(){
		app.currentView.passReset = false;
		app.currentView.render();
	},

	resetPassword: function() {
		if(!login.validateForm(this.$el.find('#form-pass'))) return;

		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.pass-tag').show().removeClass('text-animate');

		var data = {
			emailAddress: this.$el.find('input[name="pass-e"]').val()
		};

		var request = $.ajax({
			url: "/api/auth/reset",
			method: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});

		request.done(function( msg ) {
			app.currentView.$el.find('.box-pass h2').hide().text('Reset Request Sent').addClass('text-animate');
			app.currentView.$el.find('.box-pass h3.pass-tag').hide().text('Please check your email').addClass('text-animate');
		});

		request.fail(function( jqXHR, textStatus ) {
			app.currentView.$el.find('.box-pass h2').hide().text('Oops!').addClass('text-animate');
			app.currentView.$el.find('.box-pass h3.pass-tag').hide().text('We dont recognise that email address.').addClass('text-animate');
		});
	}
});