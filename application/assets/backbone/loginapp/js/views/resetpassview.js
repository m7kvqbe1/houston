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
		if(!validate.validateForm(this.$el.find('#form-pass'))) return;

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