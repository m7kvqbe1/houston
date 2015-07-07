var ClientUserModel = Backbone.Model.extend({	
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
	},
	initialize: function() {
		// On deletion of model fetch all user data
		this.on('destroy', function(){
			app.fetchUsers();
		});
	}
});