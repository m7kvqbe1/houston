var CompanyModel = Backbone.Model.extend({
	urlRoot: '/people',
	defaults: {
		companyName: '',
		users: []
	}
});