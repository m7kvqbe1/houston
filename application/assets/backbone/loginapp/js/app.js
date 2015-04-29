Backbone.View.prototype.close = function(){
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
		"validate": "validate",		
		"register": "register"
	},
	
	initialize: function() {
		this.appElement = $("#app");
		//Try to create a cached element to avoid re scannning the dom, but  doesnt work?
	},

	currentView: false,
	showView: function(view) {
		if (this.currentView) this.currentView.close();
		this.currentView = view;
		$("#app").html(this.currentView.render().el);
	},
	
	login: function(){
		var loginView = new LoginView();
		this.showView(loginView);
	},

	reset: function(token){
		var resetModel = new Backbone.Model();
		var resetView = new ResetView({model: resetModel});
		resetView.model.set('token', token);
		this.showView(resetView);
	},

	validate: function(token){
		var validateModel = new Backbone.Model();
		validateModel.url = '/api/verify/' + token;
		var validateView = new ValidateView({model: validateModel});	
		this.showView(validateView);
	},
	
	register: function(){
		var registerModel = new RegisterModel();
		var registerView = new RegisterView({model: registerModel});
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