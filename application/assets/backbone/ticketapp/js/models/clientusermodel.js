var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			// this.view.parent.collection.fetch();
			// this.view.model.fetch();
			// this.view.usersView.collection.fetch();
			console.log('clientUserModel')
		});
	},
	urlRoot: '/user',
	url: '/user'
});