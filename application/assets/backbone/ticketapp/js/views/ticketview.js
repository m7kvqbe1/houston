var TicketDetail = Backbone.View.extend({
	template: Handlebars.compile(
			'<div class="box-app-top msg-top">'+
				'<h2><a href="#">< All Tickets</a></h2>'+
				'<a class="btn in-progress">In Progress<i class="icon-down-dir-1"></i></a>'+
				'<a class="btn sel-agent">Thomas Humphris<i class="icon-down-dir-1"></i></a>'+			
			'</div>'+
			'<ul id="msg-stream" class="box-app">'+
				'<li class="msg from-client">'+
					'<div class="msg-dtl">'+
						'<img class="msg-avatar" src="{{avatar}}" alt="{{author}}"/>'+
						'<div class="msg-dtl-inr">'+
							'<h3 class="msg-agent">{{name}}</h3>'+
							'<h4 class="msg-company">{{company}}</h4>'+
							'<div class="msg-date">{{date}}</div>'+
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
					'</div>'+
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
						'<a class="btn">Reply</a>'+
					'</div>'+
					'<div class="reply">'+
						'<form id="form-new">' +
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
							'<a class="cancel-btn ib" href="">Cancel</a>' +
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
		this.listenTo(this.model, "change", this.render);		//http://stackoverflow.com/questions/11479094/conditional-on-last-item-in-array-using-handlebars-js-template
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
	},

	render: function (){		
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});