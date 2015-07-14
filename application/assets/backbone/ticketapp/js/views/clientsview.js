var ClientsView = Backbone.View.extend({
	template: JST.clientsview,

	initialize: function() {	
		this.listenTo(this.collection, 'sync sort', this.render);
		_.bindAll(this, 'renderClient');
	},

	onClose: function(){
		this.stopListening();

		app.clients.each(function(model){
			model.modelView.close();
		});
	},

	renderClient: function(model) {
		model.modelView = new ClientView({model: model});

		model.modelView.parent = this;

		this.$el.find('#clients-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		
		return this;
	}
});