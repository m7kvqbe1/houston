var PaymentView = Backbone.View.extend({
	template: JST.paymentview,

	templateSuccess: JST.paymentviewsuccess,

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .payment-confirm': 'paymentConfirm',
			'click .payment-back': 'paymentBack'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.paymentBack();
		} else if (keyCode == 13){
			this.paymentConfirm();
		}
	},		

	paymentConfirm: function(){
		var form = this.$el.find('form');

		//Reset error text
		app.currentView.$el.find('h2 span').show().removeClass('text-animate-ib');
		app.currentView.$el.find('h3 span').show().removeClass('text-animate-ib');

		if(!this.paymentValidate(form)) return;

		// Disable the submit button to prevent repeated clicks
		form.find('.payment-confirm').prop('disabled', true).addClass('loading');

		// Get a token from Stripe API
		Stripe.card.createToken(form, this.responseHandler);

	},

	paymentValidate: function(form) {
		var valid = true;
		var inputs = form.find('input[type="text"]');
		inputs.each(function(){
			var input = $(this);
			if(!input.val()){
				input.addClass('error');
				valid = false;
			} else {
				input.removeClass('error');
			}
		});

		return valid;
	},

	paymentBack: function() {
		var planView = new PlanView({model: this.model});
		app.showView(planView);	
	},

	responseHandler: function(status, response){

		if(response.error){
			app.currentView.$el.find('h2 span').hide().text('OOPS!').addClass('text-animate-ib');
			app.currentView.$el.find('h3 span').hide().text('There was an error with your card details, please try again.').addClass('text-animate-ib');
			app.currentView.$el.find('.payment-confirm').prop('disabled', false).removeClass('loading');
		} else {
			app.currentView.model.set({
				stripeToken: response.id
			});
			app.currentView.model.save(app.currentView.model.attributes,
				{
					success: function(model, response, options){
						console.log(response);
						app.currentView.$el.html(app.currentView.templateSuccess());
					},
					error: function(model, response, options){
						console.log(response);
					}
				}
			);
		}
	},	
});