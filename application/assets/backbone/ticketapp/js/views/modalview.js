var ModalView = Backbone.View.extend({
	className: 'modal-window-inner',
	template: Handlebars.compile(
		'<div class="modal-outer">'+
			'<div class="modal-wrap">'+
				'<div class="box">'+
				'<h3>{{type}}</h3>'+
				'<h4>{{message}}</h4>'+
				'<div class="modal-buttons">'+
					'<button class="confirm" type="button">OK</button>'+
					'{{#if cancel}}'+
					'<div class="beige or">or</div>'+
					'<button class="btn-can" type="button">Cancel</button>'+
					'{{/if}}'+					
				'</div>'+
				'</div>'+
			'</div>'+
		'</div>'
	),
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.delegateEvents({
			'click .confirm': 'confirm',
			'click .btn-can': 'cancel'
		});
		app.modalWindow.show();
	},

	onClose: function(){
		app.modalWindow.hide();
		app.modal = false;
	},

	cancel: function(){
		if(this.cancelBehaviour) this.cancelBehaviour();
		this.close();		
	},

	confirm: function(){
		if(this.confirmBehaviour) this.confirmBehaviour();
		this.close();
	}
});