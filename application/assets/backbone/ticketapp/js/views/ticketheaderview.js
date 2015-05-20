var TicketHeaderView = Backbone.View.extend({
	className: 'box-app-top msg-top',
	agentTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'{{generateDropSwitch attributes.status}}'+					
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct"><span>{{getUserName attributes.agent}}</span><i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct">Awaiting Agent<i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{/if}}'
	),

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