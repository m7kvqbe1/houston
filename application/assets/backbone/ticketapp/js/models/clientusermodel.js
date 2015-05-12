var ClientUserModel = Backbone.Model.extend({
	initialize: function(){
		// Create model's view as an attribute of itself
		// this.modelView = new UserView({model: this});
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		if(response.clientID){
			response.clientID = response.clientID['$id'];
		}
		if(response.companyID){
			response.companyID = response.companyID['$id'];
		}
		return response;
	}
});

var ClientUsers = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/user'
});