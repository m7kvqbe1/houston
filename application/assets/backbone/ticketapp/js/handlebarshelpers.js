var handlebarsHelpers = {
	bindHelpers: function(){
		Handlebars.registerHelper('ifCond', function(v1, v2, options){
			console.log(v1);
		if(v1 === v2) {
			return options.fn(this);
		}
			return options.inverse(this);
		});

		Handlebars.registerHelper('forEach',function(arr,options){
			return houston.forEach(arr, options);
		});		
		
		Handlebars.registerHelper('fullHeightPage', function(){
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});

		Handlebars.registerHelper('getUserName', function(authorID){
			return new Handlebars.SafeString(dataHelper.getUserName(authorID));
		});

		Handlebars.registerHelper('getUserRoleAsClass', function(authorID){
			return new Handlebars.SafeString(dataHelper.getUserRoleAsClass(authorID));
		});

		Handlebars.registerHelper('getCompanyName', function(authorID){
			return new Handlebars.SafeString(dataHelper.getCompanyName(authorID));
		});

		Handlebars.registerHelper('getUserAvatar', function(authorID){
			return new Handlebars.SafeString(dataHelper.getUserAvatar(authorID));
		});

		Handlebars.registerHelper('convertUserRole', function(attribute){
			return new Handlebars.SafeString(houston.convertUserRole(attribute));
		});		

		Handlebars.registerHelper('convertToClass', function(attribute){
			return houston.convertToClass(attribute);
		});

		Handlebars.registerHelper('convertToDate', function(attribute){
			return houston.convertToDate(attribute);
		});

		Handlebars.registerHelper('isPDF', function(type, data){
			return new Handlebars.SafeString('<object data="/api/tickets/file/inline/'+ data +'" type="application/pdf" width="100%" height="100%" frameborder="0"> alt : <a href="/api/tickets/file/'+ data +'">test.pdf</a> </object>');
		});

		//TicketsView Helpers
		Handlebars.registerHelper('updateCheck', function(arr){ 
			return new Handlebars.SafeString(houston.updateCheck(arr));			
		});

		Handlebars.registerHelper('dateArrow', function(){
			return new Handlebars.SafeString(houston.dateArrow());
		});

		Handlebars.registerHelper('companyArrow', function(){
			return new Handlebars.SafeString(houston.companyArrow());	
		});

		//TicketView Helpers		
		Handlebars.registerHelper('populateAgentDropdown', function(){
			return new Handlebars.SafeString(houston.populateAgentDropdown());
		});
		
		Handlebars.registerHelper('convertToDateTime', function(attribute){
			return houston.convertToDateTime(attribute);
		});
		
		Handlebars.registerHelper('generateDropSwitch', function(attribute){
			return new Handlebars.SafeString(houston.generateDropSwitch(attribute));
		});

		Handlebars.registerHelper('outputMarkAsCompleted', function(attribute){
			if(app.user.get('role') !== 'USER'){
				return new Handlebars.SafeString('<input id="completed" type="checkbox" name="ticket-completed" value="completed" /><label for="completed">Mark ticket as completed</label>');
			}
		});

		Handlebars.registerHelper('showFilePreviewLink', function(type, index){ 
			if(!type) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<a data-index="'+index+'" class="file-preview">Preview</a>');
			}
		});

		Handlebars.registerHelper('downloadTicketAttachments', function(attribute){
			if(attribute.length > 1) {
				var params = '';
				attribute.forEach(function(file) {
					params += "id[]="+file.ref+"&";
				});

				params = params.substring(0, params.length -1);
				
				return new Handlebars.SafeString('<a class="attachments-link" data-bypass="true" href="http://edd.houston.com/api/tickets/file/zip?'+params+'">Download All Attachments</a>');
			}
		});

		//FileUploadView Helpers
		Handlebars.registerHelper('showFileUploadPreviewLink', function(type, target, cid){ 
			if(!target) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<a data-cid="'+cid+'" class="file-preview">Preview</a>');
			}
		});

		Handlebars.registerHelper('formatFileType', function(type){
		    if(!type) return;
			return new Handlebars.SafeString(houston.formatFileType(type));
		});

		//FilePreviewView Helpers
		Handlebars.registerHelper('generateFilePreviousLink', function(index){
			if(index > 0){
				return new Handlebars.SafeString('<a class="prev" data-index="'+index+'"><i class="icon-angle-circled-left"></i></a>');
			} 
		});

		Handlebars.registerHelper('generateFileNextLink', function(index, length){
			if((length - 1) > index){
				return new Handlebars.SafeString('<a class="next" data-index="'+index+'"><i class="icon-angle-circled-right"></i></a>');
			}
		});

		Handlebars.registerHelper('maxHeightImg', function(){
			return new Handlebars.SafeString(houston.previewImageResize());
		});	

		Handlebars.registerHelper('maxWidthImg', function(){
			return new Handlebars.SafeString(houston.previewImageResizeWidth());	
		});

		//PeopleView Helpers
		Handlebars.registerHelper('displayAgentDelete', function(id){
			if(app.user.attributes.role === 'ADMIN'){
				return new Handlebars.SafeString('<a class="delete-agent" data-model="'+id+'">Delete</a>');	
			}
		});
	}
}