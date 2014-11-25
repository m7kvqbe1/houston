var FileUploadModel = Backbone.Model.extend({
	// set a urlroot so the files can be saved to a different place on the server to the ticket?
	initialise: function(){},
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