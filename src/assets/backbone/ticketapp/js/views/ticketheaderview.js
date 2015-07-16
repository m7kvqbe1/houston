var TicketHeaderView = Backbone.View.extend({
	className: 'box-app-top msg-top',
	agentTemplate: JST.ticketheaderview,

	userTemplate: JST.ticketheaderviewuser,

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