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
					//If still uploading show loader
					'{{#if attributes.status}}'+
					'<div class="loader"></div>'+					
					'{{/if}}'+
					'<div class="file-text">'+
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

		Handlebars.registerHelper("showFileUploadPreviewLink", function(type, target, cid){ 
			if(!target) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<a data-cid="'+cid+'" class="file-preview">Preview</a>');
			}
		});

		Handlebars.registerHelper("formatFileType", function(type){
		    if(!type) return;
			return new Handlebars.SafeString(houston.formatFileType(type));
		});
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
			fileToDelete.url = '/tickets/file/'+fileToDelete.id;
			fileToDelete.destroy();
		}
	},

	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {
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
		this.$el.closest('.app-wrap').find('#preview-window').show();
	}

});

var PreviewWindow = Backbone.View.extend({
	template: Handlebars.compile(
		'<i class="preview-close icon-cancel-circled"></i>'+
		'{{#each models}}'+
			'{{#if attributes.preview}}'+
				'{{generateFilePreviousLink @index}}'+
				'<div>{{attributes.name}}</div>'+	
				'{{generateFileNextLink @index collection.length}}'+
				'{{#if attributes.ref}}'+
					'<img src="http://edd.houston.com/tickets/file/{{attributes.ref}}" />'+
				'{{else}}'+
					'<img src="{{attributes.target}}" />'+
				'{{/if}}'+
			'{{/if}}'+
		'{{/each}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);

		Handlebars.registerHelper("generateFilePreviousLink", function(index){
			if(index > 0){
				return new Handlebars.SafeString('<a class="prev" data-index="'+index+'">Prev'+index+'</a>');
			} 
		});

		Handlebars.registerHelper("generateFileNextLink", function(index, length){
			if((length - 1) > index){
				return new Handlebars.SafeString('<a class="next" data-index="'+index+'">Next'+index+length+'</a>');
			}
		});
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .preview-close': 'previewClose',
			'click .prev': 'previous',
			'click .next': 'next'
		});
	},

	previous: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		var prev = index - 1;
		this.collection.models[index].set({preview:false});
		this.collection.models[prev].set({preview:true})

	},

	next: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		var next = index + 1;
		this.collection.models[index].set({preview:false});
		this.collection.models[next].set({preview:true})
	},

	previewClose: function(){
		this.$el.closest('.app-wrap').find('#preview-window').hide();
		this.collection.forEach(function(model, index) {
		    model.unset('preview',{silent: true});
		});
	}
});