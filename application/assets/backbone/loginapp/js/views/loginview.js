var LoginView = Backbone.View.extend({
	template: JST.loginview,

	passReset: false,
	render: function (){
		var formView;
		console.log(this.template);
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