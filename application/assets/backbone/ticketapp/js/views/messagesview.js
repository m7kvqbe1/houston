var MessagesView = Backbone.View.extend({
	tagName: "ul",
	template: Handlebars.compile(
		'{{#forEach models}}'+
			'<li class="msg from-{{getUserRole attributes.authorID}}">'+
				'<div class="msg-dtl">'+
					'<img class="msg-avatar" src="{{#if attributes.avatar}}{{avatar}}{{else}}/application/assets/img/avatar.png{{/if}}" alt="{{attributes.author}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{getUserName attributes.authorID}}</h3>'+
						'<h4 class="msg-company">{{getCompanyName attributes.authorID}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+
					'<div class="msg-text">'+
						'{{attributes.message}}'+							
					'</div>'+						
					'<ul class="files" data-reply="{{id}}">'+
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
					'{{downloadMessageAttachments attributes.files id}}'+
				'{{#if $last}}'+						
					'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea class="required" name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
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
				'{{else}}'+
				'</div>'+
				'{{/if}}'+					
			'</li>'+
		'{{/forEach}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'add sync', this.render);
		//FILES VIEW
		this.fileUploadView = new FileUploadView({ collection: app.files});
		this.fileUploadView.parent = this;

	},

	onClose: function(){
		this.stopListening();
		this.fileUploadView.close();
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		app.files.reset();		
		this.parent.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();
	}
});