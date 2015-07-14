var PlanView = Backbone.View.extend({
	template: JST.planview,

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

		.to(this.leftWing, 0.4, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp3')
		.to(this.rightWing, 0.4, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp3')		

		.to(this.leftWing, 0.8, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown3')
		.to(this.rightWing, 0.8, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown3');		

		
		this.tl.set(this.owl, {y: 2460, x: -200});

		this.tl.to(this.owl, 2.5, {y: -300, x: 0, ease: Back.easeOut.config(1)})
		.to(this.eyes, 0.5, {x:25, delay: 0.7})
		.to(this.eyes, 0.8, {x:-33, delay: 0.5})
		.to(this.eyes, 0.5, {x:0, delay: 0.5})
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