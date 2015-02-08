var PaymentView = Backbone.View.extend({
	template: Handlebars.compile(
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
					'<button class="confirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/#/">Cancel</a>'+
				'</form>'+
		'</div>'
	),
	
	initialize: function() {
		
	},

	render: function (){	
		console.log(this.model);
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .confirm': 'confirm'
		});
		return this;
	},

	confirm: function(){
		var form = this.$el.find('form');

		// Disable the submit button to prevent repeated clicks
		form.find('button').prop('disabled', true);
		console.log(this);
		// Get a token from Stripe API
		Stripe.card.createToken(form, this.responseHandler);

	},

	responseHandler: function(status, response){
		var form = $('#form-payment');
		if(response.error){
			form.find('.payment-errors').text(response.error.message);
			form.find('button').prop('disabled', false);
		} else {
			app.registerModel.set({
				token: response.id
			});
			app.registerModel.url = '/payment/charge';
			app.registerModel.save(app.registerModel.attributes,
				{
					success: function(model,response,options){
					console.log(response);
					},
					error: function(model,response,options){
					console.log(response);
					}
				}
			);
		}
	},

	setStripeData: function(){
		var form = this.$el.find('form');
		var data = {
			number: form.find("input[data-stripe='number']").val(),
			cvc: form.find("input[data-stripe='cvc']").val(),
			expMonth: form.find("input[data-stripe='exp-month']").val(),
			expYear: form.find("input[data-stripe='exp-year']").val()

		}
		console.log(data);
	}
});