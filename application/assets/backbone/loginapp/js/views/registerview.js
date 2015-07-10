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
							'<input type="email" name="reg-e" placeholder="Email Address" class="email vld-aa" data-vld="vld-a" value="{{attributes.emailAddress}}" spellcheck="false" />'+
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
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e) {	
		validate.registerPasswordShowCount(e.currentTarget);
	},
	
	validate: function(e){
		validate.inputValidation(e.currentTarget);
	},
	
	detailsConfirm: function(){
		if(validate.registerCreateValidate(this.$el)){
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