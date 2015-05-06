var UserModel = Backbone.Model.extend({
	url: '/api/user/self',
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		} 
		if(response.companyID && response.companyID.$id){
			response.companyID = response.companyID['$id'];
		}
		return response;
	},
	initialize: function(){
		this.on('sync', function(){ 
			if(app.currentView) {
				app.users.fetch({reset:true});
			}
		});
	},
	defaults: {
		firstName: '',
		lastName: '',
		avatar: ''
	}
});