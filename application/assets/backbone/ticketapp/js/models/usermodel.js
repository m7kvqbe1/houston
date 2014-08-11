var UserModel = Backbone.Model.extend({
	urlRoot: '/user/self',
	defaults: {
		sessionid: '',
		name: 'testname',
		email: 'testemail',
		company: 'testcompany'
	}
});