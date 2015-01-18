var Users = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/clients/users',	
	initialize: function(){
	}
});