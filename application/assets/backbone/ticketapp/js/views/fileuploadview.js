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
					//If still uploading show loading and cancel button
					'{{#if attributes.status}}'+
					'<div class="loader"></div>'+					
					'{{/if}}'+
					//If a displayable image add thumb
					'<div class="thumb-wrap">'+
						'{{showFileThumb attributes.type attributes.target attributes.name}}'+
					'</div>'+
					'<div class="file-text">'+
		  				'<div class="file-icon jpg">'+
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
							//If a displayable image add preview button
							'{{showFilePreviewLink attributes.type attributes.target cid}}'+				
							'<a data-cid="{{cid}}" class="file-del">Delete</a>'+
						'</div>'+
					'</div>'+					
				'</li>'+
			'{{/each}}'+
			'</ul>' +	
		'</div>'

	),

	initialize : function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);

		Handlebars.registerHelper("showFileThumb", function(type, target, name){ 
			if(!target) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<img class="file-thumb" src="'+target+'" alt="'+name+'"/>');
			}
		});

		Handlebars.registerHelper("showFilePreviewLink", function(type, target, cid){ 
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
			'click .preview-close': 'previewClose',
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
		// app.previewWindow.model.attributes = app.filesUploadCollection.get($(e.currentTarget).data("cid")).attributes;
		this.$el.closest('.app-wrap').find('#preview-window').append(app.previewWindow.$el);//change
		// app.previewWindow.render();
		this.$el.closest('.app-wrap').find('#preview-window').show();
	}

});

var PreviewWindow = Backbone.View.extend({
	template: Handlebars.compile(
		'<i class="preview-close icon-cancel-circled"></i>'+
		'{{#each models}}'+
		'<div>{{attributes.name}}</div>'+
		'{{/each}}'
		// '<img src="{{attributes.target}}" />'
	),

	initialize: function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .preview-close': 'previewClose'
		});
	},

	previewClose: function(){
		this.$el.closest('.app-wrap').find('#preview-window').hide();
	}
});


















	        // reader.onloadend = (function(theFile, fileMdl){
	        // 	console.log(fileMdl.reader.readyState);
	        // 	console.log(fileMdl.reader);
	        // 	console.log(theFile);
	        // })(f);

	        //On load end save file to server
	    	//   reader.onloadend = (function(theFile) {
		   //      return function(e) {
		   //      	console.log(reader.result);
					// var attributes = {
					// 	status: 'loading',
					// 	target: e.target.result,
					// 	name: theFile.name,
					// 	type: theFile.type,
					// 	lastModifiedDate: theFile.lastModifiedDate
					// }

					// fileMdl.save(attributes,{
					// 	success: function(model){
					// 		console.log('save');
					// 		model.set({status: false});
					// 		model.reader = false;
					// 	}
					// });

		   //      };
	    //     })(f);

	// addFiles: function(files){
	// 	for (var i = 0, f; f = files[i]; i++) {

	// 		var reader = new FileReader();
	//         var fileMdl = new FileUploadModel();
	//         //Create file reader as property of model
	//         fileMdl.reader = reader;

	//         //On load start add the model to the collection
	//         reader.onloadstart = _.bind((function() {
	//         	console.log('start');
	// 	        return function() {	 	    
	// 				this.collection.add(fileMdl);
	// 	        };
	//         })(f), this);

	//         //On load end save file to server
	//         reader.onloadend = _.bind((function(theFile) {
	//         	console.log('end');
	// 	        return function(e) {	   	
	// 				var attributes = {
	// 					status: 'loading',
	// 					target: e.target.result,
	// 					name: theFile.name,
	// 					type: theFile.type,
	// 					lastModifiedDate: theFile.lastModifiedDate
	// 				}

	// 				fileMdl.save(attributes,{
	// 					success: function(model){
	// 						console.log('save');
	// 						model.set({status: false});
	// 						model.reader = false;
	// 					}
	// 				});

	// 	        };
	//         })(f), this);

	//         reader.onabort = function(e) {
	// 	     	alert('File read cancelled');
	// 	    };

	//         reader.onerror = this.fileErrorHandler;

	//         reader.readAsDataURL(f);
	//   	}
	// },

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

