var Users = Backbone.Collection.extend({
	model: BufferClientUserModel,	
	url: '/users',	
	usersByClient: function(clientID){
		filtered = this.filter(function(data){
			return data.get('clientID') === clientID;
		});
		return new Backbone.Collection(filtered);
	},
	agentUsers: function(){
		filtered = this.filter(function(data){
			return data.get('role') !== 'USER';
		});
		return new Backbone.Collection(filtered);
	}
});