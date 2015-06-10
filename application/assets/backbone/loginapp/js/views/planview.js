var PlanView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-reg">'+
			'<div class="box-plan">'+
				'<h2><span>Choose a Pricing Plan</span></h2>'+
				'<h3><span>After your 60 day free trial which pricing plan suits you best {{attributes.firstName}}?</span></h3>'+
				'<div class="pricing-plan left-plan">'+
					'<div class="vld-cir">1</div>'+
					'<div class="price">£99.99</div>'+
					'<h3>Unlimited Access<br />Annually</h3>'+
					'<button class="plan-select" type="button" data-plan="1">Select</button>'+
				'</div>'+
				'<div class="svg-wrapper">'+
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 943.6 1025.2">'+
						'<g id="owl">'+
							'<path fill="#9B8D75" d="M785.9 788.2c39.7-76.1 62.8-167.4 62.8-265.6 0-85.3-17.5-165.3-48-234.8 0 0-18.4-219.8 8.2-271.4 25.3-49-108.5 23.5-147.7 68.1-42-36.9-111.1-61.1-189.3-61.4h-1.2c-78.2.2-147.3 24.4-189.3 61.4-39.3-44.5-173-117.1-147.7-68.1 26.6 51.6 8.2 271.4 8.2 271.4-30.6 69.4-48 149.5-48 234.8 0 98.2 23.2 189.5 62.8 265.6-29.4 20.9-46.2 45.1-46.2 70.8 0 79.9 161.2 144.6 360.2 144.9h1.2c199-.3 360.2-65 360.2-144.9 0-25.7-16.8-49.9-46.2-70.8z"/>'+
							'<path class="right-wing" fill="#CFC3AF" d="M926.7 659.5c-23.9-146.9-64.2-262.6-90.1-258.4-.2 0-.5.2-.7.2-.9-.1-1.7-.4-2.7-.3-.1 0-.3-.1-.4-.1-3.2-.2-6.4 1.3-9.6 4.3-26.7 17.5-65.6 89.5-95.3 180.3-36 109.8-44.9 205.4-20 213.6 15.3 5 39.7-24.1 64.6-72.6 2.3 91.6 16.5 157.4 36.7 158.4 16.5.8 33-41.3 44.7-105.9 22.6 93.5 49.9 157.1 69.2 153.9 25.9-4 27.5-126.5 3.6-273.4z"/>'+
							'<path class="left-wing" fill="#CFC3AF" d="M16.9 659.5C40.8 512.6 81.2 396.9 107 401.1c.2 0 .5.2.7.2.9-.1 1.7-.4 2.7-.3.1 0 .3-.1.4-.1 3.2-.2 6.4 1.3 9.6 4.3 26.7 17.5 65.6 89.5 95.3 180.3 36 109.8 44.9 205.4 20 213.6-15.3 5-39.7-24.1-64.6-72.6-2.3 91.6-16.5 157.4-36.7 158.4-16.5.8-33-41.3-44.7-105.9-22.6 93.5-49.9 157.1-69.2 153.9-25.9-4-27.5-126.5-3.6-273.4z"/>'+
							'<path fill="#CFC3AF" d="M314.5 600.5c13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S601 558.2 601 536.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 1.2 25.7 16.8 63.9 38.3 63.9z"/>'+
							'<path fill="#CFC3AF" d="M658.1 624.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 652.2 351 630.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z"/>'+
							'<path fill="#CFC3AF" d="M658.1 718.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 746.2 351 724.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z"/><ellipse fill="#F69328" cx="307.1" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M330.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<ellipse fill="#F69328" cx="365" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M388.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<ellipse fill="#F69328" cx="423" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M446 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<ellipse fill="#F69328" cx="518.4" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M541.4 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<ellipse fill="#F69328" cx="576.3" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M599.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<ellipse fill="#F69328" cx="634.3" cy="995.4" rx="30.8" ry="22.5"/>'+
							'<path fill="#9E6F44" d="M657.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z"/>'+
							'<path fill="#CFC3AF" d="M642.2 95.3c-74.1 0-138.4 41.7-170.8 102.9-32.3-61.6-96.8-103.6-171.2-103.6-106.7 0-193.2 86.5-193.2 193.2C107 394.5 193.5 481 300.2 481c74.1 0 138.4-41.7 170.8-102.9 32.3 61.6 96.8 103.6 171.2 103.6 106.7 0 193.2-86.5 193.2-193.2.1-106.7-86.5-193.2-193.2-193.2z"/>'+
							'<circle fill="#FFF" cx="300.2" cy="287.8" r="136.6"/>'+
							'<circle fill="#FFF" cx="642.2" cy="288.5" r="136.6"/>'+
							'<g id="eyes">'+
								'<circle fill="#060707" cx="310.2" cy="282.8" r="81.6"/>'+
								'<circle fill="#FFF" cx="291.9" cy="244.5" r="16.6"/>'+						
								'<circle fill="#060707" cx="652.2" cy="283.5" r="81.6"/>'+
								'<circle fill="#FFF" cx="633.8" cy="245.2" r="16.6"/>'+
							'</g>'+
							'<path fill="#F69328" d="M523.5 375.3l-51.6 89.4-51.6-89.4 26.1-6.8c16.7-4.4 34.3-4.4 51.1 0l26 6.8z"/>'+
						'</g>'+
					'</svg>'+
				'</div>'+
				'<div class="pricing-plan right-plan">'+
					'<div class="vld-cir">2</div>'+
					'<div class="price">£9.99</div>'+
					'<h3>Unlimited Access<br />Monthly</h3>'+
					'<button class="plan-select" type="button" data-plan="2">Select</button>'+
				'</div>'+
				'<div class="plan-buttons">'+
					'<button class="plan-confirm" type="button">Confirm</button>'+
					'<div class="beige or">or</div>'+
					'<a class="btn-can plan-back">Back</a>'+
				'</div>'+
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

		//nocircleno.com/blog/svg-and-handlebars-js-templates/
		//nocircleno.com/blog/getting-starting-with-svg-and-javascript/
		//css-tricks.com/animating-svg-css/
		//css-tricks.com/guide-svg-animations-smil/
		//www.dreamstime.com/stock-illustration-cat-tree-branch-street-flat-design-cartoon-vector-pets-wild-animals-zoo-nature-children-collection-image45880046
		//ihatetomatoes.net/how-to-animate-svg-with-greensock/
	
		this.owlAnimation();

		return this;


	},

	owlAnimation: function(){

		this.owl = this.$el.find('#owl');
		this.eyes = this.$el.find('#eyes');
		this.leftWing = this.$el.find('.left-wing');
		this.rightWing = this.$el.find('.right-wing');
		this.wl = new TimelineMax({delay:.5});
		this.tl = new TimelineMax({delay:.5});

		this.wl.to(this.leftWing, 0.01, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp')
		.to(this.rightWing, 0.01, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp')

		.to(this.leftWing, 0.35, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown')
		.to(this.rightWing, 0.35, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown')

		.to(this.leftWing, 0.4, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp2')
		.to(this.rightWing, 0.4, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp2')

		.to(this.leftWing, 0.35, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown2')
		.to(this.rightWing, 0.35, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown2')

		// .to(this.leftWing, 0.4, {rotation: 90, transformOrigin:"45% 0%", ease: Back.easeOut.config(1)}, 'flapUp3')
		// .to(this.rightWing, 0.4, {rotation: -90, transformOrigin:"55% 0%", ease: Back.easeOut.config(1)}, 'flapUp3')

		.to(this.leftWing, 0.4, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp3')
		.to(this.rightWing, 0.4, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp3')		

		.to(this.leftWing, 0.8, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown3')
		.to(this.rightWing, 0.8, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown3');		

		
		this.tl.set(this.owl, {y: 2460, x: -200});

		this.tl.to(this.owl, 2.5, {y: -300, x: 0, ease: Back.easeOut.config(1)})
		.to(this.eyes, 0.8, {x:25, delay: 0.7})
		.to(this.eyes, 0.8, {x:-33, delay: 0.2})
		.to(this.eyes, 0.6, {x:0, delay: 0.2})
		.to(this.leftWing, 0.5, {x:5, y:-26, rotation: 4, transformOrigin:"top right", delay: 0.4}, 'shrugUp')
		.to(this.rightWing, 0.5, {x:-5, y:-26, rotation: -4, transformOrigin:"top left", delay: 0.4}, 'shrugUp')
		.to(this.leftWing, 0.5, {x:0, y:0, rotation: 0, transformOrigin:"top right"}, 'shrugDown')
		.to(this.rightWing, 0.5, {x:0, y:0, rotation: 0, transformOrigin:"top left"}, 'shrugDown');	
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

	planCount: "A",
	planSelect: function(e){
		var plan = $(e.currentTarget).data('plan');
		var currentPlan = this.model.get('plan');
		this.planCount += 'A';

		this.model.set({
			plan: plan
		});

		if(plan === 1){
			this.planSelectOne();

		} else if(plan === 2){
			this.planSelectTwo();

		}		
	},

	planSelectOne: function(){
		this.$el.find('.right-plan .vld-cir').removeClass('delayed-icon-animate');
		this.$el.find('.left-plan .vld-cir').addClass('delayed-icon-animate');

		this.tl.to(this.eyes, 0.6, {x:-33}, this.planCount)
		.to(this.rightWing, 0.4, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, this.planCount)
		.to(this.leftWing, 0.6, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, this.planCount);
	},

	planSelectTwo: function(){
		this.$el.find('.left-plan .vld-cir').removeClass('delayed-icon-animate');
		this.$el.find('.right-plan .vld-cir').addClass('delayed-icon-animate');

		this.tl.to(this.eyes, 0.6, {x:25}, this.planCount)
		.to(this.leftWing, 0.4, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, this.planCount)
		.to(this.rightWing, 0.6, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, this.planCount);		
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