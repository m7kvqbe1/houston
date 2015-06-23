var AppRouter = Backbone.Router.extend({
	root: '/',
	routes: {
		"": "login",
		"reset/:token": "reset",
		"verify/:token": "validate",
		"register": "register",
		"*notFound": "login"
	},

	currentView: false,
	showView: function(view) {
		//Create a cached element to avoid re scanning the dom
		if(!this.appElement) this.appElement = $("#app");

		if (this.currentView) this.currentView.close();

		this.currentView = view;

		this.appElement.html(this.currentView.render().el);
	},
	
	login: function(){
		var loginView = new LoginView();

		this.showView(loginView);
	},

	reset: function(token){
		var resetModel = new Backbone.Model({'token': token});

		var resetView = new ResetView({model: resetModel});	

		this.showView(resetView);
	},

	validate: function(token){
		var validateModel = new Backbone.Model({'token': token});

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

$(function() {Backbone.history.start({pushState: true, root: app.root})});

$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
	var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
	var root = location.protocol + "//" + location.host + app.root;

	if (href.prop.slice(0, root.length) === root) {
		evt.preventDefault();
		Backbone.history.navigate(href.attr, true);
	}
});