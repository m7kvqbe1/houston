var RegisterView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg">'+
			'<h2>Create an Account</h2>'+
			'<h3>Just this one easy form and you\'re done!</h3>'+
			'<div class="reg-form-wrap">'+
				'<form id="form-reg" action="">'+				
					'<div class="vld-wrap vld-pair-one">'+
						'<div class="vld-box">'+
							'<div class="vld">'+
								'<div class="vld-line"></div>'+
								'<div class="vld-line line-btm"></div>'+
								'<div class="vld-cir vld-name">1</div>'+									
							'</div>'+
						'</div>'+
						'<input type="text" name="reg-fn" placeholder="First Name" class="vld-aa" data-vld="vld-a" val="{{attributes.firstName}}" autofocus />'+
						'<input class="inp-spa vld-bb" type="text" name="reg-ln" placeholder="Last Name" data-vld="vld-b" val="{{attributes.lastName}}" />'+						
					'</div>'+
					'<div class="vld-wrap vld-pair-two">'+
						'<div class="vld-box">'+
							'<div class="vld">'+
								'<div class="vld-line"></div>'+
								'<div class="vld-line line-btm"></div>'+
								'<div class="vld-cir vld-name">2</div>'+									
							'</div>'+
						'</div>'+
						'<div class="reg-vrf">'+
							'<input type="email" name="reg-e" placeholder="Email Address" class="email vld-aa" data-vld="vld-a" val="{{attributes.emailAddress}}" />'+
							'<div class="vrf">'+
								'<div class="vrf-cir"><i class="icon-cancel"></i></div>'+
								'<div class="vrf-msg">Already<br />In Use</div>'+
							'</div>'+
						'</div>'+
						'<div class="reg-vrf">'+
							'<input class="inp-spa vld-bb company" type="text" name="reg-c" placeholder="Company" data-vld="vld-b" val="{{attributes.company}}" />'+
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
					'<button class="detailsConfirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/">Cancel</a>'+
				'</form>'+
		'</div>'
	),

	paymentPlanTemplate: Handlebars.compile(
		'<div class="box box-reg">'+
			'<h2>Choose a Pricing Plan</h2>'+
			'<h3>How much Houston do you want {{attributes.firstName}}?</h3>'+
			'<div class="reg-form-wrap">'+
				'<form id="form-payment-plan" action="">'+	
					'<div class="form-row">'+
						'<label>'+
							'<span>Houston Plan 1 - Unlimited Access - Monthly</span>'+
							'<input class="radio1" type="radio" name="plan" value="1" />'+
						'</label>'+
					'</div>'+				
					'<div class="form-row">'+
						'<label>'+
							'<span>Houston Plan 2 - Unlimited Access - Annually</span>'+
							'<input class="radio2" type="radio" name="plan" value="2" />'+
						'</label>'+
					'</div>'+			
					'<button class="planConfirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/">Cancel</a>'+
				'</form>'+
		'</div>'
	),

	paymentTemplate: Handlebars.compile(
		'<div class="box box-reg">'+
			'<h2>Enter Your Payment Details</h2>'+
			'<h3>Almost got your Houston account!</h3>'+
			'<div class="reg-form-wrap">'+
				'<form id="form-payment" action="">'+	
					'<span class="payment-errors"></span>'+
					'<div class="form-row">'+
						'<label>'+
							'<span>Card Number</span>'+
							'<input type="text" size="20" data-stripe="number" />'+
						'</label>'+
					'</div>'+
					'<div class="form-row">'+
						'<label>'+
							'<span>CVC</span>'+
							'<input type="text" size="4" data-stripe="cvc" />'+
						'</label>'+
					'</div>'+				
					'<div class="form-row">'+
						'<label>'+
							'<span>Expiration (MM/YYYY)</span>'+
							'<input type="text" size="2" data-stripe="exp-month" />'+
						'</label>'+
						'<span> / </span>'+
						'<input type="text" size="4" data-stripe="exp-year" />'+
					'</div>'+		
					'<button class="paymentConfirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/">Cancel</a>'+
				'</form>'+
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
		this.model.set({password: ''});
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .detailsConfirm': 'detailsConfirm',
			'blur input': 'validate',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch',
			'focus .email': 'hideAlert',
			'focus .company': 'hideAlert',
			'keydown': 'keyEvent'
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

			// 	Kept for previous register method
			// this.model.save(this.model.attributes,
			// 	{
			// 		success: _.bind(function(model,response,options){
			// 		console.log(response);
			// 			if(response === 1){
			// 				this.$el.html(app.registerView.templateSuccess());
			// 			}
			// 		}, this),
			// 		error: _.bind(function(model,response,options){
			// 		console.log(response);
			// 		}, this)
			// 	}
			// );

			this.$el.html(this.paymentPlanTemplate(this.model));
			this.delegateEvents({
				'click .planConfirm': 'planConfirm'
			});		
		}
	},

	planConfirm: function(){
		this.model.set({
			plan: this.$el.find('input[type="radio"]:checked').val()
		});
		this.$el.html(this.paymentTemplate(this.model));
		this.delegateEvents({
			'click .paymentConfirm': 'paymentConfirm'
		});
	},

	paymentConfirm: function(){
		var form = this.$el.find('form');

		// Disable the submit button to prevent repeated clicks
		//form.find('.paymentConfirm').prop('disabled', true);

		// Get a token from Stripe API
		Stripe.card.createToken(form, this.responseHandler);

	},

	responseHandler: function(status, response){
		var form = $('#form-payment');
		if(response.error){
			form.find('.payment-errors').text(response.error.message);
			//form.find('.paymentConfirm').prop('disabled', false);
		} else {
			app.registerModel.set({
				stripeToken: response.id
			});
			app.registerModel.save(app.registerModel.attributes,
				{
					success: function(model, response, options){
						console.log(response);
						app.registerView.$el.html(app.registerView.templateSuccess());
					},
					error: function(model, response, options){
						console.log(response);
					}
				}
			);
		}
	},
	
});

// templateSuccess: Handlebars.compile(
// 	'<div class="box box-suc">'+
// 		'<h2>You Have a Houston Account!</h2>'+
// 		'<h3>Hoot have thought it would be so easy?</h3>'+
// 		'<div class="got-wrap">'+
// 			'<h2>You\'ve Got Mail!</h2>'+
// 			'<h3>Please click the verification link in the email we just sent you to complete your account creation</h3>'+
// 		'</div>'+
// 	'</div>'
// ),

// this.model.save(this.model.attributes,
// 	{
// 		success: _.bind(function(model,response,options){
// 		console.log(response);
// 			if(response === 1){
// 				this.$el.html(app.registerView.templateSuccess());
// 			}
// 		}, this),
// 		error: _.bind(function(model,response,options){
// 		console.log(response);
// 		}, this)
// 	}
// );