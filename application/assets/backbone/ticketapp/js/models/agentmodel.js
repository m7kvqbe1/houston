var AgentModel = Backbone.Model.extend({
	url: '/agents',
	initialize: function(){
		this.on("sync", function(){
			this.view.collection.fetch();
		});
	}
});