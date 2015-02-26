var FilesUpload = Backbone.Collection.extend({
	model: FileUploadModel,	
	url: '/tickets/file/add',

	initialize: function(){
		this.on("reset add change delete", function(){		
			app.filesPreviewCollection.reset(this.createImagesCollection());
		});
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
	}
});


var FilesPreview = Backbone.Collection.extend({
	model: FileUploadModel,	

	createImagesCollection: function(models){
		var imagesArray = [];
		models.filter(function(model){
			if(model.type){
				if(houston.isDisplayableImage(model.type)){
					imagesArray.push(model);
				}	
			}		
		});
		this.reset(imagesArray);
	}
});