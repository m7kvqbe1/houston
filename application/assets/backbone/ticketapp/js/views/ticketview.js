var TicketDetail = Backbone.View.extend({
	template: Handlebars.compile(
			'<div class="box-app-top msg-top">'+
				'{{#if agent}}'+
					'<h2><a href="#">< All Tickets</a></h2>'+
					'{{generateDropSwitch status}}'+					
					'<div class="dropdown droplist">'+
						'<div class="drop-top rounded">'+
							'<div class="btn in-progress drop-slct">{{agent}}<i class="icon-down-dir-1"></i></div>'+
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
						'<img class="msg-avatar" src="{{avatar}}" alt="{{author}}"/>'+
						'<div class="msg-dtl-inr">'+
							'<h3 class="msg-agent">{{name}}</h3>'+
							'<h4 class="msg-company">{{company}}</h4>'+
							'<div class="msg-date">{{convertToDateTime date}}</div>'+
						'</div>'+
						'<div class="msg-tri"></div>'+
					'</div>'+
					'<div class="msg-body">'+
						'<h5>Ticket Subject</h5>'+
						'<div class="msg-text">'+
							'{{subject}}'+							
						'</div>'+
						'<h5>Ticket Message</h5>'+
						'<div class="msg-text">'+
							'{{message}}'+							
						'</div>'+						
						'<ul class="files">'+
						'{{#each files}}'+
							'<li class="file">'+
								'<div class="file-icon {{filetype}}"></div>'+
								'<div class="filename">{{filename}}</div>'+
								'<a href="">View</a>'+
								'<a href="">Delete</a>'+
							'</li>'+	
						'{{/each}}'+
						'</ul>'+
					'{{#if messages}}'+
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
							'<button class="add-message" type="button">Submit</button>' +
							'<div class="beige or">or</div>' +
							'<a class="cancel-btn ib">Cancel</a>' +
						'</form>' +
					'</div>'+					
					'{{/if}}'+						
				'</li>'+
			'{{#foreach messages}}'+
				'<li class="msg from-{{role}}">'+
					'<div class="msg-dtl">'+
						'<img class="msg-avatar" src="{{avatar}}" alt="{{author}}"/>'+
						'<div class="msg-dtl-inr">'+
							'<h3 class="msg-agent">{{author}}</h3>'+
							'<h4 class="msg-company">{{company}}</h4>'+
							'<div class="msg-date">{{convertToDateTime date}}</div>'+
						'</div>'+
						'<div class="msg-tri"></div>'+
					'</div>'+
					'<div class="msg-body">'+
						'<div class="msg-text">'+
							'{{message}}'+							
						'</div>'+						
						'<ul class="files">'+
						'{{#each files}}'+
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
			'{{/foreach}}'+	
			'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "sync", this.render);		
		this.listenTo(this.model, "request", this.render);	
		this.listenTo(this.model, "all", this.listening);
		
		//http://stackoverflow.com/questions/11479094/conditional-on-last-item-in-array-using-handlebars-js-template
		Handlebars.registerHelper("foreach",function(arr,options) {
			if(options.inverse && !arr.length)
				return options.inverse(this);

			return arr.map(function(item,index) {
				item.$index = index;
				item.$first = index === 0;
				item.$last  = index === arr.length-1;
				return options.fn(item);
			}).join('');
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

	listening: function(){
		console.log('listening');
	},
	
	render: function (){		
		this.$el.html(this.template(this.model.attributes));
		//Add user to updated array if not already there
		//refactored to not need checkIfUpdateSeen method
		if(!houston.updateCheck(this.model.get('updated'))){
			this.update();
		}

		//Add user to updated array if not already there
		//if(!this.checkIfAlreadySeenUpdate()){
			//this.update();
		//}

		this.delegateEvents({
			'click .drop-slct': 'dropSelect',
			'click .dropdown li': 'dropDown',
			'click .reply-btn': 'showReply',
			'click .cancel-btn': 'cancelReply',
			'click .add-message': 'addMessage'
		});
		return this;
	},
	
	/*checkIfUpdateSeen: function(){
		var updated = this.model.get('updated');
		houston.updateCheck(updated);
	},*/

	/*checkIfAlreadySeenUpdate: function(){
		var haveSeen = this.model.get('updated');
		var i;
		for (i = 0; i < haveSeen.length; ++i) {
			if(haveSeen[i] == app.user.attributes.id) {					
				return true;
			}
		}
	},*/
	
	dropSelect: function(e){
		houston.dropSelect(e.currentTarget);		
	},
	
	dropDown: function(e){
		var update = houston.dropDown(e.currentTarget);
		//look for way to do without if
		if(update.param == 'status') {
			this.model.set({
				status: update.value
			});
		} else {
			this.model.set({
				agent: update.value
			});
			//if setting agent for the first time add status of in progress
			var currentStatus = this.model.get('status');
			if(currentStatus == 'New'){
				this.model.set({
					status: 'In Progress'
				});
			}			
		}
		this.save();
	},
	
	showReply: function(){
		houston.replyToggle();
	},
	
	cancelReply: function(){
		houston.replyToggle();
	},
	
	update: function() {
		this.model.set({
			updated: this.model.get('updated').concat(app.user.attributes.id)
		});
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(model, response, options){
					//app.navigate('', {trigger: true});
					//this.render();
				}, this)
			}
		);
	
	},
	
	//Saves and stays within ticketview
	save: function(){
		//Set updated attribute to empty array
		this.model.set({
			//updated: [app.user.attributes.id]
			updated: []
		});
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(model, response, options){
					//app.navigate('', {trigger: true});
					this.render();
				}, this)
			}
		);
	
	},
	
	addMessage: function(){
	//stackoverflow.com/questions/13644080/store-push-to-an-array-in-a-backbone-model
		var msg =
			{
				"author": app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
				"role": "agent",
				"avatar": app.user.attributes.avatar, 
				"company": app.user.attributes.company,
				"date": new Date(),
				"message": this.$el.find('textarea[name="new-textarea"]').val()
			};
		this.model.set({
			messages: this.model.get('messages').concat(msg)			
		});
		
		//if ticket marked as complete
		if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
			this.model.set({
				status: 'Completed'
			});		
		}		
		this.save();
	}
	
});