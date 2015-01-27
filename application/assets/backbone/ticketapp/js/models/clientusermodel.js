var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			//fetch the usersCollection of the model that has had a user added to it, which triggers its render
			this.currentView.model.usersCollection.fetch();
		});

		//create model's view as an attribute of itself
		this.modelView = new UserView({model: this});
	},
	urlRoot: '/user',
	url: '/user'
});