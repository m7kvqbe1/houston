Backbone.View.prototype.markAsChanged = function () {
	app.changed = Backbone.history.fragment;
};

Backbone.View.prototype.close = function(){
	this.remove();
	this.unbind();
	if (this.onClose){
	this.onClose();
	}
};

var FormView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Create Ticket</h2>' +
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
			// 'keydown': 'keyEvent'
		});
		return this;
	},

    keyEvent: function(e){
    	console.log('key');
        var keyCode = e.which;
		if(keyCode == 13){
			e.preventDefault();
			this.saveModel();
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

	cancelTicket: function(){ //Change to empty the form
		app.navigate('', {trigger: true});		
	}

});