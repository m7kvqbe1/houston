var TicketDetailView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top msg-top">'+
					'{{#if attributes.agent}}'+
						'<h2><a href="#">< All Tickets</a></h2>'+
						'{{generateDropSwitch attributes.status}}'+					
						'<div class="dropdown droplist">'+
							'<div class="drop-top rounded">'+
								'<div class="btn in-progress drop-slct">{{attributes.agent}}<i class="icon-down-dir-1"></i></div>'+
							'</div>'+						
							'<ul class="drop">'+
								'{{populateAgentDropdown}}'+
							'</ul>'+
						'</div>'+
					'{{else}}'+
						'<h2><a href="#">< All Tickets</a></h2>'+
						'<div class="btn new">New</div>'+
						'<div class="dropdown droplist">'+
							'<div class="drop-top rounded">'+
								'<div class="btn in-progress drop-slct">Awaiting Agent<i class="icon-down-dir-1"></i></div>'+
							'</div>'+						
							'<ul class="drop">'+
								'{{populateAgentDropdown}}'+
							'</ul>'+
						'</div>'+
					'{{/if}}'+
				'</div>'+
			'</div>'+
		'</div>'+			
		'<ul id="msg-stream" class="box-app" style="{{fullHeightPage}}">'+
			'<li class="msg from-client">'+
				'<div class="msg-dtl">'+
					'<img class="msg-avatar" src="{{#if attributes.avatar}}{{avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{author}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{getUserName attributes.authorID}}</h3>'+
						'<h4 class="msg-company">{{getCompanyName attributes.authorID}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+
					'<h5>Ticket Subject</h5>'+
					'<div class="msg-text">'+
						'{{attributes.subject}}'+							
					'</div>'+
					'<h5>Ticket Message</h5>'+
					'<div class="msg-text">'+
						'{{attributes.message}}'+							
					'</div>'+						
					'<ul class="files">'+
					'{{#each attributes.files}}'+
						'<li class="file">'+
							'<div class="file-text">'+
				  				'<div class="file-icon jpg"></div>'+
				  				'<div class="file-info">'+
									'<div class="filename">{{name}}</div>'+
									'<a href="">Preview</a>'+
									'<a href="http://edd.houston.com/tickets/file/download/{{ref}}">Download</a>'+
								'</div>'+
							'</div>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
				'{{#if attributes.hasMessages}}'+
					'</div>'+											
				'{{else}}'+
				'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
						'<div id="file-upload-view-wrap">'+	

						'</div>'+
						'<label>'+
							'<input id="completed" type="checkbox" name="ticket-completed" value="completed" />'+
							'Mark ticket as completed'+
						'</label>'+
						'<button class="add-message" type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>' +
				'</div>'+					
				'{{/if}}'+						
			'</li>'+
			'<div id="messages-wrap">'+

			'</div>'+	
		'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);

		//MESSAGE BUFFERMODEL
		this.messageModel = new MessageModel();

		//MESSAGES COLLECTION
		var messagesCollection = new Messages();
		this.messagesView = new MessagesView({ collection: messagesCollection});
		this.messagesView.parent = this;
		
	},
	
	render: function (){	
		this.$el.html(this.template(this.model));

		this.messagesView.fileUploadView.collection.reset();

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
			'click .add-message': 'addMessage'
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
		console.log('toggle');
		houston.replyToggle(this.$el);
	},
	
	updateSeen: function() {
		this.model.set({			
			updated: this.model.get('updated').concat(app.user.attributes.id)
		});
		this.model.save(this.model.attributes);	
	},
	
	saveModel: function(){
		//Set updated attribute to empty array
		this.model.set({			
			updated: []
		});
		this.model.save(this.model.attributes);	
	},
	
	addMessage: function(){	
		//If ticket marked as complete
		if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
			this.model.set({
				status: 'Completed'
			});		
		}
		
		var attributes = {
			"authorID": app.user.id,
			"date": new Date(),
			"message": this.$el.find('textarea[name="new-textarea"]').val(),
			"files": this.messagesView.fileUploadView.createFilesArray()
		};

		this.messageModel.url = '/tickets/reply/' + this.model.id;
		this.messageModel.save(attributes,{
			success: _.bind(function(model){
				this.messageModel.clear();
			}, this)
		});

		this.model.set({			
			hasMessages: true
		});

		this.saveModel();

	}
	
});