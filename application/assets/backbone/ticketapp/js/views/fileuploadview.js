var FileUploadView = Backbone.View.extend({

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
					'{{generateFileUploadPreview this}}'+
				'</li>'+
			'{{/each}}'+
			'</ul>' +	
		'</div>'+
		'<div class="preview-window">'+
		'</div>' 
	),

	initialize : function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);

		Handlebars.registerHelper("generateFileUploadPreview", function(obj){ 
			var typeEsc = Handlebars.Utils.escapeExpression(obj.attributes.type);
			var nameEsc = Handlebars.Utils.escapeExpression(obj.attributes.name);
			var targetEsc = Handlebars.Utils.escapeExpression(obj.attributes.target);
      		var cidEsc = Handlebars.Utils.escapeExpression(obj.cid);
		
			if(typeEsc){
				if(typeEsc.indexOf('image')!== -1){
					return new Handlebars.SafeString(
						'<img class="file-thumb" src="'+ targetEsc +'" title="'+ nameEsc +'"/>'+
						'<div class="file-text">'+
			  				'<div class="file-icon jpg"></div>'+
			  				'<div class="file-info">'+
								'<div class="filename">'+ nameEsc +'</div>'+
								'<a data-img="'+ targetEsc +'" data-type="'+ typeEsc +'" data-name="'+ nameEsc +'" class="file-preview">Preview</a>'+
								'<a data-cid="'+ cidEsc +'" class="file-del">Delete</a>'+
							'</div>'+
						'</div>'
					);
				} else {
					return new Handlebars.SafeString(
						'<div class="file-text">'+
			  				'<div class="file-icon jpg"></div>'+
			  				'<div class="file-info">'+
								'<div class="filename">'+ nameEsc +'</div>'+
								'<a data-cid="'+ cidEsc +'" class="file-del">Delete</a>'+
							'</div>'+
						'</div>'
					);
				}
			}
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
			'click .file-preview': 'previewFile',
			'click .file-del': 'deleteFile',
			'click .preview-close': 'previewClose'
		});
	},

	fileDialogTrigger: function(){
		this.$el.find('#filesInput').trigger('click');
	},

	previewFile: function(e){
		console.log(this.collection);
		//should be done with a collectoin.get on the cid
		var button = $(e.currentTarget);
		var img = button.data("img");
		var prevWindow = this.$el.find('.preview-window');
		prevWindow.html("<i class='preview-close icon-cancel-circled'></i>"+
			"<img src='" + img + "' />"
		);	
		prevWindow.show();
	},

	previewClose: function(){
		this.$el.find('.preview-window').hide();
	},

	createFilesArray: function(){
		var filesArray = [];
		this.collection.each(function(model){
			var fileData = {
				ref: model.attributes.id,
				name: model.attributes.name,
				type: model.attributes.type,
				date: model.attributes.lastModifiedDate
			}
			filesArray.push(fileData);
		});
		return filesArray;
	},


	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {

	        var reader = new FileReader();
			reader.onerror = this.fileErrorHandler;
			//is there need for ability to abort whilst file is being uploaded?
	        reader.onabort = function(e) {
	        	console.log(e);
		        alert('File read cancelled');
		    };

	        // Closure to capture the file information.
	        reader.onloadend = _.bind((function(theFile) {
		        return function(e) {
		        	
			        theFile["target"] = e.target.result;

					delete theFile["webkitRelativePath"];
					var fileMdl = new FileUploadModel();
					fileMdl.url = '/tickets/file/add';
					//need to add the file to the collection for it to appear in the view
					this.collection.add(fileMdl);
					fileMdl.save(theFile);

		        };
	        })(f), this);

	        // Read in the image file as a data URL.
	        reader.readAsDataURL(f);
	  	}
	},

	deleteFile: function(e){

		var button = $(e.currentTarget);
		var cid = button.data("cid");	
		var fileToDelete = this.collection.get(cid);
		//stackoverflow.com/questions/6280553/destroying-a-backbone-model-in-a-collection-in-one-step
		this.collection.remove(fileToDelete);
		// // fileToDelete.destroy(); DO I NEED TO DO THIS? check with tom if it works

	},


	fileErrorHandler: function(evt){
		//Add in error to view
		console.log(evt);
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
			case evt.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('An error occurred reading this file.');
		};
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

	abortFileUpload: function(){
		reader.abort();
	},


	handleDragOver: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).addClass('drop-highlight');
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

	    //stackoverflow.com/questions/11989289/css-html5-hover-state-remains-after-drag-and-drop
		//stackoverflow.com/questions/14788862/drag-drop-doenst-not-work-dropeffect-of-undefined
	    
	},

	handleDragLeave: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	}

});