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
						'<input type="text" name="reg-fn" placeholder="First Name" class="vld-aa" data-vld="vld-a" />'+
						'<input class="inp-spa vld-bb" type="text" name="reg-ln" placeholder="Last Name" data-vld="vld-b" />'+						
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
							'<input type="text" name="reg-e" placeholder="Email Address" class="email vld-aa" data-vld="vld-a" />'+
							'<div class="vrf">'+
								'<div class="vrf-cir"><i class="icon-cancel"></i></div>'+
								'<div class="vrf-msg">Already<br />In Use</div>'+
							'</div>'+
						'</div>'+
						'<input class="inp-spa vld-bb" type="text" name="reg-c" placeholder="Company" data-vld="vld-b" />'+
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
					'<button class="create" type="button">Create</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can" href="/#/">Cancel</a>'+
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
	
	initialize: function() {
		
	},

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .create': 'create',
			'blur input': 'validate',
			'focus .reg-p': 'showCount',
			'blur .reg-p': 'hideCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch',
			'focus .email': 'hideInUse'
		});
		return this;

	},
	
	hideInUse: function(e){
		login.registerHideInUse(e.currentTarget)
	},
	
	passMatch: function(e){
		login.registerPassMatch(e.currentTarget);
	},
	
	passCount: function(e){
		login.registerPassCount(e.currentTarget, this.$el);

	},
	
	showCount: function(e) {	
		login.registerShowCount(e.currentTarget);
	},
	
	hideCount: function(e) {	
		login.registerHideVrf(e.currentTarget);
	},
	
	validate: function(e){
		login.registerValidate(e.currentTarget);
	},
	
	create: function(){
		if(login.registerCreateValidate(this.$el)){
			this.setModelData();
			this.model.save(this.model.attributes,
				{
					success: _.bind(function(model,response,options){
					console.log(response);
						if(response === 1){
							this.$el.html(app.registerView.templateSuccess());
						}
					}, this),
					error: _.bind(function(model,response,options){
					console.log(response);
					}, this)
				}
			);
		}
	},
	
	setModelData: function(){
		this.model.set({
			firstName: this.$el.find('input[name="reg-fn"]').val().capitalize(),
			lastName: this.$el.find('input[name="reg-ln"]').val().capitalize(),
			emailAddress: this.$el.find('input[name="reg-e"]').val(),
			company: this.$el.find('input[name="reg-c"]').val(),
			password: this.$el.find('input[name="reg-p"]').val()
		});
	}
});