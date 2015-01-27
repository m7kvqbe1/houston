var UserModel = Backbone.Model.extend({
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		} 
		if(response.companyID.$id){
			response.companyID = response.companyID['$id'];
		}
		return response;
	},
	urlRoot: '/user/self',
	//could this be just url?
});