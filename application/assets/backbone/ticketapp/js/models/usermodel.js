var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {
		sessionid: '',
		name: 'testname',
		email: 'testemail',
		company: 'testcompany'
	}
});