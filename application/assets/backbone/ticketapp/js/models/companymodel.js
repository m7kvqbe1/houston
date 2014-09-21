var CompanyModel = Backbone.Model.extend({
	urlRoot: '/people',
	defaults: {
		companyName: '',
		adminFirstName: '',
		adminLastName: '',
		adminEmailAddress: '',
		users: []
	}
});