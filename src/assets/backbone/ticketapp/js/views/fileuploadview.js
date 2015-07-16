var FileUploadView = Backbone.View.extend({
	template: JST.fileuploadview,

	initialize : function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);
		this.listenTo(this.collection, 'add', this.markAsChanged);
	},

	onClose: function(){
		this.stopListening();
		
		// Delete files from unsaved tickets/replies
		if(app.files.length) {
			app.files.emptyCollection();
		}
	},

	render : function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .attach-link': 'fileDialogTrigger',
			'dragover #drop_zone': 'handleDragOver',
			'dragleave #drop_zone': 'handleDragLeave',
			'drop #drop_zone': 'handleDragFileSelect',
			'change #filesInput': 'handleFileSelect',
			'click .file-del': 'deleteFileHandler',
			'click .file-preview': 'previewFile',
			'click .preview-close': 'previewClose'
		});
	},

	formatFileNameForModal: function(name){
		var type = name.substr(name.indexOf('.') + 1);
		name = name.substr(0,27) + '...[' + type + ']';

		return name;
	},

	deleteFileHandler: function(e){
		var button = $(e.currentTarget);
		var cid = button.data('cid');	
		var fileToDelete = this.collection.get(cid);

		this.collection.deleteFile(fileToDelete);
	},

	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {
			//Skip file if over maximum file size
			if(f.size > 100000000) {
				var name = f.name;
				if(name.length > 30){
					name = this.formatFileNameForModal(name);
				}
				houston.createModal({type: 'File Error', message: 'The file "' + name + '" is over the 100MB limit.'});	
			    
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
								console.log(model);
								var name = model.attributes.name;
								if(name.length > 30){
									name = this.formatFileNameForModal(name);
								}
								houston.createModal({type: 'File Error', message: 'The file upload "' + name + '" was not successful.'});
								app.files.deleteFile(model);
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

	previewFile: function(evt){ 
		var button = $(evt.currentTarget);
		var cid = button.data('cid');	
		var fileToPreview = this.collection.get(cid);

		fileToPreview.set({preview: true});

		app.preview = new PreviewWindow({collection: app.files.filesPreviewCollection});
		
		app.preview.render();
		app.modalWindow.append(app.preview.$el);
	}
});