var Agents = Backbone.Collection.extend({
	model: BufferAgentModel,	
	urlRoot: '/agents',
	url: '/agents',
	initialize: function(){
		this.on("sync", function(){
			// this.view.clientsView.collection.fetch();
		});
	}
});