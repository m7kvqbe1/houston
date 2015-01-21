var AgentModel = Backbone.Model.extend({
	url: '/agents',
	initialize: function(){
		this.on("sync", function(){
			this.view.collection.fetch();
		});
	},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	}
});