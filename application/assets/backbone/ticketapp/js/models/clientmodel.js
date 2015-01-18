var ClientModel = Backbone.Model.extend({
	initialize: function(){
		//lostechies.com/derickbailey/2011/10/11/backbone-js-getting-the-model-for-a-clicked-element/		
		this.on("sync", function(){
			this.view.collection.fetch();
		});
	},
	urlRoot: '/clients',
	url: '/clients',
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
	}
});