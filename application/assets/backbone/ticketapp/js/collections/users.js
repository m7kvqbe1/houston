var Users = Backbone.Collection.extend({
	model: BufferClientUserModel,	
	url: '/clients/users',	
	initialize: function(){
		this.on("sync", function(){
			
		});
	}
});