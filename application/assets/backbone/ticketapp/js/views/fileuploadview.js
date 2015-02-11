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
			var type = Handlebars.Utils.escapeExpression(obj.attributes.type);
			var name = Handlebars.Utils.escapeExpression(obj.attributes.name);
			var target = Handlebars.Utils.escapeExpression(obj.attributes.target);
      		var cid = Handlebars.Utils.escapeExpression(obj.cid);
		
			if(type){
				if(type.indexOf('image')!== -1){
					return new Handlebars.SafeString(
						'<img class="file-thumb" src="'+ target +'" title="'+ name +'"/>'+
						'<div class="file-text">'+
			  				'<div class="file-icon jpg"></div>'+
			  				'<div class="file-info">'+
								'<div class="filename">'+ name +'</div>'+
								'<a data-img="'+ target +'" data-type="'+ type +'" data-name="'+ name +'" class="file-preview">Preview</a>'+
								'<a data-cid="'+ cid +'" class="file-del">Delete</a>'+
							'</div>'+
						'</div>'
					);
				} else {
					return new Handlebars.SafeString(
						'<div class="file-text">'+
			  				'<div class="file-icon jpg"></div>'+
			  				'<div class="file-info">'+
								'<div class="filename">'+ name +'</div>'+
								'<a data-cid="'+ cid +'" class="file-del">Delete</a>'+
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

	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {
	        var reader = new FileReader();
			reader.onerror = this.fileErrorHandler;

	        reader.onloadend = _.bind((function(theFile) {
		        return function(e) {	        	
			        theFile["target"] = e.target.result;
					delete theFile["webkitRelativePath"];
					var fileMdl = new FileUploadModel();
					this.collection.add(fileMdl);
					fileMdl.save(theFile);

		        };
	        })(f), this);

	        reader.readAsDataURL(f);
	  	}
	},

	deleteFile: function(e){
		var button = $(e.currentTarget);
		var cid = button.data("cid");	
		var fileToDelete = this.collection.get(cid);
		this.collection.remove(fileToDelete);
	},

	fileErrorHandler: function(evt){
		console.log(evt);
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
			case evt.target.error.ABORT_ERR:
				break; 
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
	    evt.dataTransfer.dropEffect = 'copy';     
	},

	handleDragLeave: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	}

});

// addFiles: function(files){
// 	for (var i = 0, f; f = files[i]; i++) {
// 		var fileMdl = new FileUploadModel(); 
//         var reader = new FileReader();
// 		reader.onerror = this.fileErrorHandler;
// 		this.collection.add(fileMdl);

// 		reader.onloadstart = _.bind((function(theFile) {
// 	        return function(e) {	        	
// 		        this.collection.add(fileMdl);
// 		        console.log('filestart');
// 	        };
//         })(f), this);


//         reader.onloadend = _.bind((function(theFile) {
// 	        return function(e) {	        	
// 		        theFile["target"] = e.target.result;
// 				delete theFile["webkitRelativePath"];
// 				// var fileMdl = new FileUploadModel();
// 				// this.collection.add(fileMdl);
// 				console.log('fileend');
// 				fileMdl.save(theFile,{
// 					success: function(){
// 						console.log('success');
// 					}
// 				});

// 	        };
//         })(f), this);

//         reader.readAsDataURL(f);
//   	}
// },