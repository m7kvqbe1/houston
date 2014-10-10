var Companies = Backbone.Collection.extend({
	model: CompanyModel,	
	url: '/companies/all',	
	initialize: function(){
	}
});