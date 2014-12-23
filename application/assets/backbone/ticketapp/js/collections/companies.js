var Companies = Backbone.Collection.extend({
	model: CompanyModel,	
	url: '/companies',	
	initialize: function(){
	}
});