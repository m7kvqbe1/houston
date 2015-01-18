var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			// this.view.collection.fetch();
			console.log('clientUserModel')
		});
	},
	urlRoot: '/clients/user',
	url: '/clients/user'
});