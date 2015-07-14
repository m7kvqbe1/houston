var TicketHeaderView = Backbone.View.extend({
	className: 'box-app-top msg-top',
	agentTemplate: JST.ticketheaderview,

	userTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>'+
			'<div class="btn ticketheader-agent">{{getUserName attributes.agent}}</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="btn on-hold">Awaiting Agent</div>'+
		'{{/if}}'
	),

	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);
	},

	onClose: function(){
		this.stopListening();
	},

	render: function (){
		if(app.user.attributes.role === 'USER'){
			this.$el.html(this.userTemplate(this.model));
		} else {
			this.$el.html(this.agentTemplate(this.model));
		}

		return this;
	}
});