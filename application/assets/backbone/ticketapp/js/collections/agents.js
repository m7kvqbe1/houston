var Agents = Backbone.Collection.extend({
	model: AgentModel,	
	urlRoot: '/agents',
	url: '/agents',
	initialize: function(){
		this.on("sync", function(){
			this.view.clientsView.collection.fetch();
		});
	}
});