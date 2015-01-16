var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		this.on("sync", function(){
			// this.view.collection.fetch();
			console.log('clientUserModle')
		});
	},
	urlRoot: '/user',
	url: '/user'
});