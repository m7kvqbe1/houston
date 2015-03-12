Backbone.View.prototype.close = function(){
	console.log('closing');
	this.remove();
	this.unbind();
	if (this.onClose){
	this.onClose();
	}
};

var AppRouter = Backbone.Router.extend({
	root: '/',
	routes: {
	//set up routes
		"": "login",
		"reset/:token": "reset",		
		"register": "register"
	},
	
	initialize: function() {
		
		this.loginModel = new LoginModel();		
		this.registerModel = new RegisterModel();

		this.appElement = $("#app");
		//doesnt work?
	},

	currentView: false,
	showView: function(view) {
		if (this.currentView) this.currentView.close();
		this.currentView = view;
		$("#app").html(this.currentView.render().el);
	},
	
	login: function(){
		var loginView = new LoginView({model: this.loginModel});
		this.showView(loginView);
	},

	reset: function(token){
		var resetView = new ResetView({model: this.loginModel});
		resetView.model.set('token', token);
		this.showView(resetView);
	},
	
	register: function(){
		var registerView = new RegisterView({model: this.registerModel});
		this.showView(registerView);
	}
});

var app = new AppRouter();

$(function() { Backbone.history.start({ pushState: true, root: app.root })});

$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
	var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
	var root = location.protocol + "//" + location.host + app.root;
	if (href.prop.slice(0, root.length) === root) {
		evt.preventDefault();
		Backbone.history.navigate(href.attr, true);
	}
});