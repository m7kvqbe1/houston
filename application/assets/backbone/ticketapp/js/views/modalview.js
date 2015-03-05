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
		$('#modal-window').show();
	},

	createLogOutModal: function(){
		this.model.set({type: 'Warning', message: 'Are you sure you would like to log out?', cancel: true});
		this.confirm = function(){
			window.location.href = 'http://' + window.location.hostname + '/logout';
		};
		this.cancel = function(){
			$('#modal-window').hide();
		};
		this.render();
	},

	createUnsavedChangesModal: function(){
		this.model.set({type: 'Warning', message: 'Any unsaved changes will be lost, would you like to continue?', cancel: true});
		this.confirm = function(){
			app.changed = false;
			$('#modal-window').hide();
			app.execute();
		};
		this.cancel = function(){
			$('#modal-window').hide();
			app.navigate(app.changed, {trigger: false});
		};
		this.render();
	}
});