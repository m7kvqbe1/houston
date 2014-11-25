var FileModel = Backbone.Model.extend({
	initialise: function(){},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
		url: '/tickets/file/meta'
	}
});