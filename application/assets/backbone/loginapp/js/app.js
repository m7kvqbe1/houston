var AppRouter = Backbone.Router.extend({
	routes: {
	//set up routes
		"": "login",
		"reset/:token": "reset",		
		"register": "register"
	},
	
	initialize: function() {
		
		//instantiate the login model
		this.loginModel = new LoginModel();
		
		//instantiate the ticket view and set it the login model
		this.loginView = new LoginView({model: this.loginModel});
		
		//instantiate the register model
		this.registerModel = new RegisterModel();
		
		//instantiate the register view and set it the register model
		this.registerView = new RegisterView({model: this.registerModel});
		
		//instantiate the reset view and set it the login model
		this.resetView = new ResetView({model: this.loginModel});
	},
	
	login: function(){
		$('#app').html(this.loginView.render().el);
	},

	reset: function(token){
		this.resetView.model.set('token', token);
		$('#app').html(this.resetView.render().el);
	},
	
	register: function(){
		$('#app').html(this.registerView.render().el);
	}
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});