var PaymentView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg">'+
			'<div class="payment-header">'+
				'<h2><span>Enter Your Payment Details</span></h2>'+
				'<h3><span>Almost got your Houston account!</span></h3>'+
			'</div>'+
			'<div class="payment-form-wrap">'+
			'<div class="payment-houston"></div>'+
				'<form id="form-payment" action="">'+	
					'<span class="payment-errors"></span>'+
					'<div class="card-front">'+
						'<div class="form-row">'+
							'<label for="card-number">Card Number</label>'+
							'<input id="card-number" type="text" maxlength="20" data-stripe="number" />'+					
						'</div>'+			
						'<div class="form-row expiration-date">'+
							'<label for="expiration-month">Expiration Date</label>'+
							'<input id="expiration-month" type="text" maxlength="2" data-stripe="exp-month" placeholder="MM"/>'+					
							'<input type="text" maxlength="4" data-stripe="exp-year" placeholder="YYYY"/>'+
						'</div>'+	
						'<div class="form-row">'+
							'<label for="cardholder-name">Cardholder Name</label>'+
							'<input id="cardholder-name" type="text" />'+					
						'</div>'+	
					'</div>'+
					'<div class="card-back">'+
						'<div class="form-row">'+
							'<label for="cvc">CVC/CVV</label>'+
							'<input id="cvc" type="text" maxlength="4" data-stripe="cvc" />'+
							'<div>'+
								'<span>The last </span>'+
								'<span>3 or 4 digits </span>'+
								'<span>on back </span>'+
								'<span>of the card</span>'+
							'</div>'+					
						'</div>'+	
					'</div>'+
					'<div class="payment-buttons">'+	
						'<button class="payment-confirm" type="button">'+
							'<span>Confirm</span>'+
							'<img class="svg-dots" src="/application/assets/img/three-dots.svg" width="52" alt="Loading">'+
						'</button>'+
						'<div class="beige or">or</div>'+
						'<a class="btn-can payment-back">Back</a>'+
					'</div>'+
					'<div class="powered-by-stripe"></div>'+
				'</form>'+
			'</div>'+
		'</div>'
	),

	templateSuccess: Handlebars.compile(
		'<div class="box box-suc">'+
			'<h2>You Have a Houston Account!</h2>'+
			'<h3>Hoot have thought it would be so easy?</h3>'+
			'<div class="got-wrap">'+
				'<h2>You\'ve Got Mail!</h2>'+
				'<h3>Please click the verification link in the email we just sent you to complete your account creation</h3>'+
			'</div>'+
		'</div>'
	),

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