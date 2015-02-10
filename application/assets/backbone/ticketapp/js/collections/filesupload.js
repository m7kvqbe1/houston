var FilesUpload = Backbone.Collection.extend({
	model: FileUploadModel,	
	url: '/tickets/file/add',

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