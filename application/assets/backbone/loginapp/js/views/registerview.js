var RegisterView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg box-reg-form">'+
			'<h2>Create an Account</h2>'+
			'<h3>Just this one easy form and you\'re done!</h3>'+
			'<div class="reg-form-wrap">'+
				'<form id="form-reg" action="">'+				
					'<div class="vld-wrap vld-pair-one {{#if attributes.firstName}}vld-a{{/if}} {{#if attributes.lastName}}vld-b{{/if}}">'+
						'<div class="vld-box">'+
							'<div class="vld">'+
								'<div class="vld-line"></div>'+
								'<div class="vld-line line-btm"></div>'+
								'<div class="vld-cir vld-name">1</div>'+									
							'</div>'+
						'</div>'+
						'<input type="text" id="first-name" name="reg-fn" placeholder="First Name" class="vld-aa" data-vld="vld-a" value="{{attributes.firstName}}" autofocus />'+
						'<input class="inp-spa vld-bb" type="text" name="reg-ln" placeholder="Last Name" data-vld="vld-b" value="{{attributes.lastName}}" />'+						
					'</div>'+
					'<div class="vld-wrap vld-pair-two {{#if attributes.emailAddress}}vld-a{{/if}} {{#if attributes.company}}vld-b{{/if}}">'+
						'<div class="vld-box">'+
							'<div class="vld">'+
								'<div class="vld-line"></div>'+
								'<div class="vld-line line-btm"></div>'+
								'<div class="vld-cir vld-name">2</div>'+									
							'</div>'+
						'</div>'+
						'<div class="reg-vrf">'+
							'<input type="email" name="reg-e" placeholder="Email Address" class="email vld-aa" data-vld="vld-a" value="{{attributes.emailAddress}}" />'+
							'<div class="vrf">'+
								'<div class="vrf-cir"><i class="icon-cancel"></i></div>'+
								'<div class="vrf-msg">Already<br />In Use</div>'+
							'</div>'+
						'</div>'+
						'<div class="reg-vrf">'+
							'<input class="inp-spa vld-bb company" type="text" name="reg-c" placeholder="Company" data-vld="vld-b" value="{{attributes.company}}" />'+
							'<div class="vrf">'+
								'<div class="vrf-cir"><i class="icon-cancel"></i></div>'+
								'<div class="vrf-msg">Already<br />In Use</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="vld-wrap vld-pair-three">'+	
						'<div class="vld-box">'+
							'<div class="vld">'+
								'<div class="vld-line"></div>'+
								'<div class="vld-line line-btm"></div>'+
								'<div class="vld-cir vld-name">3</div>'+									
							'</div>'+
						'</div>'+
							'<div class="reg-vrf">'+
								'<input type="password" class="reg-p vld-aa" name="reg-p" placeholder="Password" class="vld-aa" data-vld="vld-a" />'+
								'<div class="vrf">'+
									'<div class="vrf-cir vrf-count">8</div>'+
									'<div class="vrf-msg"></div>'+
								'</div>'+						
							'</div>'+
							'<div class="reg-vrf">'+
								'<input class="inp-lst vld-bb" type="password" name="register-password-confirm" placeholder="Repeat Password" data-vld="vld-b" disabled="disabled" />'+
								'<div class="vrf">'+
									'<div class="vrf-cir ok"><i class="icon-ok-1"></i></i></div>'+
									'<div class="vrf-msg"></div>'+
								'</div>'+
							'</div>'+
					'</div>'+
					'<button class="details-confirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/">Cancel</a>'+
				'</form>'+
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
		this.model.unset('password');
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .details-confirm': 'detailsConfirm',
			'blur input': 'validate',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch',
			'focus .email': 'hideAlert',
			'focus .company': 'hideAlert'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			window.location.href = 'http://' + window.location.hostname;
		} else if (keyCode == 13){
			this.$el.find('form').focus();
			this.detailsConfirm();
		}
	},
	
	passMatch: function(e){
		login.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		login.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e) {	
		login.registerPasswordShowCount(e.currentTarget);
	},
	
	validate: function(e){
		login.inputValidation(e.currentTarget);
	},
	
	detailsConfirm: function(){
		if(login.registerCreateValidate(this.$el)){
			this.model.set({
				firstName: this.$el.find('input[name="reg-fn"]').val().capitalize(),
				lastName: this.$el.find('input[name="reg-ln"]').val().capitalize(),
				emailAddress: this.$el.find('input[name="reg-e"]').val(),
				company: this.$el.find('input[name="reg-c"]').val(),
				password: this.$el.find('input[name="reg-p"]').val()
			});

			var planView = new PlanView({model: this.model});
			app.showView(planView);	
		}
	}

});

var PlanView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg">'+
			'<div class="box-plan">'+
				'<h2><span>Choose a Pricing Plan</span></h2>'+
				'<h3><span>After your 60 day free trial which pricing plan suits you best {{attributes.firstName}}?</span></h3>'+
				'<div class="pricing-plan">'+
					'<div class="vld-cir">1</div>'+
					'<div class="price">£99.99</div>'+
					'<h3>Unlimited Access<br />Annually</h3>'+
					'<p>Lorem ipsum dolor sit amet, consectetur adipisicing. Eume repellat tempore laudantium cumque dolorem.</p>'+
					'<button class="plan-select" type="button" data-plan="1">Select</button>'+
				'</div>'+
				'<div class="pricing-plan">'+
					'<div class="vld-cir">2</div>'+
					'<div class="price">£9.99</div>'+
					'<h3>Unlimited Access<br />Monthly</h3>'+
					'<p>Lorem ipsum dolor sit amet, consectetur adipisicing. Eume repellat tempore laudantium cumque dolorem.</p>'+
					'<button class="plan-select" type="button" data-plan="2">Select</button>'+
				'</div>'+
				'<button class="plan-confirm" type="button">Confirm</button>'+
				'<div class="beige or">or</div>'+
				'<a class="btn-can plan-back">Back</a>'+
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
			'click .plan-select': 'planSelect',
			'click .plan-confirm': 'planConfirm',
			'click .plan-back': 'planBack'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.planBack();
		} else if (keyCode == 13){
			this.planConfirm();
		}
	},	

	planBack: function(){
		var registerView = new RegisterView({model: this.model});
		app.showView(registerView);	
	},

	planSelect: function(e){
		var plan = $(e.currentTarget).data('plan');
		this.model.set({
			plan: plan
		});
	},

	planConfirm: function(){
		if(!this.model.get('plan')){
			this.$el.find('h2 span').hide().text('OOPS!').addClass('text-animate-ib');
			this.$el.find('h3 span').hide().text('Please choose a pricing plan to continue.').addClass('text-animate-ib');
		} else {					
			var paymentView = new PaymentView({model: this.model});
			app.showView(paymentView);
		}
	}
});

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
						'<button class="payment-confirm" type="button">Confirm</button>'+
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
		form.find('.payment-confirm').prop('disabled', true);

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
			app.currentView.$el.find('.payment-confirm').prop('disabled', false);
		} else {
			app.registerModel.set({
				stripeToken: response.id
			});
			app.registerModel.save(app.registerModel.attributes,
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