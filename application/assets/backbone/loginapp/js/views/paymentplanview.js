var PaymentPlanView = Backbone.View.extend({
	template: Handlebars.compile(
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
		this.model.set({
			plan: this.$el.find('input[type="radio"]:checked').val()
		});
		app.navigate('register/payment', {trigger: true});
	}
});