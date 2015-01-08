var ClientModel = Backbone.Model.extend({
	initialize: function(){
		this.users = new Users();
		// this.users.clientID = this.id;
		this.users.url = 'client/users/' + this.id;
		this.on('sync', this.users.fetch({
			reset: true,
			success: _.bind(function(){
				$('#clients-wrap').html(app.peopleView.clientsView.render().el);
			}, this)
		}));
	},
	// urlRoot: '/clients',
	url: '/clients',
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
	}
});