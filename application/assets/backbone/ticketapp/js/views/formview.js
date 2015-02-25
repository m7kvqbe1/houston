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
				'<input type="text" class="required new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
				'<textarea class="required" name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +
				'<div id="file-upload-view-wrap">'+	

				'</div>'+
				'<button class="save" type="button">Create Ticket</button>' +
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib">Cancel</a>' +
			'</form>' +
		'</div>'
	),

	initialize: function() {
		//FILES VIEW
		this.fileUploadView = new FileUploadView({ collection: app.filesUploadCollection});
		this.fileUploadView.parent = this;
	},

	render: function(){
		app.filesUploadCollection.reset();

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
	
	saveModel: function(e){
		if(!houston.validateForm(e.currentTarget)) return;
		this.setModelData();	
		console.log(this.model);		
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(){					
					this.model = new TicketModel();
					app.filesUploadCollection.reset();
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
			date: new Date(),
			updated: this.model.get('updated').concat(app.user.attributes.id),
			files: app.filesUploadCollection.createFilesArray()
		});		
	},

	cancelTicket: function(){
		app.navigate('', {trigger: true});
		this.model.clear();
		app.filesUploadCollection.reset();		
	}

});