var UserModel = Backbone.Model.extend({
	urlRoot: '/user/self',
	defaults: {
		firstName: '',
		lastName: '',
		emailAddress: '',
		company: '',
	}
});