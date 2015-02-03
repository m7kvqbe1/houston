var Users = Backbone.Collection.extend({
	model: BufferClientUserModel,	
	url: '/users',	
	initialize: function(){
		this.on("sync", function(){
			
		});
	},
	usersByClient: function(clientID){
		filtered = this.filter(function(data){
			return data.get('clientID') === clientID;
		});
		return filtered;	
	},
	agentUsers: function(){
		filtered = this.filter(function(data){
			return data.get('role') !== 'USER';
		});
		return filtered;
	}
});