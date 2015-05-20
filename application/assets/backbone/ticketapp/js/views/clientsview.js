var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div id="company-stream">'+
			'<div id="modal-form" class="active">'+
				'<div class="modal-window-inner">'+
	                '<div class="modal-outer">'+
						'<div class="modal-wrap">'+
							'<div class="box">'+
								'<form>'+
									'<h3>Text</h3>'+
									'<h4>Text</h4>'+
									'<div class="modal-buttons">'+
										'<input id="modal-form-input" type="text" />'+
										'<div class="validated-marker">'+
					                        '<div class="vrf-cir">'+
					                            '<i class="icon-cancel"></i>'+
					                        '</div>'+
					                    '</div>'+
										'<button class="confirm" type="button">OK</button>'+
										'<div class="beige or">or</div>'+
										'<button class="btn-can" type="button">Cancel</button>'+				
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
	            '</div>'+		
			'</div>'+
			'<ul id="clients-stream">'+
	
			'</ul>'+
		'</div>'
	),

	initialize: function() {	
		this.listenTo(this.collection, 'sync sort', this.render);
		_.bindAll(this, 'renderClient');
	},

	onClose: function(){
		this.stopListening();

		app.clients.each(function(model){
			model.modelView.close();
		});
	},

	renderClient: function(model) {
		model.modelView = new ClientView({model: model});

		model.modelView.parent = this;

		this.$el.find('#clients-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		
		return this;
	}
});