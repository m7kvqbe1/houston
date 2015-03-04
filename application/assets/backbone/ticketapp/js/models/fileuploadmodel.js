var FileUploadModel = Backbone.Model.extend({
	url: '/api/tickets/file',
	initialise: function(){},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
		status: 'initialising'
	}
});