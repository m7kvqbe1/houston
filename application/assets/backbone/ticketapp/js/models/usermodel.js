var UserModel = Backbone.Model.extend({
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	},
	urlRoot: '/user/self',
	defaults: {
		firstName: '',
		lastName: '',
		emailAddress: '',
		company: '',
		avatar: "application/assets/img/avatar.png"
	}
});