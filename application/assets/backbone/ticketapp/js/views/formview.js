var FormView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-top">' +
			'<h2>Create Ticket</h2>' +
			'<a class="btn">New Ticket</a>' +
		'</div>' +
		'<div class="box-app">' +
			'<form id="form-new">' +
				'<input type="text" class="new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
				'<textarea name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +
				'<div id="file-view-wrap">'+		
					// '<div class="attach-files">' +
					// 	'<a class="attach-link">Attach files to this ticket</a>' + 
					// 	'<div class="supported">Supported -</div>' + 
					// 	'<ul class="filetypes">' +
					// 		'<li>Jpg</li>' +
					// 		'<li>Png</li>' +
					// 		'<li>Gif</li>' +
					// 		'<li>Pdf</li>' +
					// 	'</ul>' +
					// 	'<div class="file-input-wrapper">'+
					// 		'<div id="drop_zone">Drop files here</div>'+
					// 		'<input type="file" id="filesInput" name="files[]" multiple />'+
					// 	'</div>'+
					// 	'<ul id="files" class="files">'+
					// 	//PREVIOUSLY WAS forEach files
					// 		'{{#each files}}'+
					// 		// '<li class="file">'+
					// 		// 	'<img class="file-thumb" src="{{attributes.target}}" title="{{name}}"/>'+
			  //   //     			'<div class="file-text">'+
			  //   //       				'<div class="file-icon jpg"></div>'+
			  //   //       				// '<div class="file-icon {{filetype}}"></div>'+
			  //   //       				'<div class="file-info">'+
			  //   //       					// '<div class="filename">{{name}}</div>'+
					// 		// 			'<div class="filename">{{attributes.name}}</div>'+
					// 		// 			'<a class="file-view">View</a>'+
					// 		// 			'<a data-cid="{{cid}}" class="file-del">Delete</a>'+
					// 		// 		'</div>'+
					// 		// 	'</div>'+
					// 		// '</li>'+
					// 		'{{/each}}'+

					// 		// '<li class="file">' +
					// 		// 	'<img class="file-thumb" src="/application/assets/img/reckitt.jpg"/>'+
					// 		// 	'<div class="file-icon jpg"></div>' +
					// 		// 	'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
					// 		// 	'<a href="">View</a>' +
					// 		// 	'<a href="">Delete</a>' +
					// 		// '</li>' +
					// 	// 	'<li class="file">' +
					// 	// 		'<div class="file-icon jpg"></div>' +
					// 	// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
					// 	// 		'<a href="">View</a>' +
					// 	// 		'<a href="">Delete</a>' +
					// 	// 	'</li>' +
					// 	// 	'<li class="file">' +
					// 	// 		'<div class="file-icon jpg"></div>' +
					// 	// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
					// 	// 		'<a href="">View</a>' +
					// 	// 		'<a href="">Delete</a>' +
					// 	// 	'</li>' +
					// 	// 	'<li class="file">' +
					// 	// 		'<div class="file-icon jpg"></div>' +
					// 	// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
					// 	// 		'<a href="">View</a>' +
					// 	// 		'<a href="">Delete</a>' +
					// 	// 	'</li>' +							
					// 	'</ul>' +	
					// '</div>' +
				'</div>'+
				'<button class="save" type="button">Create Ticket</button>' +
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib">Cancel</a>' +
			'</form>' +
		'</div>' 
	),

	initialize: function() {
		this.listenTo(this.model, "reset add remove change sort", this.render);	
		// this.listenTo(this.model.files, "reset add remove change sort", this.render);	
		
		//stackoverflow.com/questions/7472055/backbone-js-how-to-get-the-index-of-a-model-in-a-backbone-collection
		// use when creating collection forEach helper
	},

	render: function(){
		jQuery.event.props.push("dataTransfer");
		this.$el.html(this.template(this.model));	

		var filesCollection = new Files();
		this.fileView = new FileView({ collection: filesCollection});
		// fileModel.fetch();
		this.$('#file-view-wrap').html(this.fileView.$el);
		this.fileView.render();

		this.delegateEvents({
			'click .save': 'save',
			'input .new-sub': 'subjectCharCount',
			'click .cancel-btn': 'cancelTicket'
		});

		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}
		return this;
	},
	
	subjectCharCount: function(){
		return houston.subjectCharCount(this.$el);
	},
	
	save: function(){
		this.setModelData();
		
		console.log(this.model);
		
		this.model.save(this.model.attributes,
			{
				success: function(model, response, options){					
					//add model to collection, no longer required.
					// app.tickets.add(model);
					//ensure formView always uses a fresh model
					app.formView.model = new TicketModel();
					//app.navigate('contacts/' + model.get('url'), {trigger: true});
					app.navigate('', {trigger: true});
				}
			}
		);
	
	},

	setModelData: function(){
		this.model.set({
			subject: this.$el.find('input[name="new-sub"]').val(),
			message: this.$el.find('textarea[name="new-textarea"]').val(),
			id: null,
			avatar: app.user.attributes.avatar,
			username: app.user.attributes.emailAddress,
			name: app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
			company: app.user.attributes.company,
			date: new Date(),
			updated: this.model.get('updated').concat(app.user.attributes.id)
		});		
	},

	cancelTicket: function(){
		this.model.clear();
		app.navigate('', {trigger: true});
	}

});

var FileView = Backbone.View.extend({

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
					'<img class="file-thumb" src="{{attributes.target}}" title="{{name}}"/>'+
					'<div class="file-text">'+
		  				'<div class="file-icon jpg"></div>'+
		  				// '<div class="file-icon {{filetype}}"></div>'+
		  				'<div class="file-info">'+
		  					// '<div class="filename">{{name}}</div>'+
							'<div class="filename">{{attributes.name}}</div>'+
							'<a data-img="{{attributes.target}}" class="file-preview">Preview</a>'+
							'<a data-cid="{{cid}}" class="file-del">Delete</a>'+
						'</div>'+
					'</div>'+
				'</li>'+
			'{{/each}}'+
			'</ul>' +	
		'</div>'+
		'<div class="preview-window">'+
		'</div>' 
	),

	initialize : function(){
		// this.listenTo(this.collection, 'add change remove sync', this.render);
		this.listenTo(this.collection, 'sync', this.render);

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

	render : function(){
		this.$el.html(this.template(this.collection));
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
	},

	previewClose: function(){
		this.$el.find('.preview-window').remove();
	},


	// var fr = new FileReader();
 //        fr.onloadend = function () {
 //            var result = this.result;
 //            var hex = "";
 //            for (var i = 0; i < this.result.length; i++) {
 //                var byteStr = result.charCodeAt(i).toString(16);
 //                if (byteStr.length < 2) {
 //                    byteStr = "0" + byteStr;
 //                }
 //                hex += " " + byteStr;
 //            }
            
 //            // Add file to application object
 //            application['data'][name] = {
 //                id: fileList[0]['name'],
 //                type: 'FILEUPLOAD',
 //                value: hex
 //            }
 //        };
 //        fr.readAsBinaryString(this.files[0]);



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
	        reader.onload = _.bind((function(theFile) {
		        return function(e) {
		        	
			        // theFile["target"] = e.target.result;		        
					// this.collection.add(theFile);

					var result = e.target.result;
					var hex = "";
		            for (var i = 0; i < result.length; i++) {
		                var byteStr = result.charCodeAt(i).toString(16);
		                if (byteStr.length < 2) {
		                    byteStr = "0" + byteStr;
		                }
		                hex += " " + byteStr;
		            }

		            theFile["target"] = hex;
					delete theFile["webkitRelativePath"];
					var fileMdl = new FileModel();
					fileMdl.url = '/tickets/file/add';
					fileMdl.save(theFile,{
						success: function(model, response){
							console.log(model);
							console.log(response);
						},
						error: function(){
							console.log('error');
						}
					});

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
		// fileToDelete.destroy();
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

	    //remove drag highlight state
	    $(evt.currentTarget).removeClass('dropping');

	    this.addFiles(evt.dataTransfer.files);

	},

	abortFileUpload: function(){
		reader.abort();
	},


	handleDragOver: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    // this.$el wouldnt work for some reason
	    //add drag highlight state
	    $(evt.currentTarget).addClass('dropping');
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

	    //stackoverflow.com/questions/11989289/css-html5-hover-state-remains-after-drag-and-drop
		//stackoverflow.com/questions/14788862/drag-drop-doenst-not-work-dropeffect-of-undefined
	    
	},

	handleDragLeave: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    // remove drag highlight state
	    $(evt.currentTarget).removeClass('dropping');
	}

});





	// fileDialogTrigger: function(){
	// 	this.$el.find('#filesInput').trigger('click');
	// },

	// addFiles: function(files){

	// 	for (var i = 0, f; f = files[i]; i++) {

	//         var reader = new FileReader();
	// 		reader.onerror = this.fileErrorHandler;
	// 		//is there need for ability to abort whilst file is being uploaded?
	//         reader.onabort = function(e) {
	//         	console.log(e);
	// 	        alert('File read cancelled');
	// 	    };

	//         // Closure to capture the file information.
	//         reader.onload = _.bind((function(theFile) {
	// 	        return function(e) {
	// 		        theFile["target"] = e.target.result;	
	// 		        console.log(theFile);		        
	// 				this.model.files.add(theFile);
	// 				console.log(this.model);
	// 				//this.model.set({
	// 				// 	files: this.model.get('files').concat(theFile)			
	// 				// });
	// 	        };
	//         })(f), this);

	//         // Read in the image file as a data URL.
	//         reader.readAsDataURL(f);
	//         console.log(this.model);
	//   	}
	// },

	// deleteFile: function(e){

	// 	var button = $(e.currentTarget);
	// 	var cid = button.data("cid");
	// 	var fileToDelete = this.model.attributes.files.get(cid);
	// 	//stackoverflow.com/questions/6280553/destroying-a-backbone-model-in-a-collection-in-one-step
	// 	this.model.attributes.files.remove(fileToDelete);
	// 	fileToDelete.destroy();

	// 	//stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
	// 	//stackoverflow.com/questions/13682199/backbonejs-delete-item-from-a-model-array
	// 	// var index = button.data("index");
	// 	// this.model.get('files').splice(index,1);
	// 	// this.render();
	// },


	// fileErrorHandler: function(evt){
	// 	//Add in error to view
	// 	console.log(evt);
	// 	switch(evt.target.error.code) {
	// 		case evt.target.error.NOT_FOUND_ERR:
	// 			alert('File Not Found!');
	// 			break;
	// 		case evt.target.error.NOT_READABLE_ERR:
	// 			alert('File is not readable');
	// 			break;
	// 		case evt.target.error.ABORT_ERR:
	// 			break; // noop
	// 		default:
	// 			alert('An error occurred reading this file.');
	// 	};
	// },

	// handleFileSelect: function(evt) {

	// 	this.addFiles(evt.target.files);
	// },

	// handleDragFileSelect: function(evt){
	// 	evt.stopPropagation();
	//     evt.preventDefault();

	//     //remove drag highlight state
	//     $(evt.currentTarget).removeClass('dropping');

	//     this.addFiles(evt.dataTransfer.files);

	// },

	// abortFileUpload: function(){
	// 	reader.abort();
	// },


	// handleDragOver: function(evt){
	// 	evt.stopPropagation();
	//     evt.preventDefault();
	//     // this.$el wouldnt work for some reason
	//     //add drag highlight state
	//     $(evt.currentTarget).addClass('dropping');
	//     evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

	//     //stackoverflow.com/questions/11989289/css-html5-hover-state-remains-after-drag-and-drop
	// 	//stackoverflow.com/questions/14788862/drag-drop-doenst-not-work-dropeffect-of-undefined
	    
	// },

	// handleDragLeave: function(evt){
	// 	evt.stopPropagation();
	//     evt.preventDefault();
	//     // remove drag highlight state
	//     $(evt.currentTarget).removeClass('dropping');
	// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 	outputFileDetails: function(){

// 		var files = this.filesArray;
// 		this.$el.find('#files').html('');
// // document.getElementById('files').innerHTML = null;
// 		//  Loop through the FileList and render file details.
// 		for (var i = 0, f; f = files[i]; i++) {

// 	        // Only create FileReader for image files.
// 	        if (!f.type.match('image.*')) {
// 	        	//render file details
// 		        var li = document.createElement('li');
// 		        li.className = "file";
// 		        li.innerHTML = ['<div class="file-icon jpg"></div>' +
// 							'<div class="filename">'+escape(f.name)+'</div>' +
// 							'<a class="file-view">View</a>' +
// 							'<a class="file-del">Delete</a>'].join('');
// 		        document.getElementById('files').insertBefore(li, null);
// 	        } else {

// 	        var reader = new FileReader();
// 			reader.onerror = this.fileErrorHandler;
// 	        reader.onabort = function(e) {
// 	        	console.log(e);
// 		        alert('File read cancelled');
// 		    };



// 	        // Closure to capture the file information.
// 	        reader.onload = (function(theFile) {
// 		        return function(e) {
// 			        // Render file details and thumbnail.
// 			        var li = document.createElement('li');
// 			        li.className = "file";
// 			        li.innerHTML = ['<img class="file-thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'+
// 			        			'<div class="file-text">'+
// 			          			'<div class="file-icon jpg"></div>'+
// 			          			'<div class="file-info">'+
// 								'<div class="filename">'+escape(theFile.name)+'</div>'+
// 								'<a class="file-view">View</a>'+
// 								'<a class="file-del">Delete</a>'+
// 								'</div>'+
// 								'</div>'].join('');
// 			        document.getElementById('files').insertBefore(li, null);
// 		        };
// 	        })(f);

// 	        // Read in the image file as a data URL.
// 	        reader.readAsDataURL(f);
// 	  		}
// 	    }
// 	},


	// handleFileSelect: function(evt) {

	// 	var files = evt.target.files;
	// 	console.log(files);

	// 	for (var i = 0, f; f = files[i]; i++) {

	//         // Only create FileReader for image files.
	//         if (!f.type.match('image.*')) {

	//         	var file =
	// 				{
	// 					src: '/application/assets/img/jpg-icon.png',
	// 					filename: escape(f.name),			
	// 					filetype: escape(f.type),
	// 					id: null
	// 				};

	//         } else {

	//         var reader = new FileReader();
	// 		reader.onerror = this.fileErrorHandler;
	// 		//is there need for an abort whilst file is being uploaded?
	//         reader.onabort = function(e) {
	//         	console.log(e);
	// 	        alert('File read cancelled');
	// 	    };

	//         // Closure to capture the file information.
	//         reader.onload = (function(theFile) {
	// 	        return function(e) {

	// 	        	var file =
	// 					{
	// 						src: e.target.result,
	// 						filename: escape(theFile.name),			
	// 						filetype: escape(theFile.type),
	// 						id: null
	// 					};

	// 	        };
	//         })(f);

	//         // Read in the image file as a data URL.
	//         reader.readAsDataURL(f);
	//   		}


	// 		// var file =
	// 		// 	{
	// 		// 		src: '/application/assets/img/jpg-icon.png',
	// 		// 		filename: 'test-filename.jpg',			
	// 		// 		filetype: 'jpg',
	// 		// 		id: null
	// 		// 	};

	// 		this.model.set({
	// 			files: this.model.get('files').concat(file)			
	// 		});
	// 		console.log(this.model);
	// 	}


	// handleFileSelect: function(evt) {

	// 	var files = evt.target.files;
	// 	console.log(files);
	// 	// console.log(this.filesArray);
	// 	for (var i = 0, f; f = files[i]; i++) {
	// 		this.filesArray[this.filesArray.length] = f;
	// 		console.log(i);
	// 		this.filesArray.length += 1;
	// 	}

	// 	console.log('end');
	// 	console.log(this.filesArray);
	//     this.outputFileDetails();
	// },



			// console.log(this.filesArray.length);
		// if(this.filesArray.length === 0) {
		// 	//if filesArray is empty add files to it
		// 	this.filesArray = evt.target.files; // FileList object
		// } else {
		// 	// this.filesArray[this.filesArray.length] = 'test';
		// 	var files = evt.target.files;
		// 	console.log(files);
		// 	console.log(this.filesArray);
		// 	for (var i = 0, f; f = files[i]; i++) {
		// 		this.filesArray[this.filesArray.length] = 'test';
		// 		console.log(i);
		// 	}
		// }

	//adding in progress bars
	     //    // Closure to capture the file information.
	     //    reader.onloadstart = (function(theFile) {
		    //     return function(e) {
		    //     	console.log(e);
			   //      // Render file details and thumbnail.
			   //      var li = document.createElement('li');
			   //      li.setAttribute("id", escape(theFile.name))
			   //      li.className = "file";
			   //      // li.className += e.timeStamp;
			   //      li.innerHTML = ['<img id="img-', escape(theFile.name), '" class="file-thumb" src="application/assets/img/jpg-icon.png" title="', escape(theFile.name), '"/>'+
			   //      			'<div class="file-text">'+
			   //        			'<div class="file-icon jpg"></div>'+
			   //        			'<div class="file-info">'+
						// 		'<div class="filename">'+escape(theFile.name)+'</div>'+
						// 		'<a href="">View</a>'+
						// 		'<a href="">Delete</a>'+
						// 		'</div>'+
						// 		'</div>'].join('');
			   //      document.getElementById('files').insertBefore(li, null);
		    //     };
	     //    })(f);

	     //    reader.onprogress = (function(theFile) {
		    //     return function(e) {
		    //     	var li = document.querySelectorAll("li#"+escape(theFile.name)+" div.file-text");
		    //     	console.log(li);
		    //     	li.className = 'progress';
		    //     	// var li = document.getElementById(escape(theFile.name));
		    //     	// var idString = '#';
		    //     	// var idString = escape(theFile.name);
		    //     	// console.log(idString);
		    //     	// var li = $("#" +idString);
		    //     	// console.log(li);
		    //     	// li.find('file-text').addClass('progress');
		    //     };
		    // })(f);

	     //    reader.onload = (function(theFile) {
		    //     return function(e) {
		    //     	var img = document.getElementById('img-'+escape(theFile.name));
		    //     	console.log(img);
		    //     	// var files = document.getElementById('files');
		    //     	img.setAttribute("src", e.target.result);
		    //     };
		    // })(f);


	// old handlers
	// setupDragListeners: function(e){
	// 	var dropZone = document.getElementById('drop_zone');
	// 	console.log(dropZone);
	// 	dropZone.addEventListener('dragover', this.handleDragOver, false);
	// 	dropZone.addEventListener('dragleave', this.handleDragLeave, false);
	// 	dropZone.addEventListener('drop', this.handleDragFileSelect, false);
	// },










	//     var files = evt.target.files; // FileList object

	//     // files is a FileList of File objects. List some properties.
	//     var output = [];
	//     for (var i = 0, f; f = files[i]; i++) {


	// 	output.push('<li class="file">' +
	// 					// '<div class="file-icon '+f.type+'"></div>' +
						// '<div class="file-icon jpg"></div>' +
						// '<div class="filename">'+escape(f.name)+'</div>' +
						// '<a href="">View</a>' +
						// '<a href="">Delete</a>' +
	// 				'</li>');
	//     }
	//     var currentHTML = this.$el.find('.files').html();
	//     console.log(currentHTML);
	//     this.$el.find('.files').html(currentHTML + output.join(''));

	//     // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';    				
	// }


// var FormView = Backbone.View.extend({
// 	template: Handlebars.compile(
// 		'<div class="box-app-top">' +
// 			'<h2>Create Ticket</h2>' +
// 			'<a class="btn">New Ticket</a>' +
// 		'</div>' +
// 		'<div class="box-app">' +
// 			'<form id="form-new">' +
// 				'<input type="text" class="new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
// 				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
// 				'<textarea name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +		
// 				'<div class="attach-files">' +
// 					'<input type="file" id="files" name="files[]" multiple />'+
// 					'<output id="list"></output>'+
// 					// '<a class="attach-link" href="">Attach files to this ticket</a>' + 
// 					// '<div class="supported">Supported -</div>' + 
// 					// '<ul class="filetypes">' +
// 					// 	'<li>Jpg</li>' +
// 					// 	'<li>Png</li>' +
// 					// 	'<li>Gif</li>' +
// 					// 	'<li>Pdf</li>' +
// 					// '</ul>' +
// 					// '<ul class="files">' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +							
// 					// '</ul>' +
// 				'</div>' +
// 				'<button class="save" type="button">Create Ticket</button>' +
// 				'<div class="beige or">or</div>' +
// 				'<a class="cancel-btn ib" href="">Cancel</a>' +
// 			'</form>' +
// 		'</div>' 
// 	),
// 	render: function(){
// 		this.$el.html(this.template());
// 		this.delegateEvents({
// 			'click .save': 'save',
// 			'input .new-sub': 'subjectCharCount',
// 			'change #files': 'handleFileSelect'
// 		});

// 		// Check for the various File API support.
// 		if (window.File && window.FileReader && window.FileList && window.Blob) {
// 		  // Great success! All the File APIs are supported.
// 		} else {
// 		  alert('The File APIs are not fully supported in this browser.');
// 		}
// 		return this;
// 	},
	
// 	subjectCharCount: function(){
// 		return houston.subjectCharCount(this.$el);
// 	},
	
// 	save: function(){
// 		this.setModelData();
// 		this.model.save(this.model.attributes,
// 			{
// 				success: function(model, response, options){					
// 					//add model to collection, no longer required.
// 					// app.tickets.add(model);
					
// 					//ensure formView always uses a fresh model
// 					app.formView.model = new TicketModel();
// 					//app.navigate('contacts/' + model.get('url'), {trigger: true});
// 					app.navigate('', {trigger: true});
// 				}
// 			}
// 		);
	
// 	},

// 	setModelData: function(){
// 		this.model.set({
// 			subject: this.$el.find('input[name="new-sub"]').val(),
// 			message: this.$el.find('textarea[name="new-textarea"]').val(),
// 			id: null,
// 			avatar: app.user.attributes.avatar,
// 			username: app.user.attributes.emailAddress,
// 			name: app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
// 			company: app.user.attributes.company,
// 			date: new Date(),
// 			updated: this.model.get('updated').concat(app.user.attributes.id)
// 		});
// 	},

// 	handleFileSelect: function(evt) {
// 		console.log('handling');
// 	    var files = evt.target.files; // FileList object

// 	    // files is a FileList of File objects. List some properties.
// 	    var output = [];
// 	    for (var i = 0, f; f = files[i]; i++) {
// 	      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
// 	                  f.size, ' bytes, last modified: ',
// 	                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
// 	                  '</li>');
// 	    }
// 	    console.log(output);
// 	    this.$el.find('#list').html('<ul>'+output.join('')+'</ul>');
// 	}
// });


//Sunday Morning
// var FormView = Backbone.View.extend({
// 	template: Handlebars.compile(
// 		'<div class="box-app-top">' +
// 			'<h2>Create Ticket</h2>' +
// 			'<a class="btn">New Ticket</a>' +
// 		'</div>' +
// 		'<div class="box-app">' +
// 			'<form id="form-new">' +
// 				'<input type="text" class="new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
// 				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
// 				'<textarea name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +		
// 				'<div class="attach-files">' +
// 				'<input type="file" id="files" name="file" multiple />'+
// 				'<button class="cancel-read">Cancel read</button>'+
// 				'<div id="progress_bar"><div class="percent">0%</div></div>'+
// 				'<output id="list"></output>'+
// 					// '<input type="file" id="files" name="files[]" multiple />'+
// 					// '<output id="list"></output>'+
// 					// '<a class="attach-link" href="">Attach files to this ticket</a>' + 
// 					// '<div class="supported">Supported -</div>' + 
// 					// '<ul class="filetypes">' +
// 					// 	'<li>Jpg</li>' +
// 					// 	'<li>Png</li>' +
// 					// 	'<li>Gif</li>' +
// 					// 	'<li>Pdf</li>' +
// 					// '</ul>' +
// 					// '<ul class="files">' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +
// 					// 	'<li class="file">' +
// 					// 		'<div class="file-icon jpg"></div>' +
// 					// 		'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
// 					// 		'<a href="">View</a>' +
// 					// 		'<a href="">Delete</a>' +
// 					// 	'</li>' +							
// 					// '</ul>' +
// 				'</div>' +
// 				'<button class="save" type="button">Create Ticket</button>' +
// 				'<div class="beige or">or</div>' +
// 				'<a class="cancel-btn ib" href="">Cancel</a>' +
// 			'</form>' +
// 		'</div>' 
// 	),
// 	render: function(){
// 		this.$el.html(this.template());
// 		this.delegateEvents({
// 			'click .save': 'save',
// 			'input .new-sub': 'subjectCharCount',
// 			'change #files': 'handleFileSelect',
// 			'click .cancel-read': 'abortRead'
// 		});

// 		// Check for the various File API support.
// 		if (window.File && window.FileReader && window.FileList && window.Blob) {
// 		  // Great success! All the File APIs are supported.
// 		} else {
// 		  alert('The File APIs are not fully supported in this browser.');
// 		}
// 		return this;
// 	},
	
// 	subjectCharCount: function(){
// 		return houston.subjectCharCount(this.$el);
// 	},
	
// 	save: function(){
// 		this.setModelData();
// 		this.model.save(this.model.attributes,
// 			{
// 				success: function(model, response, options){					
// 					//add model to collection, no longer required.
// 					// app.tickets.add(model);
					
// 					//ensure formView always uses a fresh model
// 					app.formView.model = new TicketModel();
// 					//app.navigate('contacts/' + model.get('url'), {trigger: true});
// 					app.navigate('', {trigger: true});
// 				}
// 			}
// 		);
	
// 	},

// 	setModelData: function(){
// 		this.model.set({
// 			subject: this.$el.find('input[name="new-sub"]').val(),
// 			message: this.$el.find('textarea[name="new-textarea"]').val(),
// 			id: null,
// 			avatar: app.user.attributes.avatar,
// 			username: app.user.attributes.emailAddress,
// 			name: app.user.attributes.firstName + ' ' + app.user.attributes.lastName,
// 			company: app.user.attributes.company,
// 			date: new Date(),
// 			updated: this.model.get('updated').concat(app.user.attributes.id)
// 		});
// 	},

// 	reader: null,

// 	// progress: document.querySelector('.percent'),
// 	// progress: null,
// 	// progress: function(){
// 	// 	return this.$el.find('.percent');
// 	// },

// 	abortRead: function() {
// 		if(this.reader){
// 			this.reader.abort();
// 		}
// 	},

// 	errorHandler: function(evt) {
// 		switch(evt.target.error.code) {
// 			case evt.target.error.NOT_FOUND_ERR:
// 				alert('File Not Found!');
// 				break;
// 			case evt.target.error.NOT_READABLE_ERR:
// 				alert('File is not readable');
// 				break;
// 			case evt.target.error.ABORT_ERR:
// 				break; // noop
// 			default:
// 				alert('An error occurred reading this file.');
// 		};
// 	},

// 	updateProgress: function(evt) {
// 		// evt is an ProgressEvent.
// 		console.log(evt)
// 		if (evt.lengthComputable) {
// 			var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
// 			// Increase the progress bar length.
// 			if (percentLoaded < 100) {
// 				// this.progress = document.querySelector('.percent');
// 				var progress = $('.percent')
// 				// progress.style.width = percentLoaded + '%';
// 				// progress.textContent = percentLoaded + '%';
// 				progress.width(percentLoaded + '%');
// 				progress.text(percentLoaded + '%');
// 			}
// 		}
// 	},

// 	handleFileSelect: function(evt) {
// 		// Reset progress indicator on new file selection.
// 		// this.progress = document.querySelector('.percent');
// 		var progress = this.$el.find('.percent');
// 		var progressBar = progress.closest('#progress_bar');
// 		// progress.style.width = '0%';
// 		// progress.textContent = '0%';
// 		progress.width('0%');
// 		progress.text('0%');

// 		this.reader = new FileReader();
// 		this.reader.onerror = this.errorHandler;
// 		this.reader.onprogress = this.updateProgress;
// 		this.reader.onabort = function(e) {
// 			alert('File read cancelled');
// 		};
// 		this.reader.onloadstart = function(e) {
// 			// document.getElementById('progress_bar').className = 'loading';
// 			// this.$el.find('#progress_bar').addClass('loading');
// 			progressBar.addClass('loading');
// 		};
// 		this.reader.onload = function(e) {
// 			// Ensure that the progress bar displays 100% at the end.
// 			// this.progress = document.querySelector('.percent');
// 			// var progress = this.$el.find('.percent')
// 			// progress.style.width = '100%';
// 			// progress.textContent = '100%';
// 			progress.width('100%');
// 			progress.text('100%');

// 			setTimeout("document.getElementById('progress_bar').className='';", 2000);
// 			// setTimeout("progressBar.removeClass();", 2000);
// 		}

// 	// Read in the image file as a binary string.
// 		this.reader.readAsBinaryString(evt.target.files[0]);

// 		var files = evt.target.files; // FileList object

// 	    // files is a FileList of File objects. List some properties.
// 	    var output = [];
// 	    for (var i = 0, f; f = files[i]; i++) {
// 	      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
// 	                  f.size, ' bytes, last modified: ',
// 	                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
// 	                  '</li>');
// 	    }
// 	    this.$el.find('#list').html('<ul>'+output.join('')+'</ul>');
// 	}
// });

//simples
	// handleFileSelect: function(evt) {
	//     var files = evt.target.files; // FileList object

	//     // files is a FileList of File objects. List some properties.
	//     var output = [];
	//     for (var i = 0, f; f = files[i]; i++) {


	// 	output.push('<li class="file">' +
	// 					// '<div class="file-icon '+f.type+'"></div>' +
	// 					'<div class="file-icon jpg"></div>' +
	// 					'<div class="filename">'+escape(f.name)+'</div>' +
	// 					'<a href="">View</a>' +
	// 					'<a href="">Delete</a>' +
	// 				'</li>');
	//     }
	//     var currentHTML = this.$el.find('.files').html();
	//     console.log(currentHTML);
	//     this.$el.find('.files').html(currentHTML + output.join(''));

	//     // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';    				
	// }