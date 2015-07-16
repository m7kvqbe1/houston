var MessagesView = Backbone.View.extend({
	tagName: "ul",
	template: JST.messagesview,

	initialize: function(){
		this.listenTo(this.collection, 'add sync', this.render);

		this.fileUploadView = new FileUploadView({ collection: app.files});
		this.fileUploadView.parent = this;

	},

	onClose: function(){
		this.stopListening();
		this.fileUploadView.close();
	},

	render: function(){
		this.$el.html(this.template(this.collection));

		app.files.reset();
		
		this.parent.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();
	}
});