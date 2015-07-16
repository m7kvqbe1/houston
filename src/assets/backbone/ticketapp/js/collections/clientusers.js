var ClientUsers = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users'
});