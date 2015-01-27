var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			//fetch the data of the view that has had a user added to it, which triggers its render
			this.currentView.model.fetch();
		});

		//create model's view as an attribute of itself
		this.modelView = new UserView({model: this});
	},
	urlRoot: '/user',
	url: '/user'
});