var FilesUpload = Backbone.Collection.extend({
	model: FileUploadModel,	
	url: '/tickets/file/add'
});