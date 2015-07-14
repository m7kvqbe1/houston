var LoginFormView = Backbone.View.extend({
	className: "box box-log",
	template: JST.loginformview,

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

	login: function(){
		if(!validate.validateForm(this.$el.find('#form-log'))) return;

		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');
		this.$el.find('.login').addClass('loading');

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

		request.done(function(msg) {
			window.location.reload();
		});

		request.fail(function(jqXHR, textStatus){
			app.currentView.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			app.currentView.$el.find('.box-log h3.log-tag').hide().text('Please try again').addClass('text-animate');
			app.currentView.$el.find('.login').removeClass('loading');
		});
	}
});