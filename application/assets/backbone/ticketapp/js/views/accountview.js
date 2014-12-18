var AccountView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Account Settings</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">' +
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	}
});