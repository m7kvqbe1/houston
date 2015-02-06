var FormView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Create Ticket</h2>' +
					'<a class="btn">New Ticket</a>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">' +
			'<form id="form-new">' +
				'<input type="text" class="new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
				'<textarea name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +
				'<div id="file-upload-view-wrap">'+	

				'</div>'+
				'<button class="save" type="button">Create Ticket</button>' +
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib">Cancel</a>' +
			'</form>' +
		'</div>'

	),

	initialize: function() {
		//FILES COLLECTION AND VIEW
		var filesUploadCollection = new FilesUpload();
		this.fileUploadView = new FileUploadView({ collection: filesUploadCollection});
		this.fileUploadView.parent = this;
	},

	render: function(){
		this.fileUploadView.collection.reset();

		this.$el.html(this.template(this.model));	
		this.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();

		this.delegateEvents({
			'click .save': 'saveModel',
			'input .new-sub': 'subjectCharCount',
			'click .cancel-btn': 'cancelTicket'
		});
		return this;
	},
	
	subjectCharCount: function(){
		return houston.subjectCharCount(this.$el);
	},
	
	saveModel: function(){
		if(this.$el.find('input[name="new-sub"]').val()){
			this.setModelData();			
			this.model.save(this.model.attributes,
				{
					success: _.bind(function(){					
						this.model = new TicketModel();
						app.navigate('', {trigger: true});
					}, this)
				}
			);
		} else {
			console.log('invalid');
		}	
	},

	setModelData: function(){
		this.model.set({
			id: null,
			subject: this.$el.find('input[name="new-sub"]').val(),
			message: this.$el.find('textarea[name="new-textarea"]').val(),
			authorID: app.user.attributes.id,
			date: new Date(),
			updated: this.model.get('updated').concat(app.user.attributes.id),
			files: this.fileUploadView.createFilesArray()
		});		
	},

	cancelTicket: function(){
		app.navigate('', {trigger: true});
		this.model.clear();
		this.fileUploadView.collection.reset();		
	}

});