var UsersView = Backbone.View.extend({
	template: JST.usersview,

	initialize: function(){
		this.listenTo(this.collection, 'add change remove', this.render);
		_.bindAll(this, 'renderUser');
	},

	onClose: function(){
		this.stopListening();

		this.collection.each(function(model){
			model.modelView.close();
		});
	},

	renderUser: function(model) {
		model.modelView = new UserView({model: model});
		model.modelView.parent = this;

		this.parent.$el.find('.client-user-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function(){
		this.parent.$el.find('.client-user-stream').html(''); //clear out existing userViews

		if(this.collection.length == 0){
			this.parent.$el.find('.client-user-stream').html(this.template);
		} else {
			this.collection.each(this.renderUser);
		}
		
		return this;
	}
});