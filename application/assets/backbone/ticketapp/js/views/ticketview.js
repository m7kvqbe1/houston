var TicketDetailView = Backbone.View.extend({
	template: JST.ticketview,
	
	initialize: function() {
		this.listenTo(this.model.messagesCollection, 'sync', this.render);

		this.ticketHeaderView = new TicketHeaderView({model: this.model});
		this.ticketHeaderView.parent = this;

		this.messagesView = new MessagesView({collection: this.model.messagesCollection});
		this.messagesView.parent = this;	
	},

	onClose: function(){
		this.ticketHeaderView.close();
		this.messagesView.close();
	},
	
	render: function (){	
		this.$el.html(this.template(this.model));

		app.files.reset();

		this.$('.box-app-fixed-inner').append(this.ticketHeaderView.$el);
		this.ticketHeaderView.render();

		this.$('#messages-wrap').append(this.messagesView.$el);
		this.messagesView.render();		

		//Add user to updated array if not already there
		if(!houston.updateCheck(this.model.get('updated'))){
			this.updateSeen();
		}

		this.delegateEvents({
			'click .drop-slct': 'dropSelect',
			'click .dropdown li': 'dropDown',
			'click .reply-btn': 'replyToggle',
			'click .cancel-btn': 'replyToggle',
			'click .add-message': 'addMessage',
			'click .file-preview': 'filePreview',
			'input textarea': 'markAsChanged'
		});

		return this;
	},
		
	dropSelect: function(e){
		houston.dropSelect(e.currentTarget);		
	},
	
	dropDown: function(e){
		var changed = houston.dropDown(e.currentTarget);

		if(changed.param == 'status') {
			this.model.set({
				status: changed.value
			});
		} else {
			this.model.set({
				agent: changed.value
			});
			
			//If setting agent for the first time add status of in progress
			var currentStatus = this.model.get('status');
			
			if(currentStatus == 'New'){
				this.model.set({
					status: 'In Progress'
				});
			}			
		}

		this.saveModel();
	},
	
	replyToggle: function(){
		houston.replyToggle(this.$el);
	},
	
	updateSeen: function() {
		this.model.set({			
			updated: this.model.get('updated').concat(app.user.id)
		});

		this.model.save(this.model.attributes);	
	},
	
	saveModel: function(){
		//Set updated attribute to empty array
		this.model.set({			
			updated: [app.user.id]
		});

		this.model.save(this.model.attributes);	
	},
	
	addMessage: function(e){
		if(!houston.validateForm(e.currentTarget)) return;

		//If ticket marked as complete
		if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
			this.model.set({
				status: 'Completed'
			});		
		}
		
		var attributes = {
			'authorID': app.user.id,
			'message': this.$el.find('textarea[name="new-textarea"]').val(),
			'files': app.files.createFilesArray()
		};

		this.model.messagesCollection.create(
			attributes, 
			{
				wait:true,
				success: function(){
					app.changed = false;
					console.log('success');
				}
			}
		);

		this.saveModel();
	},

	filePreview: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		//If a reply get the reference of the reply
		var ul = button.closest('ul');
		
		if (ul.data("reply")){
			var messageRef = ul.data("reply");
			app.files.createImagesCollectionFromArray(this.model.messagesCollection.get(messageRef).attributes.files);
		} else {
			app.files.createImagesCollectionFromArray(this.model.attributes.files);
		}

		app.files.filesPreviewCollection.models[index].set({preview:true});

		app.preview = new PreviewWindow({collection: app.files.filesPreviewCollection});

		app.preview.render();
		app.modalWindow.html(app.preview.$el);
	}	
});