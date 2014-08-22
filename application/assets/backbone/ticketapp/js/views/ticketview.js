var TicketDetail = Backbone.View.extend({
	template: Handlebars.compile(
			'<div class="box-app-top msg-top">'+
				'<h2><a href="#">< All Tickets</a></h2>'+
				'<div class="dropdown dropswitch">'+
				'<div class="drop-inner">'+
					'<div class="drop-top on-hold rounded">'+
						'<div class="btn in-progress drop-slct">In Progress<i class="icon-down-dir-1"></i></div>'+
					'</div>'+
					'<ul class="drop on-hold">'+
						'<li class="slct" data-class="in-progress">In Progress</li>'+
						'<li class="n-slct" data-class="on-hold">On Hold</li>'+
					'</ul>'+
				'</div>'+
				'</div>'+
				'<div class="dropdown droplist">'+
					'<div class="drop-top rounded">'+
						'<div class="btn in-progress drop-slct">Thomas Humphris<i class="icon-down-dir-1"></i></div>'+
					'</div>'+						
					'<ul class="drop">'+
						'<li class="slct">Thomas Humphris</li>'+
						'<li>Edd Neal</li>'+
						'<li>Mark Neale</li>'+
						'<li>James Brown</li>'+
						'<li>Kirk Hammet</li>'+
						'<li>Catherine Bradshaw</li>'+
					'</ul>'+
				'</div>'+		
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
							'<button class="save" type="button">Submit</button>' +
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
							'<div class="msg-date">{{date}}</div>'+
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
							'<button class="save" type="button">Submit</button>' +
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
		
		Handlebars.registerHelper("convertToDateTime", function(attribute) {
			return houston.convertToDateTime(attribute);
		});
	},

	render: function (){		
		this.$el.html(this.template(this.model.attributes));
		this.delegateEvents({
			'click .drop-slct': 'dropSelect',
			'click .dropdown li': 'dropDown',
			'click .reply-btn': 'showReply',
			'click .cancel-btn': 'cancelReply',
			'click .save': 'save'
		});
		return this;
	},
	
	dropSelect: function(e){
		houston.dropSelect(e.currentTarget);
	},
	
	dropDown: function(e){
		houston.dropDown(e.currentTarget);
	},
	
	showReply: function(){
		houston.replyToggle();
	},
	
	cancelReply: function(){
		houston.replyToggle();
	},
	
	save: function(){
		this.setModelData();
		this.model.save(this.model.attributes,
			{
				success: function(model){
					//app.navigate('', {trigger: true});
				}
			}
		);
	
	},
	
	setModelData: function(){
		this.model.set({
			subject: this.$el.find('textarea[name="new-textarea"]').val()
			//messages[0].author: app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
			//messages[0].role: 'agent',
			//messages[0].avatar: 'application/assets/img/avatar.png',//should use user object
			//messages[0].company: app.user.attributes.company,
			//messages[0].date: new Date(),
			//messages[0].message: this.$el.find('textarea[name="new-textarea"]').val()

			//stackoverflow.com/questions/13644080/store-push-to-an-array-in-a-backbone-model
			//messages : this.model.get('units').concat($('#addUnit').val())
		});
	}
	
});