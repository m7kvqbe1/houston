var PreviewWindow = Backbone.View.extend({
	className: 'preview-window-inner',
	template: JST.previewwindow,

	initialize: function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);

		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);		
		this.stopListening();

		app.modalWindow.hide();
		app.preview = false;
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .preview-close': 'previewClose',
			'click .prev': 'clickPrevious',
			'click .next': 'clickNext'
		});	

		app.modalWindow.show();	
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 37){
			this.keyMove('previous');
		} else if (keyCode == 39){
			this.keyMove('next');
		} else if (keyCode == 27) {
			this.previewClose();
		}
	},

	keyMove: function(direction){
		var current = this.collection.findWhere({preview: true});
		var index = this.collection.indexOf(current);
		if(direction == 'previous'){
			if(index == 0) return;
			this.previous(index);
		} else if(direction == 'next'){
			if(index + 1 == this.collection.length) return;
			this.next(index);
		}
	},

	clickPrevious: function(e){
		var button = $(e.currentTarget);
		var index = button.data('index');

		this.previous(index);
	},

	clickNext: function(e){
		var button = $(e.currentTarget);
		var index = button.data('index');

		this.next(index);
	},

	previous: function(index){
		var prev = index - 1;

		this.collection.models[index].set({preview:false});
		this.collection.models[prev].set({preview:true})
	},

	next: function(index){
		var next = index + 1;

		this.collection.models[index].set({preview:false});
		this.collection.models[next].set({preview:true})
	},

	previewClose: function(){
		this.collection.forEach(function(model, index) {
		    model.unset('preview',{silent: true});
		});
		
		this.close();
	}
});