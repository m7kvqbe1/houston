var RegisterView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg">'+
			'<h2>Create an Account</h2>'+
			'<h3>Just this one easy form and you\'re done!</h3>'+
			'<div class="reg-form-wrap">'+
			'<div class="vld-wrap">'+
				'<div class="vld">'+
					'<div class="vld-line">'+
						'<div class="vld-cir vld-name">1</div>'+
					'</div>'+				
				'</div>'+
				'<div class="vld">'+
					'<div class="vld-line">'+
						'<div class="vld-cir vld-email">2</div>'+				
					'</div>'+
				'</div>'+
				'<div class="vld">'+
					'<div class="vld-line">'+
						'<div class="vld-cir vld-pass">3</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
				'<form id="form-reg" action="">'+
					'<input type="text" name="reg-fn" placeholder="First Name" />'+
					'<input class="inp-spa" type="text" name="reg-ln" placeholder="Last Name" />'+
					'<input type="text" name="reg-e" placeholder="Email Address" />'+
					'<input class="inp-spa" type="text" name="reg-c" placeholder="Company" />'+
					'<input type="text" name="reg-p" placeholder="Password" />'+
					'<input class="inp-lst" type="text" name="register-password-confirm" placeholder="Repeat Password" />'+
					'<button class="create" type="button">Create</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/#/">Cancel</a>'+
				'</form>'+
				'<div class="vrf-wrap">'+
					'<div class="vrf">'+
					'</div>'+
					'<div class="vrf inp-spa">'+
					'</div>'+
					'<div class="vrf">'+
						'<div class="vrf-cir"><i class="icon-cancel"></i></div>'+
						'<div class="vrf-msg">Already<br />In Use</div>'+
					'</div>'+
					'<div class="vrf inp-spa">'+
						'<div class="vrf-cir ok"><i class="icon-ok"></i></div>'+
						'<div class="vrf-msg"></div>'+
					'</div>'+
					'<div class="vrf">'+
					'</div>'+
					'<div class="vrf inp-spa">'+
					'</div>'+
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
	
	initialize: function() {
		
	},

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .create': 'create'
		});
		return this;
	},
	
	create: function(){
		this.setModelData();
		this.model.save(this.model.attributes,
			{
				success: function(){
					this.$el.html(this.templateSuccess());
				}
			}
		);
	
	},
	setModelData: function(){
		this.model.set({
			firstName: this.$el.find('input[name="reg-fn"]').val(),
			lastName: this.$el.find('input[name="reg-ln"]').val(),
			emailAddress: this.$el.find('input[name="reg-e"]').val(),
			company: this.$el.find('input[name="reg-c"]').val(),
			password: this.$el.find('input[name="reg-p"]').val()
		});
	}
	
	
	
});