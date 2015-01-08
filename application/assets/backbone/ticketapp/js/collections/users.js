var Users = Backbone.Collection.extend({
	model: UserModel,	
	url: '/clients/users',	
	initialize: function(){
	}
});