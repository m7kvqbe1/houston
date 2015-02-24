var FilesUpload = Backbone.Collection.extend({
	model: FileUploadModel,	
	url: '/tickets/file/add',

	initialize: function(models){
		this.imagesCollection = new Backbone.Collection(models);
		this.on("reset add change delete", function(){		
			this.imagesCollection.reset(this.createImagesCollection());
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
		console.log(imagesArray);
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

// allTickets: function(){
// 	filtered = this.filter(function(model){
// 		if(model.get('type')){
// 			// return model.get('type') !== 'Completed';
// 			return houston.isDisplayableImage(model.get('type'));
// 		}
// 	});
// 	return filtered;
// },