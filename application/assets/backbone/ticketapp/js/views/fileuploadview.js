var FileUploadView = Backbone.View.extend({
//paydirtapp.com/blog/backbone-in-practice-dirty-object-handling/
//blog.soom.la/2014/04/backbone-js-a-better-fetch-function.html
	template: Handlebars.compile(
		'<div class="attach-files">' +
			'<a class="attach-link">Attach files to this ticket</a>' + 
			'<div class="supported">Supported -</div>' + 
			'<ul class="filetypes">' +
				'<li>Jpg</li>' +
				'<li>Png</li>' +
				'<li>Gif</li>' +
				'<li>Pdf</li>' +
			'</ul>' +
			'<div class="file-input-wrapper">'+
				'<div id="drop_zone">Drop files here</div>'+
				'<input type="file" id="filesInput" name="files[]" multiple />'+
			'</div>'+
			'<ul id="files" class="files">'+
			'{{#each models}}'+
				'<li class="file">'+
					'<div class="file-text {{attributes.status}}">'+		
						'<img class="svg-loader" src="/application/assets/img/oval.svg" width="52" alt="Loading">'+
		  				'<div class="file-icon">'+
		  					'<span>'+
		  					'{{#if attributes.type}}'+
		  					'{{formatFileType attributes.type}}'+
		  					'{{else}}'+
		  					'FILE'+
		  					'{{/if}}'+
		  					'</span>'+
		  				'</div>'+
		  				'<div class="file-info">'+
							'<div class="filename">{{attributes.name}}</div>'+
							'<a data-cid="{{cid}}" class="file-del">Delete</a>'+
							//If a displayable image add preview button
							'{{#unless attributes.status}}'+
							'{{showFileUploadPreviewLink attributes.type attributes.target cid}}'+
							'{{/unless}}'+	
						'</div>'+
					'</div>'+					
				'</li>'+
			'{{/each}}'+
			'</ul>' +	
		'</div>'
	),

	initialize : function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);
		this.listenTo(this.collection, 'add', this.markAsChanged);
	},

	onClose: function(){
		this.stopListening();
	},

	render : function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .attach-link': 'fileDialogTrigger',
			'dragover #drop_zone': 'handleDragOver',
			'dragleave #drop_zone': 'handleDragLeave',
			'drop #drop_zone': 'handleDragFileSelect',
			'change #filesInput': 'handleFileSelect',
			'click .file-del': 'deleteFile',
			'click .file-preview': 'previewFile',
			'click .preview-close': 'previewClose'
		});
	},

	deleteFile: function(e){
		var button = $(e.currentTarget);
		var cid = button.data("cid");	
		var fileToDelete = this.collection.get(cid);
		if(fileToDelete.isNew()){
			fileToDelete.attributes.request.abort();
			fileToDelete.destroy();
		} else {
			fileToDelete.url = '/api/tickets/file/'+fileToDelete.id;
			fileToDelete.destroy();
		}
	},

	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {
			//Skip file if over maximum file size
			if(f.size > 100000000) {
				var name = f.name;
				if(name.length > 30){
					var type = name.substr(name.indexOf('.') + 1);
					name = name.substr(0,27) + '...[' + type + ']';
				}
				houston.createModal({type: 'File Error', message: "The file '" + name + "' is over the 100mb limit?"}
			    );	
			    continue;
			}

			//Create model as property of the file
			f.model = new FileUploadModel();
			//Create a fileReader object
			var reader = new FileReader();

			//Setup fileReader events
			reader.onloadstart = _.bind((function(theFile) {
		        return function() {        	
			        this.collection.add(theFile.model);
		        };
	        })(f), this);

			reader.onloadend = (function(theFile) {
		        return function(e) {
		        	var attributes = {
						status: 'loading',
						target: e.target.result,
						name: theFile.name,
						type: theFile.type,
						lastModifiedDate: theFile.lastModifiedDate,
					}
					
					theFile.model.set({ 
						request: theFile.model.save(attributes,{
							success: function(model){
								model.set({status: false});
							}, error: function(model,response,options){
								console.log(response);
							}
						})
					});
		        };
	        })(f);

	        reader.onerror = this.fileErrorHandler;
	        reader.readAsDataURL(f);
	  	}
	},

	fileErrorHandler: function(evt){
		console.log(evt);
		switch(evt.target.error.code) {
			case 1:
				alert('File Not Found!');
				break;
			case 4:
				alert('File is not readable');
				break;
			case 3:
				alert('File upload aborted');
				break; 
			default:
				alert('An error occurred reading this file.');
		};
	},

	fileDialogTrigger: function(){
		this.$el.find('#filesInput').trigger('click');
	},

	handleFileSelect: function(evt) {
		this.addFiles(evt.target.files);
	},

	handleDragFileSelect: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	    this.addFiles(evt.dataTransfer.files);
	},

	handleDragOver: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).addClass('drop-highlight');
	    evt.dataTransfer.dropEffect = 'copy';     
	},

	handleDragLeave: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	},

	previewFile: function(e){ 
		var button = $(e.currentTarget);
		var cid = button.data("cid");	
		var fileToPreview = this.collection.get(cid);
		fileToPreview.set({preview: true});

		app.preview = new PreviewWindow({collection: app.files.filesPreviewCollection});
		app.preview.render();
		app.modalWindow.append(app.preview.$el);
	}

});

var PreviewWindow = Backbone.View.extend({
	className: 'preview-window-inner',
	template: Handlebars.compile(
		'{{#each models}}'+
			'{{#if attributes.preview}}'+
				'<div class="preview-wrap">'+
					'<div class="preview-img-wrap">'+
						'<i class="preview-close icon-cancel-circled"></i>'+
						'<div class="preview-img-box">'+
							'<div class="preview-img-info">'+
								'<div class="preview-prev">'+
									'{{generateFilePreviousLink @index}}'+				
								'</div>'+
								'<h3 class="preview-filename">{{attributes.name}}</h3>'+
								'<div class="preview-next">'+	
									'{{generateFileNextLink @index collection.length}}'+
								'</div>'+
							'</div>'+
							// '<div class="img-wrap" style="height:{{maxHeightImg}}px; width:{{maxWidthImg}}px;">'+
							'<div class="img-wrap">'+					
								'{{#ifCond attributes.type "application/pdf"}}'+
								    '<object data="/api/tickets/file/inline/{{attributes.ref}}" type="application/pdf" width="100%" height="100%" frameborder="0"> alt : <a href="/api/tickets/file/{{attributes.ref}}">test.pdf</a> </object>'+
								'{{else}}'+
								    '<img class="preview-img" style="max-height:{{maxHeightImg}}px;" src="{{#if attributes.ref}}http://' + window.location.hostname + '/api/tickets/file/{{attributes.ref}}{{else}}{{attributes.target}}{{/if}}" />'+	
								'{{/ifCond}}'+													
							'</div>'+
							'<div class="preview-img-bottom">'+
								'<div class="preview-type">'+
									'{{formatFileType attributes.type}}'+
								'</div>'+
								'<div class="preview-download">'+
									'<a data-bypass="true" href="{{#if attributes.ref}}http://' + window.location.hostname + '/api/tickets/file/{{attributes.ref}}{{else}}{{attributes.target}}{{/if}}"><i class="icon-down-circled2"></i></a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'{{/if}}'+
		'{{/each}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);
		//stackoverflow.com/questions/6033010/how-to-capture-the-key-event-from-a-view
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		app.modalWindow.hide();
		this.stopListening();
		app.preview = false;
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .preview-close': 'previewClose',
			'click .prev': 'clickPrevious',
			'click .next': 'clickNext',
			'keydown': 'keyEvent'
		});	
		app.modalWindow.show();	
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 37){
			this.keyMove('previous');
		} else if (keyCode == 39){
			this.keyMove('next');
		} else if (keyCode == 27) {
			this.previewClose();
		}
	//stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
	//stackoverflow.com/questions/5081015/arrow-key-events-with-jquery-not-working-in-anything-other-than-ff
	},

	keyMove: function(direction){
		var current = this.collection.findWhere({preview: true});
		var index = this.collection.indexOf(current);
		if(direction == 'previous'){
			if(index == 0) return;
			this.previous(index);
		} else if(direction == 'next'){
			if(index + 1 == this.collection.length) return;
			this.next(index);
		}
	},

	clickPrevious: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		this.previous(index);
	},

	clickNext: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		this.next(index);
	},

	previous: function(index){
		var prev = index - 1;
		this.collection.models[index].set({preview:false});
		this.collection.models[prev].set({preview:true})
	},

	next: function(index){
		var next = index + 1;
		this.collection.models[index].set({preview:false});
		this.collection.models[next].set({preview:true})
	},

	previewClose: function(){
		this.collection.forEach(function(model, index) {
		    model.unset('preview',{silent: true});
		});
		this.close();
	}
});