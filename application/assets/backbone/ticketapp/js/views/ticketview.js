var TicketDetailView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+

			'</div>'+
		'</div>'+			
		'<ul id="msg-stream" class="box-app" style="{{fullHeightPage}}">'+		
			'<li class="msg from-{{getUserRoleAsClass attributes.authorID}}">'+
				'<div class="msg-dtl">'+
					'<img class="avatar" src="{{getUserAvatar attributes.authorID}}" alt="{{getUserName attributes.authorID}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{getUserName attributes.authorID}}</h3>'+
						'<h4 class="msg-company">{{getCompanyName attributes.authorID}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+					
					'<div class="msg-subject">'+
						'<h5>{{attributes.subject}}</h5>'+	
						'<span>Ticket #{{attributes.reference}}</span>'+						
					'</div>'+
					'<div>'+
						'{{attributes.message}}'+							
					'</div>'+						
					'<ul class="files">'+
					'{{#each attributes.files}}'+
						'<li class="file">'+
							'<div class="file-text">'+
				  				'<div class="file-icon">'+
				  					'<span>'+
				  					'{{#if type}}'+
				  					'{{formatFileType type}}'+
				  					'{{else}}'+
				  					'FILE'+
				  					'{{/if}}'+
				  					'</span>'+
				  				'</div>'+
				  				'<div class="file-info">'+
									'<div class="filename">{{name}}</div>'+
									'{{showFilePreviewLink type @index}}'+
									'<a data-bypass="true" href="http://' + window.location.hostname + '/api/tickets/file/{{ref}}">Download</a>'+
								'</div>'+
							'</div>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
					'{{downloadTicketAttachments attributes.files}}'+
				'{{#if messagesCollection.length}}'+
					'</div>'+											
				'{{else}}'+
				'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea class="required" name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
						'<div id="file-upload-view-wrap">'+	

						'</div>'+
						'{{outputMarkAsCompleted}}'+
						'<div class="reply-submit-buttons">'+
							'<button class="add-message" type="button">Submit</button>' +
							'<div class="beige or">or</div>' +
							'<a class="cancel-btn ib">Cancel</a>' +
						'</div>'+
					'</form>' +
				'</div>'+					
				'{{/if}}'+						
			'</li>'+
			'<div id="messages-wrap">'+

			'</div>'+	
		'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model.messagesCollection, "sync", this.render);

		//TICKET HEADER VIEW
		this.ticketHeaderView = new TicketHeaderView({model: this.model});
		this.ticketHeaderView.parent = this;

		//MESSAGES VIEW
		this.messagesView = new MessagesView({collection: this.model.messagesCollection});
		this.messagesView.parent = this;	

		Handlebars.registerHelper("showFilePreviewLink", function(type, index){ 
			if(!type) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<a data-index="'+index+'" class="file-preview">Preview</a>');
			}
		});
	},

	logSomething: function(){
		console.log('log');
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
			"authorID": app.user.id,
			"message": this.$el.find('textarea[name="new-textarea"]').val(),
			"files": app.files.createFilesArray()
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

		// app.addMessageModel.url = '/api/tickets/reply/' + this.model.id;
		// app.addMessageModel.save(attributes,{
		// 	success: _.bind(function(model){
		// 		app.addMessageModel.clear();
		// 		app.changed = false;
		// 	}, this)
		// });

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

var TicketHeaderView = Backbone.View.extend({
	className: 'box-app-top msg-top',
	agentTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'{{generateDropSwitch attributes.status}}'+					
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct"><span>{{getUserName attributes.agent}}</span><i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct">Awaiting Agent<i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{/if}}'
	),

	userTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>'+
			'<div class="btn ticketheader-agent">{{getUserName attributes.agent}}</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="btn on-hold">Awaiting Agent</div>'+
		'{{/if}}'
	),

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},

	onClose: function(){
		this.stopListening();
	},

	render: function (){
		if(app.user.attributes.role === 'USER'){
			this.$el.html(this.userTemplate(this.model));
		} else {
			this.$el.html(this.agentTemplate(this.model));
		}
	}

});