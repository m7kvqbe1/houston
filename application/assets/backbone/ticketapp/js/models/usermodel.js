var UserModel = Backbone.Model.extend({
	urlRoot: '/user/self',
	defaults: {
		name: 'testname',
		email: 'testemail',
		company: 'testcompany'
	}
});