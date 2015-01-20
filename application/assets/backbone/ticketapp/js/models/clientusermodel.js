var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			this.view.usersView.collection.fetch();
			// this.view.parent.collection.fetch(); Works but fetches all of the client data again, rather than just the client that has been updated
		});
	},
	urlRoot: '/user',
	url: '/user'
});