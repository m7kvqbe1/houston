var FormView = Backbone.View.extend({
	template: JST.formview,

	initialize: function() {
		this.fileUploadView = new FileUploadView({collection: app.files});
		this.fileUploadView.parent = this;

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		this.fileUploadView.close();
	},

	render: function(){
		app.files.reset();

		this.$el.html(this.template(this.model));	
		this.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();

		this.delegateEvents({
			'click .save': 'saveModel',
			'input .new-sub': 'subjectCharCount',
			'click .cancel-btn': 'cancelTicket',
			'input input': 'markAsChanged',
			'input textarea': 'markAsChanged'
		});

		return this;
	},

    keyEvent: function(e){
        var keyCode = e.which;
		if(keyCode == 13){
			
			if($(e.target).is('input')){
				e.preventDefault();
				this.saveModel();
			} 		

		} else if (keyCode == 27){
			this.cancelTicket();
		}
    },

	subjectCharCount: function(){
		return houston.subjectCharCount(this.$el);
	},
	
	saveModel: function(){
		if(!houston.validateForm(this.$el.find('.save'))) return;

		this.setModelData();		
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(){		
					app.changed = false;		
					this.model = new TicketModel();
					app.files.reset();
					app.navigate('', {trigger: true});
				}, this)
			}
		);
	},

	setModelData: function(){
		this.model.set({
			subject: this.$el.find('input[name="new-sub"]').val(),
			message: this.$el.find('textarea[name="new-textarea"]').val(),
			authorID: app.user.attributes.id,
			updated: this.model.get('updated').concat(app.user.attributes.id),
			files: app.files.createFilesArray()
		});		
	},

	cancelTicket: function(){ 
		this.$el.find('input[type="text"], textarea').val('');
			
		app.files.emptyCollection();	
	}
});