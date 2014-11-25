var Files = Backbone.Collection.extend({
	model: FileModel,	
	url: '/tickets/file/meta',	
	initialize: function(){
	}
});