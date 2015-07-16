var AccountView = Backbone.View.extend({
	template: JST.accountview,
	
	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);	
	},

	onClose: function(){
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template());
			
		return this;
	}
});