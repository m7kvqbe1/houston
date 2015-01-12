var ClientModel = Backbone.Model.extend({
	initialize: function(){
		//lostechies.com/derickbailey/2011/10/11/backbone-js-getting-the-model-for-a-clicked-element/		
		// this.users.url = 'client/users/' + this.id;
		// this.on('sync', this.users.fetch({
		// 	reset: true,
		// 	success: _.bind(function(){
		// 		// $('#clients-stream').html(app.peopleView.clientsView.render().el);
		// 	}, this)
		// }));
	},
	urlRoot: '/clients',
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