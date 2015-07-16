var handlebarsHelpers = {
	bindHelpers: function() {
		for(var name in handlebarsHelpers.helpers) {
			Handlebars.registerHelper(name, handlebarsHelpers.helpers[name]);
		}
	},
	
	helpers: {
		ifCond: function(v1, v2, options) {
			console.log(v1);
			
			if(v1 === v2) {
				return options.fn(this);
			}
			
			return options.inverse(this);			
		},
		
		forEach: function(arr, options) {
			return houston.forEach(arr, options);
		},
		
		fullHeightPage: function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		},
		
		getUserName: function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserName(authorID));
		},
		
		getUserRoleAsClass: function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserRoleAsClass(authorID));
		},
		
		getCompanyName:  function(authorID) {
			return new Handlebars.SafeString(dataHelper.getCompanyName(authorID));
		},
		
		getUserAvatar: function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserAvatar(authorID));
		},
		
		convertUserRole: function(attribute) {
			return new Handlebars.SafeString(houston.convertUserRole(attribute));
		},
		
		convertToClass: function(attribute) {
			return houston.convertToClass(attribute);
		},
		
		convertToDate: function(attribute) {
			return houston.convertToDate(attribute);
		},
		
		isPDF: function(type, data) {
			return new Handlebars.SafeString(
				'<object data="/api/tickets/file/inline/'+ data +'" type="application/pdf" ' + 
				'width="100%" height="100%" frameborder="0"> alt : <a href="/api/tickets/file/'+ 
				data +'">test.pdf</a> </object>'
			);
		},
		
		// TicketsView Helpers
		updateCheck: function(arr) {
			return new Handlebars.SafeString(houston.updateCheck(arr));
		},
		
		dateArrow: function() {
			return new Handlebars.SafeString(houston.dateArrow());
		},
		
		companyArrow: function() {
			return new Handlebars.SafeString(houston.companyArrow());		
		},
		
		// TicketView Helpers
		populateAgentDropdown: function() {
			return new Handlebars.SafeString(houston.populateAgentDropdown());			
		},
		
		convertToDateTime: function(attribute) {
			return houston.convertToDateTime(attribute);			
		},
		
		generateDropSwitch: function(attribute) {
			return new Handlebars.SafeString(houston.generateDropSwitch(attribute));	
		},
		
		outputMarkAsCompleted: function(attribute) {
			if(app.user.get('role') !== 'USER'){
				return new Handlebars.SafeString(
					'<input id="completed" type="checkbox" name="ticket-completed" value="completed" />' + 
					'<label for="completed">Mark ticket as completed</label>'
				);
			}	
		},
		
		showFilePreviewLink: function(type, index) {
			if(!type) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString(
					'<a data-index="'+index+'" class="file-preview">Preview</a>'
				);
			}	
		},
		
		downloadTicketAttachments: function(attribute) {
			if(attribute.length > 1) {
				var params = '';
				attribute.forEach(function(file) {
					params += "id[]="+file.ref+"&";
				});

				params = params.substring(0, params.length -1);
				
				return new Handlebars.SafeString(
					'<a class="attachments-link" data-bypass="true" href="http://' + 
					window.location.hostname + '/api/tickets/file/zip?'+params+'">Download All Attachments</a>'
				);
			}	
		},
		
		// FileUploadView Helpers
		showFileUploadPreviewLink: function(type, target, cid) {
			if(!target) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString(
					'<a data-cid="'+cid+'" class="file-preview">Preview</a>'
				);
			}			
		},
		
		formatFileType: function(type) {
			if(!type) return;
			return new Handlebars.SafeString(houston.formatFileType(type));
		},
		
		// FilePreviewView Helpers
		generateFilePreviousLink: function(index) {
			if(index > 0){
				return new Handlebars.SafeString(
					'<a class="prev" data-index="'+index+'">' + 
					'<i class="icon-angle-circled-left"></i></a>'
				);
			} 
		},
		
		generateFileNextLink: function(index, length) {
			if((length - 1) > index){
				return new Handlebars.SafeString(
					'<a class="next" data-index="'+index+'">' + 
					'<i class="icon-angle-circled-right"></i></a>'
				);
			}	
		},
		
		maxHeightImg: function() {
			return new Handlebars.SafeString(houston.previewImageResize());	
		},
		
		maxWidthImg: function() {
			return new Handlebars.SafeString(houston.previewImageResizeWidth());		
		},
		
		// PeopleView Helpers
		displayAgentDelete: function(id) {
			if(app.user.attributes.role === 'ADMIN'){
				return new Handlebars.SafeString(
					'<a class="delete-agent" data-model="'+id+'">Delete</a>'
				);	
			}	
		}
	}
}