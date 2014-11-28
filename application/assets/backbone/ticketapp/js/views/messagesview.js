var MessagesView = Backbone.View.extend({

	template: Handlebars.compile(
		'{{#forEach models}}'+
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
							'<div class="file-text">'+
				  				'<div class="file-icon jpg"></div>'+
				  				'<div class="file-info">'+
									'<div class="filename">{{name}}</div>'+
									'<a href="">Preview</a>'+
									'<a href="">Download</a>'+
								'</div>'+
							'</div>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
				'{{#if $last}}'+						
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
				'{{else}}'+
				'</div>'+
				'{{/if}}'+					
			'</li>'+
		'{{/forEach}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'add sync', this.render);

		var filesUploadCollection = new FilesUpload();
		this.fileUploadView = new FileUploadView({ collection: filesUploadCollection});
		this.fileUploadView.parent = this;

		Handlebars.registerHelper("forEach",function(arr,options) {
			return houston.forEach(arr, options);
		});
	},

	render: function(){
		this.$el.html(this.template(this.collection));

		this.fileUploadView.collection.reset();		
		this.parent.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();
		
		// this.delegateEvents({
		// 	'click .add-message': 'addMessage'
		// });
	}

	// ,
	
	// addMessage: function(){	
	// 	console.log('o');
	// 	//if ticket marked as complete
	// 	if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
	// 		console.log('completion');
	// 		this.model.set({
	// 			status: 'Completed'
	// 		});		
	// 	}
		
	// 	var msg = {
	// 		"author": app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
	// 		"role": "agent",
	// 		"avatar": app.user.attributes.avatar, 
	// 		"company": app.user.attributes.company,
	// 		"date": new Date(),
	// 		"message": this.$el.find('textarea[name="new-textarea"]').val()
	// 	};

	// 	var msgMdl = new MessageModel(msg);

	// 	msgMdl.url = '/tickets/reply/' + this.parent.model.id;
	// 	msgMdl.save();
	// 	console.log('mes');
	// 	//set updated array
	// 	this.parent.saveModel();

	// }
});