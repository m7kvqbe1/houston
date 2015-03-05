var AccountView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Manage Your Account</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">' +
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},

	onClose: function(){
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	}
});