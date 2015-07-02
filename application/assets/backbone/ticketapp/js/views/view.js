Backbone.View.prototype.markAsChanged = function () {
	app.changed = Backbone.history.fragment;
};

Backbone.View.prototype.close = function(){
	this.remove();
	
	this.unbind();
	
	if(this.onClose){
		this.onClose();
	}
};