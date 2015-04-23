var Files = Backbone.Collection.extend({
	model: FileUploadModel,	
	url: '/api/tickets/file/add',

	initialize: function(){
		this.filesPreviewCollection = new Backbone.Collection();

		this.on("reset add change delete", function(){		
			this.filesPreviewCollection.reset(this.createImagesCollection());
		});
	},

	createImagesCollectionFromArray: function(models){
		var imagesArray = [];
		models.filter(function(model){
			if(model.type){
				if(houston.isDisplayableImage(model.type)){
					imagesArray.push(model);
				}	
			}		
		});
		this.filesPreviewCollection.reset(imagesArray);
	},

	createImagesCollection: function(){
		var imagesArray = [];
		this.filter(function(model){
			if(model.get('type')){
				if(houston.isDisplayableImage(model.get('type'))){
					imagesArray.push(model);
				}	
			}		
		});
		return imagesArray;
	},

	createFilesArray: function(){
		var filesArray = [];
		this.each(function(model){
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

	deleteFile: function(fileToDelete){
		if(fileToDelete.isNew()){
			fileToDelete.attributes.request.abort();
			fileToDelete.destroy();
		} else {
			fileToDelete.url = '/api/tickets/file/'+fileToDelete.id;
			fileToDelete.destroy();
		}
	},

	emptyCollection: function(){
		this.each(function(model){
			app.files.deleteFile(model);
		});
	}
});