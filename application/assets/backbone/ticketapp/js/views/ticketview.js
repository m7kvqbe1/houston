var TicketDetail = Backbone.View.extend({
	template: Handlebars.compile(
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
		'<ul id="msg-stream" class="box-app">'+
			'<li class="msg from-client">'+
				'<div class="msg-dtl">'+
					'<img class="msg-avatar" src="{{attributes.avatar}}" alt="{{author}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{attributes.name}}</h3>'+
						'<h4 class="msg-company">{{attributes.company}}</h4>'+
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
							'<div class="file-icon {{filetype}}"></div>'+
							'<div class="filename">{{filename}}</div>'+
							'<a href="">View</a>'+
							'<a href="">Delete</a>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
				'{{#if messages.models}}'+
					'</div>'+											
				'{{else}}'+
				'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
						'<div class="attach-files">' +
							'<a class="attach-link" href="">Attach files to this ticket</a>' + 
							'<div class="supported">Supported -</div>' + 
							'<ul class="filetypes">' +
							'<li>Jpg</li>' +
							'<li>Png</li>' +
							'<li>Gif</li>' +
							'<li>Pdf</li>' +
							'</ul>' +
						'</div>' +
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
		'{{#forEach messages.models}}'+
			'<li class="msg from-{{attributes.role}}">'+
				'<div class="msg-dtl">'+
					'<img class="msg-avatar" src="{{attributes.avatar}}" alt="{{attributes.author}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{attributes.author}}</h3>'+
						'<h4 class="msg-company">{{attributes.company}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+
					'<div class="msg-text">'+
						'{{attributes.message}}'+							
					'</div>'+						
					'<ul class="files">'+
					'{{#each attributes.files}}'+
						'<li class="file">'+
							'<div class="file-icon {{filetype}}"></div>'+
							'<div class="filename">{{filename}}</div>'+
							'<a href="">View</a>'+
							'<a href="">Delete</a>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
				'{{#if $last}}'+						
					'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
						'<div class="attach-files">' +
							'<a class="attach-link" href="">Attach files to this ticket</a>' + 
							'<div class="supported">Supported -</div>' + 
							'<ul class="filetypes">' +
							'<li>Jpg</li>' +
							'<li>Png</li>' +
							'<li>Gif</li>' +
							'<li>Pdf</li>' +
							'</ul>' +
						'</div>' +
						'<label>'+
							'<input id="completed" type="checkbox" name="ticket-completed" value="completed" />'+
							'Mark ticket as completed'+
						'</label>'+
						'<button class="add-message" type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>' +
				'</div>'+
				'{{else}}'+
				'</div>'+
				'{{/if}}'+					
			'</li>'+
		'{{/forEach}}'+	
		'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		
		//stackoverflow.com/questions/11479094/conditional-on-last-item-in-array-using-handlebars-js-template
		Handlebars.registerHelper("forEach",function(arr,options) {
			return houston.forEach(arr, options);
		});
		
		Handlebars.registerHelper("populateAgentDropdown", function(){			
			return new Handlebars.SafeString(houston.populateAgentDropdown());
		});
		
		Handlebars.registerHelper("convertToDateTime", function(attribute) {
			return houston.convertToDateTime(attribute);
		});
		
		Handlebars.registerHelper("generateDropSwitch", function(attribute) {
			return new Handlebars.SafeString(houston.generateDropSwitch(attribute));

		});
	},
	
	render: function (){	
		this.$el.html(this.template(this.model));

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
		//look for way to do without if
		if(changed.param == 'status') {
			this.model.set({
				status: changed.value
			});
		} else {
			this.model.set({
				agent: changed.value
			});
			//if setting agent for the first time add status of in progress
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
		console.log(this.model);
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
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(model, response, options){
					
				}, this)
			}
		);
	
	},
	
	addMessage: function(){	
		//if ticket marked as complete
		if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
			console.log('completion');
			this.model.set({
				status: 'Completed'
			});		
		}
		
		var msg = {
			"author": app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
			"role": "agent",
			"avatar": app.user.attributes.avatar, 
			"company": app.user.attributes.company,
			"date": new Date(),
			"message": this.$el.find('textarea[name="new-textarea"]').val()
		};

		var msgMdl = new MessageModel(msg);

		msgMdl.url = '/tickets/reply/add/' + this.model.id;
		msgMdl.save();

		//set updated array
		this.saveModel();

	}

	// saveMessage: function(){
	// 	this.model.messages.url = '/tickets/reply/add/' + this.model.id;
	// 	console.log(this.model.messages.url);
	// 	//stackoverflow.com/questions/14492226/backbone-js-sync-cant-find-the-url-property
	// 	this.model.messages.invoke('save');
	// 	//think this unnecessarily saves all of the models rather than just the new one.
	
	// }
	
});