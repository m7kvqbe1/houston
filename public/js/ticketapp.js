var houston = {
	convertToDate: function(dateObject){
		var monthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'); 
		var date = dateObject.toString();			
		var day = date.substring(8,10);
		var month = date.substring(5,7) -1;
		date = day+' '+monthNames[month];

		return date;	
	},
	
	ordinalSuffix: function($num){
		if($num < 11 || $num > 13){
			switch($num % 10){
				case 1: return 'st';
				case 2: return 'nd';
				case 3: return 'rd';
			}
		}

		return 'th';
	},

	convertToDateTime: function(dateObject){
		var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'); 
		var date = dateObject.toString();			
		var day = date.substring(8,10);
		var month = date.substring(5,7) -1;
		var year = date.substring(0,4);				
		var suffix = this.ordinalSuffix(day);		
		var period = 'am';
		var hour = date.substring(11,13);

		if (hour > 12){
			hour = hour - 12;
			period = 'pm';
		} else if (hour == 12){
			period = 'pm';
		}

		var min = date.substring(14,16);
						
		date = day+suffix+' '+monthNames[month]+' '+year+' '+hour+':'+min+period;
			
		return date;	
	},
	
	convertToClass: function(attribute){
		var cssClass = attribute.toLowerCase().split(' ').join('-');

		return cssClass;
	},

	convertUserRole: function(attribute){
		var userRole = 'Unknown Role';
		if(typeof attribute !== 'undefined'){
			if(attribute === 'ADMIN'){
				userRole = 'Administrator';
			} else if(attribute === 'AGENT'){
				userRole = 'Support Agent';
			} else if(attribute === 'USER'){
				userRole = 'User'
			}
		} 

		return userRole;
	},	
		
	dropSelect: function(button){
		var button = $(button);
		var droptop = button.closest('.drop-top');
		var drop = button.closest('.dropdown').find('.drop');
		if(droptop.hasClass('rounded')){
			drop.slideToggle(200);
			droptop.toggleClass('rounded');
		} else { 
			drop.slideToggle(200, function(){
				droptop.toggleClass('rounded');
			});
		}
	},
	
	dropDown: function(button){
		var item = $(button);
		var css = item.data('class');
		var val = item.text();
		var text = '<span>'+val+'</span><i class="icon-down-dir-1"></i>';
		var dropdown = item.closest('.dropdown');
			
		dropdown.find('.drop-slct').removeClass('on-hold in-progress').addClass(css).html(text); //works without, used for visual

		var drop = item.closest('.drop');
		drop.slideToggle(200, function(){
			$(this).closest('.dropdown').find('.drop-top').toggleClass('rounded on-hold');
			drop.toggleClass('on-hold');
				
			if(dropdown.hasClass('dropswitch')){					
				drop.find('li').each(function(){
					var li = $(this);												
					li.toggleClass('slct');	
					li.toggleClass('n-slct');
				});

				houston.dropDownAttribute = 'status';
			} else {
				drop.find('li').removeClass('slct');
				item.addClass('slct');
				houston.dropDownAttribute = 'agent';			
			}				
		});
		
		var output; 
		if(dropdown.hasClass('dropswitch')){
			output = {param: 'status', value: val}; 
		} else {
			val = item.data('id');
			output = {param: 'agent', value: val};
		}
		
		return output;
	},

	generateDropSwitch: function(attribute){
		if(attribute === 'In Progress') {
			return '<div class="dropdown dropswitch">'+
						'<div class="drop-inner">'+				
							'<div class="drop-top on-hold rounded">'+
								'<div class="btn in-progress drop-slct"><span>In Progress</span><i class="icon-down-dir-1"></i></div>'+
							'</div>'+
							'<ul class="drop on-hold">'+
								'<li class="slct" data-class="in-progress">In Progress</li>'+
								'<li class="n-slct" data-class="on-hold">On Hold</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
		} else if(attribute === 'On Hold'){
			return '<div class="dropdown dropswitch">'+
						'<div class="drop-inner">'+				
							'<div class="drop-top in-progress rounded">'+
								'<div class="btn on-hold drop-slct"><span>On Hold</span><i class="icon-down-dir-1"></i></div>'+
							'</div>'+
							'<ul class="drop in-progress">'+
								'<li class="slct" data-class="on-hold">On Hold</li>'+
								'<li class="n-slct" data-class="in-progress">In Progress</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
		} else if(attribute === 'Completed'){
			return '<div class="btn completed">Completed</div>';
		}
	},
	
	replyToggle: function(view){
		view.find('.reply').slideToggle();
		view.find('#form-reply textarea').focus();
		var scroll = view.closest(document).scrollTop()+ 310;

		view.closest('html, body').animate({ scrollTop: scroll });
	},

	updateCheck: function(arr){
		var updateSeen = false;
		var i;

		for (i = 0; i < arr.length; ++i) {
			if(arr[i] == app.user.id) {					
				updateSeen = true;
			}
		}

		return updateSeen;
	},

	populateAgentDropdown: function(){
		var arr = app.users.filter(function(data){
			return data.get('role') !== 'USER';
		});

		var i;
		var str = '';

		for (i = 0; i < arr.length; ++i) {
			str += '<li data-id="'+arr[i].id+'">'+dataHelper.getUserName(arr[i].id)+'</li>';
		}

		return str;
	},

	dateArrow: function(){
		if(app.tickets.byDateOrder === 1){
			return '<i class="icon-up-dir"></i>';
		} else if(app.tickets.byDateOrder === 2){
			return '<i class="icon-down-dir-1"></i>';
		} else {
			return '<i class="icon-down-dir-1 inactive"></i>';
		}
	},

	companyArrow: function(){
		if(app.tickets.byCompanyOrder === 1){
			return '<i class="icon-up-dir"></i>';
		} else if(app.tickets.byCompanyOrder === 2){
			return '<i class="icon-down-dir-1"></i>';
		} else {
			return '<i class="icon-down-dir-1 inactive"></i>';
		}	
	},

	forEach: function(arr, options){
		if(options.inverse && !arr.length)
			return options.inverse(this);

		return arr.map(function(item,index) {
			item.$index = index;
			item.$first = index === 0;
			item.$last  = index === arr.length-1;
			return options.fn(item);
		}).join('');
	},

	subjectCharCount: function(view){
		var max = 75;
		var input = view.find('.new-sub');
		var value = input.val();
		var length = value.length;
		
		if(length >= max){
			input.val(value.substr(0, max));
			length = max;
		}
		
		var count = max - length;
		var charSpan = view.find('.char-count span');
		charSpan.text(count);
		
		if(count <= 10){
			charSpan.addClass('count');
		} else {
			charSpan.removeClass('count');
		}
		
		if(count == 0){
			view.find('.char-count').addClass('count');
		} else {
			view.find('.char-count').removeClass('count');
		}
	},

	calculateBoxHeight: function(){
		var windowHeight = $(window).height();
		var idealHeight = windowHeight - 270;

		return idealHeight;
	},

	isDisplayableImage: function(type){
		if(type.indexOf('jpeg') == -1 && type.indexOf('png') == -1 && type.indexOf('pdf') == -1){
			return false;
		}

		return true;
	},

	validateForm: function(button){
		var valid = true;
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		var form = $(button).closest('form');
		var inputs = form.find('.required');

		inputs.each(function(){
			var input = $(this);
			if(input.val() == ''){
				input.addClass('error');
				valid = false;
			} else {
				input.removeClass('error')
			}

			if(input.is('input[type=email]')){
				address = input.val();
				if(!houston.validateEmail(address)){
					valid = false;
					input.addClass('error');		
				} else {
					input.removeClass('error');
				}
			}
		});

		return valid;
	},

	validateEmail: function(address){
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		
		if(re.test(address)){
			return true;
		} else {
			return false;
		}
	},

	validateAndApproveEmail: function(input, successCallback, errorCallback){
		var address = input.val();
		
		if(!this.validateEmail(address)){
			input.addClass('error');
			return
		} else {
			input.removeClass('error');
		}

		var request = $.get('/api/check/email?email=' + address);
        
        request.done(function(msg) {
            if(successCallback) successCallback(input);
        });
         
        request.fail(function(jqXHR, textStatus) {
            if(errorCallback) errorCallback(input);
        });	    
	},

	formatFileType: function(type){
		var fileType = 'FILE';
		
		if(type){ 
			switch(type.split('/')[1]){
				case 'jpeg':
					fileType = 'JPG';
					break;
				case 'png':
					fileType = 'PNG';
					break;
				case 'gif':
					fileType = 'GIF';
					break;
				case 'psd':
					fileType = 'PSD';
					break;
					case 'pdf':
					fileType = 'PDF';
					break;
				case 'plain':
					fileType = 'TXT';
					break;
			}
		}

		return fileType;
	},

	previewImageResize: function(){
		var windowHeight = $(window).height();
		var maxHeight = windowHeight - 190;

		return maxHeight;
	},

	previewImageResizeWidth: function(){
		var windowWidth = $(window).width();
		var maxWidth = windowWidth - 80;

		return maxWidth;
	},

	displayUpdates: function(updated){
		if(updated === 0) {
			var html = '';
		} else if (updated > 99){
			var html = '<div class="update-alert">99</div>';
		} else if (updated > 9){
			var html = '<div class="update-alert"><span>'+updated+'</span></div>'
		} else {
			html = '<div class="update-alert">'+updated+'</div>';
		}

		$('#update-alert').html(html);
	},

	createModal: function(attributesObj, confirmCallback, cancelCallback){
		app.modal = new ModalView({model: new Backbone.Model(attributesObj)});

		if(confirmCallback) app.modal.confirmBehaviour = confirmCallback;
		if(cancelCallback) app.modal.cancelBehaviour = cancelCallback;

		app.modalWindow.html(app.modal.$el); 
		app.modal.render();
	}
};var handlebarsHelpers = {
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

		// TicketsView Helpers
		Handlebars.registerHelper('updateCheck', function(arr){ 
			return new Handlebars.SafeString(houston.updateCheck(arr));			
		});

		Handlebars.registerHelper('dateArrow', function(){
			return new Handlebars.SafeString(houston.dateArrow());
		});

		Handlebars.registerHelper('companyArrow', function(){
			return new Handlebars.SafeString(houston.companyArrow());	
		});

		// TicketView Helpers		
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
				return new Handlebars.SafeString('<a class="attachments-link" data-bypass="true" href="http://' + window.location.hostname + '/api/tickets/file/zip?'+params+'">Download All Attachments</a>');
			}
		});

		// FileUploadView Helpers
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

		// FilePreviewView Helpers
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

		// PeopleView Helpers
		Handlebars.registerHelper('displayAgentDelete', function(id){
			if(app.user.attributes.role === 'ADMIN'){
				return new Handlebars.SafeString('<a class="delete-agent" data-model="'+id+'">Delete</a>');	
			}
		});
	}
};var dataHelper = {
	getUserName: function(userID){
		var user = app.users.get(userID);
		var userName = 'Unknown User';
		if(typeof user !== "undefined"){
			if(user.attributes.firstName){
				userName = user.attributes.firstName+' '+user.attributes.lastName;
			} else {
				userName = user.attributes.emailAddress;
			}
		}
		return userName;
	},

	getCompanyName: function(userID){
		var user = app.users.get(userID);
		var companyName = 'Unknown Company';
		if(typeof user !== "undefined"){				
			if(user.attributes.clientID){
				companyName = app.clients.get(user.attributes.clientID).attributes.name;
			} else {
				companyName = app.user.attributes.companyName;
			}
		}
		return companyName;
	},

	getUserRoleAsClass: function(userID){
		var user = app.users.get(userID);
		var userRole = 'Unknown';
		if(typeof user !== "undefined"){
			var userRole = user.attributes.role;
		} 
		return userRole;
	},

	getUserAvatar: function(userID){
		var user = app.users.get(userID);
		var avatar = '/application/assets/img/avatar.png';
		if(typeof user !== "undefined"){
			if(user.attributes.avatar) avatar = user.attributes.avatar;
		} 
		return avatar;
	}

};var events = {
	pageResize: function(){
		$('.box-app').css('min-height', houston.calculateBoxHeight());
	},

	imgMaxHeight: function(){
		this.$('.preview-img').css('max-height', houston.previewImageResize());
	},

	bindEvents: function(){

		$(window).on("resize", events.pageResize).on("resize", events.imgMaxHeight);

		// Mobile menu
		$('.nav-icon, .mob-menu a').click(function(){
			$('.outer-wrap, .mob-menu').fadeToggle(300);
			$('.nav-icon').toggleClass('cross');
		});
		
		// Close notification popup
		$('#notice .close').click( function() {
			$(this).parent().hide();
		});

		$('.log-out').click(function(){
			houston.createModal({type: 'Warning', message: 'Are you sure you would like to log out?', cancel: true},
		    	function(){
					window.location.href = 'http://' + window.location.hostname + '/logout';
				}
		    );
		});

		// PushState handler
		$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
		  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		  var root = location.protocol + "//" + location.host + app.root;
		  if(href.prop.slice(0, root.length) === root) {
		    evt.preventDefault();
		    Backbone.history.navigate(href.attr, true);
		  }
		});
	}
};var AgentModel = Backbone.Model.extend({
	url: '/api/agents',	
	parse: function(response) {
		if(response._id) {
			response.id = response._id['$id'];
			delete response._id;
		}		
		return response;
	}
});;var ClientModel = Backbone.Model.extend({
	urlRoot: '/api/clients',
	initialize: function(){
		this.usersCollection = new ClientUsers();
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
;var ClientUserModel = Backbone.Model.extend({	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		if(response.clientID){
			response.clientID = response.clientID['$id'];
		}
		if(response.companyID){
			response.companyID = response.companyID['$id'];
		}
		
		return response;
	},
	initialize: function() {
		// On deletion of model fetch all user data
		this.on('destroy', function(){
			app.fetchUsers();
		});
	}
});;var FileUploadModel = Backbone.Model.extend({
	url: '/api/tickets/file',
	initialise: function(){},
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	defaults: {
		status: 'initialising'
	}
});;var MessageModel = Backbone.Model.extend({
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
	if(response.ticketID['$id']){
		response.ticketID = response.ticketID['$id'];
	}
	if(response.authorID['$id']){
		response.authorID = response.authorID['$id'];
	}
		return response;
	}
});;var TicketDetailModel = Backbone.Model.extend({
	urlRoot: '/api/tickets',
	initialize: function(){
		this.on('sync',  function(){
			app.tickets.fetch({reset:true});
		});

		this.messagesCollection = new Messages();
	},

	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	}
});;var TicketModel = Backbone.Model.extend({
	url: '/api/tickets',

	initialize: function(){
		this.on("sync", function(model){
			// When a new ticket is saved fetch the tickets collection
			app.tickets.fetch({reset: true});
		});
	},
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		if(response.authorID['$id']){
			response.authorID = response.authorID['$id'];
		}
		return response;
	},
	defaults: {
		status: 'New',
		agent: false,
		files: [],
		updated: []		
	}
});;var UserModel = Backbone.Model.extend({
	url: '/api/user/self',
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		} 
		if(response.companyID && response.companyID.$id){
			response.companyID = response.companyID['$id'];
		}
		
		return response;
	},
	defaults: {
		firstName: '',
		lastName: '',
		avatar: ''
	}
});;var Agents = Backbone.Collection.extend({
	model: AgentModel,
	initialize: function() {
		// Fetch user data when agent is added, removed or amended
		this.on('add change destroy', function(){
			app.fetchUsers();
		});
	}
});;var Clients = Backbone.Collection.extend({
	model: ClientModel,	
	url: '/api/clients',	
	comparator: 'name',
	initialize: function() {
		// Fetch user data when client is added, removed or amended
		this.on('add change destroy', function(){
			app.fetchUsers();
		});
	}
});
;var ClientUsers = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users'
});;var Files = Backbone.Collection.extend({
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
});;var Messages = Backbone.Collection.extend({
	model: MessageModel,	
	url: '/api/tickets/reply/',
	comparator: 'date'
});;var Tickets = Backbone.Collection.extend({
	model: TicketModel,	
	url: '/api/tickets',
	
	initialize: function(models){
		this.filtered = new Backbone.Collection(models);

		this.filtered.comparator = function(a,b) {
			if(a.get('date') > b.get('date')) {
				return -1;	
			} else if(b.get('date') > a.get('date')){
				return 1;
			}
			return 0;
		}

		this.on("reset add", function(){		
			this.filtered.reset(this.allTickets());
			this.countUpdated();
		});
	},
	
	allTickets: function(){
		filtered = this.filter(function(data){
			return data.get('status') !== 'Completed';
		});

		return filtered;
	},

	updatedTickets: function(){
		var updated = [];

		this.filter(function(model){
			if(!houston.updateCheck(model.get('updated'))){
				updated.push(model);
			}
		});

		return updated;
	},
	
	byAgent: function(){
		filtered = this.filter(function(data){
			return data.get('agent') == app.user.id && data.get('status') !== 'Completed';
		});

		return filtered;	
	},
	
	byCompleted: function(){
		filtered = this.filter(function(data){
			return data.get('status') === 'Completed';
		});

		return filtered;	
	},

	byFilter: function(key, value){
		filtered = this.filter(function(data){
			return data.get(key) === value;
		});

		return filtered;
	},

	countUpdated: function(){	
		if(!app.updateElem) return;
		var updated = 0;

		this.filter(function(model){
			if(!houston.updateCheck(model.get('updated'))) updated++;
		});

		houston.displayUpdates(updated);
	},
	
	byDateOrder: 2,
	byDate: function() {
		this.byCompanyOrder = false;
		
		if(this.byDateOrder === 1 || !this.byDateOrder){
			this.byDateOrder = 2;
			this.filtered.comparator = function(a, b) {
				if(a.get('date') > b.get('date')) {
					return -1;	
				} else if(b.get('date') > a.get('date')){
					return 1;
				}
				return 0;
			};
		} else if(this.byDateOrder === 2) {
			this.byDateOrder = 1;
			this.filtered.comparator = function(model) {
				return model.get('date');
			}			
		}

		this.filtered.sort();
	},

	byCompanyOrder: false,		
	byCompany: function(){
		
		this.byDateOrder = false;

		if(this.byCompanyOrder === 1 || !this.byCompanyOrder){
			this.byCompanyOrder = 2;
			this.filtered.comparator = function(model) {
				return dataHelper.getCompanyName(model.get('authorID'));
			}
		} else if(this.byCompanyOrder === 2) {
			this.byCompanyOrder = 1;
			this.filtered.comparator = function(a, b) {
				if(dataHelper.getCompanyName(a.get('authorID')) < dataHelper.getCompanyName(b.get('authorID'))) {
					return 1;	
				} else if(dataHelper.getCompanyName(b.get('authorID')) > dataHelper.getCompanyName(a.get('authorID'))){
					return -1;
				}
				return 0;
			};			
		}
		
		this.filtered.sort();
	}
});;var Users = Backbone.Collection.extend({
	model: ClientUserModel,	
	url: '/api/users',	

	initialize: function() {
		this.on("sync", function() {
			// On fetch reset agentsCollection with all agent/admin users
			app.agentsCollection.reset(this.agentUsers());
		});
	},

	usersByClient: function(clientID){
		filtered = this.filter(function(data){
			return data.get('clientID') === clientID;
		});

		return filtered;
	},
	
	agentUsers: function(){
		filtered = this.filter(function(data){
			return data.get('role') !== 'USER';
		});
		
		return filtered;
	},

	addUsersToClient: function(){
		var theModel;
		for(var i=0; i<app.clients.length; i++) {
			theModel = app.clients.models[i];
	        theModel.usersCollection.set(app.users.usersByClient(theModel.id));	
	    }
	}
});;var AccountView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Manage Your Account</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">'+
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);	
	},

	onClose: function(){
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template());
			
		return this;
	}
});;var AnalyticsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>System Analytics</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">' +
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);	
	},

	onClose: function(){
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	}
});;var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div id="company-stream">'+
			'<div id="modal-form" class="active">'+
				'<div class="modal-window-inner">'+
	                '<div class="modal-outer">'+
						'<div class="modal-wrap">'+
							'<div class="box">'+
								'<form>'+
									'<h3>Text</h3>'+
									'<h4>Text</h4>'+
									'<div class="modal-buttons">'+
										'<input id="modal-form-input" type="text" />'+
										'<div class="validated-marker">'+
					                        '<div class="vrf-cir">'+
					                            '<i class="icon-cancel"></i>'+
					                        '</div>'+
					                    '</div>'+
										'<button class="confirm" type="button">OK</button>'+
										'<div class="beige or">or</div>'+
										'<button class="btn-can" type="button">Cancel</button>'+				
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
	            '</div>'+		
			'</div>'+
			'<ul id="clients-stream">'+
	
			'</ul>'+
		'</div>'
	),

	initialize: function() {	
		this.listenTo(this.collection, 'sync sort', this.render);
		_.bindAll(this, 'renderClient');
	},

	onClose: function(){
		this.stopListening();

		app.clients.each(function(model){
			model.modelView.close();
		});
	},

	renderClient: function(model) {
		model.modelView = new ClientView({model: model});

		model.modelView.parent = this;

		this.$el.find('#clients-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		
		return this;
	}
});;var ClientView = Backbone.View.extend({
	tagName: 'li',
	className: 'client',
	template: Handlebars.compile(
		'<div class="company-info">'+
			'<h3>{{attributes.name}}</h3>'+
			'<a class="edit-client" data-form="3" data-model="{{attributes.id}}">Rename</a>'+
			'<a class="delete-client">Delete</a>'+
			'<a class="new-client-user" data-form="2" data-model="{{attributes.id}}">New User</a>'+
		'</div>'+
		'<div class="client-stream">'+
			'<ul class="client-user-stream">'+

			'</ul>'+
		'</div>'
	),	

	initialize: function(){	
		this.usersView = new UsersView({collection: this.model.usersCollection});

		this.usersView.parent = this;
	},

	onClose: function(){
		this.stopListening();
		this.usersView.close();
	},

	render: function(){	
		this.$el.html(this.template(this.model));
		this.usersView.render();
		
		this.delegateEvents({
			'click .delete-client': 'deleteClient'
		});
		return this;
	},

	deleteClient: function(){
		var theModel = this.model;
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + theModel.attributes.name +' and all of its users?', cancel: true},
	    	function(){
	    		theModel.destroy({wait:true});			
			}
	    );		
	}
});;var FileUploadView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="attach-files">'+
			'<a class="attach-link">Attach files to this ticket</a>'+ 
			'<div class="supported">Supported -</div>'+ 
			'<ul class="filetypes">'+
				'<li>Jpg</li>'+
				'<li>Png</li>'+
				'<li>Gif</li>'+
				'<li>Pdf</li>'+
			'</ul>'+
			'<div class="file-input-wrapper">'+
				'<div id="drop_zone">Drop files here</div>'+
				'<input type="file" id="filesInput" name="files[]" multiple />'+
			'</div>'+
			'<ul id="files" class="files">'+
			'{{#each models}}'+
				'<li class="file">'+
					'<div class="file-text {{attributes.status}}">'+		
						'<img class="svg-loader" src="/application/assets/img/oval.svg" width="52" alt="Loading">'+
		  				'<div class="file-icon">'+
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
							'<a data-cid="{{cid}}" class="file-del">Delete</a>'+
							'{{#unless attributes.status}}'+
								'{{showFileUploadPreviewLink attributes.type attributes.target cid}}'+
							'{{/unless}}'+	
						'</div>'+
					'</div>'+					
				'</li>'+
			'{{/each}}'+
			'</ul>'+	
		'</div>'
	),

	initialize : function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);
		this.listenTo(this.collection, 'add', this.markAsChanged);
	},

	onClose: function(){
		this.stopListening();
		
		// Delete files from unsaved tickets/replies
		if(app.files.length) {
			app.files.emptyCollection();
		}
	},

	render : function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .attach-link': 'fileDialogTrigger',
			'dragover #drop_zone': 'handleDragOver',
			'dragleave #drop_zone': 'handleDragLeave',
			'drop #drop_zone': 'handleDragFileSelect',
			'change #filesInput': 'handleFileSelect',
			'click .file-del': 'deleteFileHandler',
			'click .file-preview': 'previewFile',
			'click .preview-close': 'previewClose'
		});
	},

	formatFileNameForModal: function(name){
		var type = name.substr(name.indexOf('.') + 1);
		name = name.substr(0,27) + '...[' + type + ']';

		return name;
	},

	deleteFileHandler: function(e){
		var button = $(e.currentTarget);
		var cid = button.data('cid');	
		var fileToDelete = this.collection.get(cid);

		this.collection.deleteFile(fileToDelete);
	},

	addFiles: function(files){
		for (var i = 0, f; f = files[i]; i++) {
			//Skip file if over maximum file size
			if(f.size > 100000000) {
				var name = f.name;
				if(name.length > 30){
					name = this.formatFileNameForModal(name);
				}
				houston.createModal({type: 'File Error', message: 'The file "' + name + '" is over the 100MB limit.'});	
			    
			    continue;
			}

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
							}, error: function(model,response,options){
								console.log(response);
								console.log(model);
								var name = model.attributes.name;
								if(name.length > 30){
									name = this.formatFileNameForModal(name);
								}
								houston.createModal({type: 'File Error', message: 'The file upload "' + name + '" was not successful.'});
								app.files.deleteFile(model);
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

	previewFile: function(evt){ 
		var button = $(evt.currentTarget);
		var cid = button.data('cid');	
		var fileToPreview = this.collection.get(cid);

		fileToPreview.set({preview: true});

		app.preview = new PreviewWindow({collection: app.files.filesPreviewCollection});
		
		app.preview.render();
		app.modalWindow.append(app.preview.$el);
	}
});;var FormView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">'+
					'<h2>Create Ticket</h2>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app" style="{{fullHeightPage}}">'+
			'<form id="form-new">'+
				'<input type="text" class="required new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />'+
				'<div class="char-count"><span>75</span> Characters Remaining</div>'+
				'<textarea class="required" name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>'+
				'<div id="file-upload-view-wrap">'+	

				'</div>'+
				'<button class="save" type="button">Create Ticket</button>'+
				'<div class="beige or">or</div>'+
				'<a class="cancel-btn ib">Cancel</a>'+
			'</form>'+
		'</div>'
	),

	initialize: function() {
		this.fileUploadView = new FileUploadView({collection: app.files});
		this.fileUploadView.parent = this;

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		this.fileUploadView.close();
	},

	render: function(){
		app.files.reset();

		this.$el.html(this.template(this.model));	
		this.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();

		this.delegateEvents({
			'click .save': 'saveModel',
			'input .new-sub': 'subjectCharCount',
			'click .cancel-btn': 'cancelTicket',
			'input input': 'markAsChanged',
			'input textarea': 'markAsChanged'
		});

		return this;
	},

    keyEvent: function(e){
        var keyCode = e.which;

		if(keyCode == 13){
			e.preventDefault();
			this.saveModel();
		} else if (keyCode == 27){
			this.cancelTicket();
		}
    },

	subjectCharCount: function(){
		return houston.subjectCharCount(this.$el);
	},
	
	saveModel: function(){
		if(!houston.validateForm(this.$el.find('.save'))) return;

		this.setModelData();		
		this.model.save(this.model.attributes,
			{
				success: _.bind(function(){		
					app.changed = false;		
					this.model = new TicketModel();
					app.files.reset();
					app.navigate('', {trigger: true});
				}, this)
			}
		);
	},

	setModelData: function(){
		this.model.set({
			subject: this.$el.find('input[name="new-sub"]').val(),
			message: this.$el.find('textarea[name="new-textarea"]').val(),
			authorID: app.user.attributes.id,
			updated: this.model.get('updated').concat(app.user.attributes.id),
			files: app.files.createFilesArray()
		});		
	},

	cancelTicket: function(){ 
		this.$el.find('input[type="text"], textarea').val('');
			
		app.files.emptyCollection();	
	}
});;var MessagesView = Backbone.View.extend({
	tagName: "ul",
	template: Handlebars.compile(
		'{{#forEach models}}'+
			'<li class="msg from-{{getUserRoleAsClass attributes.authorID}}">'+
				'<div class="msg-dtl">'+
					'<img class="avatar" src="{{getUserAvatar attributes.authorID}}" alt="{{getUserName attributes.authorID}}" />'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{getUserName attributes.authorID}}</h3>'+
						'<h4 class="msg-company">{{getCompanyName attributes.authorID}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+
					'<div>'+
						'{{attributes.message}}'+
					'</div>'+
					'<ul class="files" data-reply="{{id}}">'+
					'{{#each attributes.files}}'+
						'<li class="file">'+
							'<div class="file-text">'+
				  				'<div class="file-icon">'+
				  					'<span>'+
				  					'{{#if type}}'+
				  					'{{formatFileType type}}'+
				  					'{{else}}'+
				  					'FILE'+
				  					'{{/if}}'+
				  					'</span>'+
				  				'</div>'+
				  				'<div class="file-info">'+
									'<div class="filename">{{name}}</div>'+
									'{{showFilePreviewLink type @index}}'+
									'<a data-bypass="true" href="http://' + window.location.hostname + '/api/tickets/file/{{ref}}">Download</a>'+
								'</div>'+
							'</div>'+
						'</li>'+
					'{{/each}}'+
					'</ul>'+
					'{{downloadTicketAttachments attributes.files}}'+
				'{{#if $last}}'+
					'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea class="required" name="new-textarea" placeholder="Please add your comments here..."></textarea>' +
						'<div id="file-upload-view-wrap">'+

						'</div>'+
						'{{outputMarkAsCompleted}}'+
						'<div class="reply-submit-buttons">'+
							'<button class="add-message" type="button">Submit</button>' +
							'<div class="beige or">or</div>' +
							'<a class="cancel-btn ib">Cancel</a>' +
						'</div>'+
					'</form>' +
				'</div>'+
				'{{else}}'+
				'</div>'+
				'{{/if}}'+
			'</li>'+
		'{{/forEach}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'add sync', this.render);

		this.fileUploadView = new FileUploadView({ collection: app.files});
		this.fileUploadView.parent = this;

	},

	onClose: function(){
		this.stopListening();
		this.fileUploadView.close();
	},

	render: function(){
		this.$el.html(this.template(this.collection));

		app.files.reset();
		
		this.parent.$('#file-upload-view-wrap').append(this.fileUploadView.$el);
		this.fileUploadView.render();
	}
});;var ModalView = Backbone.View.extend({
	className: 'modal-window-inner',
	template: Handlebars.compile(
		'<div class="modal-outer">'+
			'<div class="modal-wrap">'+
				'<div class="box">'+
				'<h3>{{type}}</h3>'+
				'<h4>{{message}}</h4>'+
				'<div class="modal-buttons">'+
					'<button class="confirm" type="button">OK</button>'+
					'{{#if cancel}}'+
					'<div class="beige or">or</div>'+
					'<button class="btn-can" type="button">Cancel</button>'+
					'{{/if}}'+					
				'</div>'+
				'</div>'+
			'</div>'+
		'</div>'
	),
	render: function(){
		this.$el.html(this.template(this.model.attributes));

		this.delegateEvents({
			'click .confirm': 'confirm',
			'click .btn-can': 'cancel'
		});
		
		app.modalWindow.show();
	},

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		app.modalWindow.hide();
		app.modal = false;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.cancel();
		} else if (keyCode == 13){
			this.confirm();
		}
	},

	cancel: function(){
		if(this.cancelBehaviour) this.cancelBehaviour();
		this.close();	

		// Render preview window if exists
		if(app.preview){
			app.modalWindow.html(app.preview.$el);
			app.preview.render();
		}	
	},

	confirm: function(){
		if(this.confirmBehaviour) this.confirmBehaviour();
		this.close();

		// Close preview window if exists
		if(app.preview){
			app.preview.close();
		}	
	}
});;var PeopleView = Backbone.View.extend({
	template: Handlebars.compile(		
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">'+
					'<h2>People</h2>'+
					'<a class="btn new-client" data-form="1">New Client</a>'+
					'<a class="btn" data-form="0">New Agent</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app box-people" style="{{fullHeightPage}}">'+
			'<div id="agent-stream">'+
			'<h2>Support Agents</h2>'+
				'<ul>'+
				'{{#each models}}'+
					'<li class="person">'+
						'{{#ifCond attributes.verify true}}'+					
							'<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{attributes.firstName}} {{attributes.lastName}}" />'+
							'<h3>{{#if attributes.firstName}}{{attributes.firstName}} {{attributes.lastName}}{{else}}{{attributes.emailAddress}}{{/if}}</h3>'+
							'<h4>{{convertUserRole attributes.role}}</h4>'+
						'{{else}}'+
							'<img class="avatar" src="application/assets/img/avatar.png" />'+
							'<h3>{{attributes.emailAddress}}</h3>'+
							'<h4>Awaiting Verification</h4>'+
							'<a class="resend-verification">Resend</a> '+
						'{{/ifCond}}'+
						'{{displayAgentDelete id}}'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</div>'+
			'<h2 class="people-clients-header">Clients</h2>'+
			'<div id="clients-wrap">'+	

			'</div>'+
		'</div>'			
	),
	
	initialize: function() {		
		this.listenTo(app.agentsCollection, 'add change remove', this.render);

		app.agentsCollection.view = this;
		this.clientsView = new ClientsView({collection: app.clients}); 

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		this.stopListening();
		this.clientsView.close();
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		this.$('#clients-wrap').append(this.clientsView.render().$el); 

		this.delegateEvents({
			'click .btn':'setupForm',
			'click .new-client-user': 'setupForm',
			'click .edit-client': 'setupForm',
			'click button.btn-can': 'cancelForm',
			'click .agent-button': 'validateAgent',
			'click .delete-agent': 'deleteAgent',
			'click .client-button': 'addClient',
			'click .user-button': 'validateUser',
			'click .edit-client-button': 'editClient',
			'input input': 'markAsChanged'
		});

		return this;		
	},

    keyEvent: function(e){
    	if(!this.formActive) return;

        var keyCode = e.which;

		if(keyCode == 13){
			e.preventDefault();
			this.keyFormHandler();
		} else if (keyCode == 27){
			this.cancelForm();
		}
    },

	keyFormHandler: function(){
		var button = this.$el.find('.confirm');

		if(button.hasClass('user-button')){
			this.validateUser();
		} else if (button.hasClass('agent-button')){
			this.validateAgent();
		} else if (button.hasClass('client-button')){		
			this.addClient();
		}
	},    

	formData: [
		['Add New Agent','To add a new agent, simply input their email address and Houston will do the rest. Simple!', 'Email Address', 'agent-button'],
		['Add New Client', 'To add a new client, simply add the client\'s name below.', 'Client Name', 'client-button'],
		['Add New %ClientName% User', 'To add a new user to %ClientName%, simply input their email address and Houston will do the rest. Simple!', 'Email Address', 'user-button'],
		['Edit %ClientName%\'s name', 'To edit %ClientName%\'s name simply enter the amended name below.', 'New Name', 'edit-client-button']
	],

	setupForm: function(e){
		var input = $(e.currentTarget);
		var formData = input.attr('data-form');
		var modelData = input.attr('data-model');
		var form = this.$el.find('#modal-form');
		
		// Add client name to formData if adding a User
		if(modelData) {
			var clientName = app.clients.get(modelData).attributes.name;
			var formHeader = this.formData[formData][0].replace('%ClientName%', clientName);
			var formMessage = this.formData[formData][1].replace('%ClientName%', clientName);

			form.find('h3').text(formHeader);
			form.find('h4').text(formMessage);
			form.find('input').attr('data-model', modelData);

		} else {
			form.find('h3').text(this.formData[formData][0]);
			form.find('h4').text(this.formData[formData][1]);
		}

		form.find('input').attr('placeholder', this.formData[formData][2]);
		form.find('.confirm').addClass(this.formData[formData][3]);

		this.showForm();
	},

	formActive: false,

	showForm: function(){
		this.$el.find('#modal-form').show().find('input').focus();

		this.formActive = true;
	},

	cancelForm: function(){
		var form = this.$el.find('#modal-form');
		form.find('.modal-buttons').removeClass('validated-input-resize');
		form.find('.confirm').removeClass('agent-button client-button user-button edit-client-button');
		form.hide().find('input').removeClass('error').val('');

		this.formActive = false;
	},

	validateClient: function(){
		var input = this.$el.find('#modal-form-input');
		var name = input.val();
		var nameInUse = false;

		if(!name){
			input.addClass('error');
			return false;
		} else {
			input.removeClass('error');
		}

		app.clients.each(function(model){
			if(name.toLowerCase() === model.attributes.name.toLowerCase()){
				nameInUse = true;
			}
		});

		if(nameInUse) {
			this.validateFail(input);	
			return false;		
		} else {		
			return input;
		}	
	},

	addClient: function() {
		var validate = this.validateClient();
		if(!validate) return;
		
		var input = $(validate);
		var name = input.val();
		var attributes = {'name': name};

		app.currentView.clientsView.collection.create(
			attributes,
			{
				wait: true,
				success: function(){
					app.changed = false;
				}
			}
		);			
	},	

	editClient: function(e) {
		var input = $(this.validateClient());
		if(!input) return;

		var name = input.val();
		var clientID = input.attr('data-model');
		var client = app.clients.get(clientID);
		var attributes = {'name': name};

		client.save(attributes,{
			success: function(){
				app.changed = false;
				app.clients.sort();
			}
		});
	},	

	validateAgent: function(){
		var input = this.$el.find('#modal-form-input');
        houston.validateAndApproveEmail(input,this.addAgent, this.validateFail);
	},

	validateUser: function(){
		var input = this.$el.find('#modal-form-input');
        houston.validateAndApproveEmail(input, this.addUser, this.validateFail);
	},

    validateFail: function(input){
        var div = input.closest('div');
        div.addClass('validated-input-resize');      
    },

	addAgent: function(input) {
		var attributes = {
			'emailAddress': input.val(),
			'verify': false
		};

		app.currentView.collection.create(attributes,{wait: true});
	},

	deleteAgent: function(e){
		var theModel = this.collection.get($(e.currentTarget).attr('data-model'));
		var name;

		if(theModel.attributes.firstName){
			name = theModel.attributes.firstName + ' ' + theModel.attributes.lastName;
		} else {
			name = theModel.attributes.emailAddress;
		}
		
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + name +'?', cancel: true},
	    	function(){
	    		theModel.destroy({wait:true});			
			}
	    );				
	},	

	addUser: function(input) {
		var clientID = input.attr('data-model');

		var attributes = {
			'emailAddress': input.val(),
			'clientID': clientID
		};

		app.currentView.clientsView.collection.get(clientID).usersCollection.create(
			attributes,
			{
				wait: true,
				success: function(){
					app.changed = false;
					app.fetchUsers();	// Needed as didnt work with listener on the collection
					app.currentView.cancelForm();
				}
			}
		);	
	}	
});;var PreviewWindow = Backbone.View.extend({
	className: 'preview-window-inner',
	template: Handlebars.compile(
		'{{#each models}}'+
			'{{#if attributes.preview}}'+
				'<div class="preview-wrap">'+
					'<div class="preview-img-wrap">'+
						'<i class="preview-close icon-cancel-circled"></i>'+
						'<div class="preview-img-box">'+
							'<div class="preview-img-info">'+
								'<div class="preview-prev">'+
									'{{generateFilePreviousLink @index}}'+				
								'</div>'+
								'<h3 class="preview-filename">{{attributes.name}}</h3>'+
								'<div class="preview-next">'+	
									'{{generateFileNextLink @index collection.length}}'+
								'</div>'+
							'</div>'+
							'<div class="img-wrap">'+					
								'{{#ifCond attributes.type "application/pdf"}}'+
								    '<object data="/api/tickets/file/inline/{{attributes.ref}}" type="application/pdf" width="100%" height="100%" frameborder="0"> alt : <a href="/api/tickets/file/{{attributes.ref}}">test.pdf</a> </object>'+
								'{{else}}'+
								    '<img class="preview-img" style="max-height:{{maxHeightImg}}px;" src="{{#if attributes.ref}}http://' + window.location.hostname + '/api/tickets/file/{{attributes.ref}}{{else}}{{attributes.target}}{{/if}}" />'+	
								'{{/ifCond}}'+													
							'</div>'+
							'<div class="preview-img-bottom">'+
								'<div class="preview-type">'+
									'{{formatFileType attributes.type}}'+
								'</div>'+
								'<div class="preview-download">'+
									'<a data-bypass="true" href="{{#if attributes.ref}}http://' + window.location.hostname + '/api/tickets/file/{{attributes.ref}}{{else}}{{attributes.target}}{{/if}}"><i class="icon-down-circled2"></i></a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'{{/if}}'+
		'{{/each}}'
	),

	initialize: function(){
		this.listenTo(this.collection, 'reset add change remove', this.render);

		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);		
		this.stopListening();

		app.modalWindow.hide();
		app.preview = false;
	},

	render: function(){
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .preview-close': 'previewClose',
			'click .prev': 'clickPrevious',
			'click .next': 'clickNext'
		});	

		app.modalWindow.show();	
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 37){
			this.keyMove('previous');
		} else if (keyCode == 39){
			this.keyMove('next');
		} else if (keyCode == 27) {
			this.previewClose();
		}
	},

	keyMove: function(direction){
		var current = this.collection.findWhere({preview: true});
		var index = this.collection.indexOf(current);
		if(direction == 'previous'){
			if(index == 0) return;
			this.previous(index);
		} else if(direction == 'next'){
			if(index + 1 == this.collection.length) return;
			this.next(index);
		}
	},

	clickPrevious: function(e){
		var button = $(e.currentTarget);
		var index = button.data('index');

		this.previous(index);
	},

	clickNext: function(e){
		var button = $(e.currentTarget);
		var index = button.data('index');

		this.next(index);
	},

	previous: function(index){
		var prev = index - 1;

		this.collection.models[index].set({preview:false});
		this.collection.models[prev].set({preview:true})
	},

	next: function(index){
		var next = index + 1;

		this.collection.models[index].set({preview:false});
		this.collection.models[next].set({preview:true})
	},

	previewClose: function(){
		this.collection.forEach(function(model, index) {
		    model.unset('preview',{silent: true});
		});
		
		this.close();
	}
});;var ProfileView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Manage Your Profile</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app profile" style="{{fullHeightPage}}">' +
			'<form id="form-profile-details">'+	
                '<h3>Your Details</h3>'+			
				'<div class="profile-input-wrap">'+
					'<label for="first-name">First Name</label>'+
					'<input id="first-name" name="firstName" type="text" placeholder="{{attributes.firstName}}" />'+
				'</div>'+
				'<div class="profile-input-wrap">'+
					'<label for="last-name">Last Name</label>'+
					'<input id="last-name" name="lastName" type="text" placeholder="{{attributes.lastName}}" />'+
				'</div>'+
				'<div class="profile-input-wrap">'+
					'<label for="email-address">Email Address</label>'+
					'<input id="email-address" name="emailAddress" type="email" placeholder="{{attributes.emailAddress}}" />'+
					'<h4 class="profile-tooltip">A validation link will be sent to your email address for verification.</h4>'+
                    '<div class="in-use-marker">'+
                        '<div class="vrf-cir">'+
                            '<i class="icon-cancel"></i>'+
                        '</div>'+
                    '</div>'+
				'</div>'+
				'<button type="button">Update</button>'+
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn">Cancel</a>' +
				'<div class="response">'+
					'<h3>Your profile was succesfully updated</h3>'+
				'</div>'+
			'</form>'+
			'<h3>Update Password</h3>'+
			'<form id="form-profile-password">'+
                '<div class="profile-input-wrap">'+
    				'<input class="current-password" type="password" placeholder="Current Password" />'+
                    '<div class="validated-marker">'+
                        '<div class="vrf-cir ok">'+
                            '<i class="icon-ok-1"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'+    
                '<div class="profile-input-wrap">'+
				    '<input class="new-password" type="password" placeholder="New Password" disabled />'+
                    '<div class="validated-marker">'+
                        '<div class="vrf-cir vrf-count">8</div>'+
                    '</div>'+
                '</div>'+
                '<div class="profile-input-wrap">'+
				    '<input class="repeat-password" type="password" placeholder="Repeat Password" disabled />'+
                    '<div class="validated-marker">'+
                        '<div class="vrf-cir ok">'+
                            '<i class="icon-ok-1"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
				'<button type="button">Update</button>'+
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn">Cancel</a>' +
				'<div class="response">'+
					'<h3>Your password has been updated</h3>'+
				'</div>'+
			'</form>'+
            '<div class="profile-avatar">'+
                '<h3>Avatar</h3>'+                    
                '<div id="avatar-drop">'+
                    '<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" />'+
                '</div>'+
                '<h4 class="profile-avatar-prompt">Drag and drop image onto area above to update.</h4>'+ 
                '<a class="update-avatar-link">Add image from file</a>'+
                '<input type="file" id="filesInput" name="files" />'+
                '<div id="canvas-wrap"></div>'+
            '</div>'+
            '<div class="email-notifications">'+
                '<h3>Email Notifications</h3>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>Ticket Emails</label>'+
                '</div>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>System Emails</label>'+
                '</div>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>Houston Newsletter</label>'+
                '</div>'+
            '</div>'+
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, 'add change', this.render);	

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);

        this.selection.prototype.draw = function(view){
            view.ctx.strokeStyle = '#000';
            view.ctx.lineWidth = 2;
            view.ctx.strokeRect(this.x, this.y, this.w, this.h);

            // draw part of original image
            if (this.w > 0 && this.h > 0) {
                view.ctx.drawImage(view.image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
            }

            // draw resize cubes
            view.ctx.fillStyle = '#fff';
            view.ctx.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
            view.ctx.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
            view.ctx.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
            view.ctx.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);
        };
	},

	onClose: function(){
        $(document).unbind('keydown', this.keyEvent);
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template(this.model));

		this.delegateEvents({
            'input input': 'markAsChanged',
			'click .update-avatar-link': 'fileDialogTrigger',
			'change #filesInput': 'handleFileSelect',
			'dragover #avatar-drop': 'handleDragOver',
			'dragleave #avatar-drop': 'handleDragLeave',
			'drop #avatar-drop': 'handleDragFileSelect',
			'click .toggle-button-outer': 'toggleEmails',
            'click .preview-close': 'previewClose',
            'mousemove #panel': 'canvasMousemove',
            'mousedown #panel': 'canvasMousedown',
            'mouseup #panel': 'canvasMouseup',
            'click .crop': 'getResults',
            'click .grayscale': 'grayscaleHandler',

            'click #form-profile-details button': 'updateDetails',
            'click #form-profile-details .cancel-btn': 'cancelUpdateDetails',
            'input input[type=email]': 'validateEmail',

            'input .current-password': 'validatePassword',
            'focus .new-password': 'passwordCounterReveal',
            'blur .new-password': 'passwordCounterHide',
            'input .new-password': 'newPasswordCount',
            'input .repeat-password': 'confirmPassword',
            'click #form-profile-password button': 'updatePassword',
            'click #form-profile-password .cancel-btn': 'cancelUpdatePassword'
        });

		return this;
	},

    cancelUpdatePassword: function(){
        var inputs = this.$el.find('#form-profile-password input');

        inputs.each(function(){
            var input = $(this);
            input.val('');
            input.closest('div').removeClass('validated-input-resize');

            if(input.hasClass('current-password')){
                input.attr('disabled', false);
            } else {
                input.attr('disabled', true);
            }
        });

    },

    updatePassword: function(evt){
        var currentPassword = this.$el.find('.current-password').val();
        var newPassword =  this.$el.find('.new-password').val();
        var repeatPassword = this.$el.find('.repeat-password').val();

        if(!currentPassword || !newPassword || !repeatPassword){
            return;
            
        } else if(currentPassword && newPassword === repeatPassword){
            var request = $.ajax({
                url: '/api/user/update/password',
                method: 'POST',
                data: { 
                    currentPassword: currentPassword,
                    newPassword: newPassword   
                },
                dataType: 'json'
            });

            request.done(function( msg ) {
                this.$el.find('#form-profile-password .response').addClass('text-animate').find('h3').text('Your password has been updated');
            });

            request.fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });

        } else {
            this.cancelUpdatePassword();
            this.$el.find('#form-profile-password .response').addClass('text-animate').find('h3').text('Submission failed, please try again');
        }
    },

    confirmPassword: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();
        var firstValue = this.$el.find('.new-password').val();
        var div = input.closest('div');

        if(value == firstValue){
            div.addClass('validated-input-resize')
        } else {
            div.removeClass('validated-input-resize');
        }
    },

    passwordCounterReveal: function(evt){
        var div = $(evt.currentTarget).closest('div');
        div.addClass('validated-input-resize');
    },

    passwordCounterHide: function(evt){
        var input = $(evt.currentTarget);
        var div = input.closest('div');

        if(!div.find('.vrf-cir').hasClass('ok')){
            div.removeClass('validated-input-resize');
        }
    },

    newPasswordCount: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();
        var length = value.length;
        var regVrf = input.closest('div');
        var counter = regVrf.find('.vrf-cir');
        var counterValue = 8;
        var nextInput = this.$el.find('.repeat-password');

        // Remove repeat passwords validation if new password is altered
        if(value !== nextInput.val()){
            nextInput.closest('div').removeClass('validated-input-resize');
            nextInput.attr('disabled', true);
        }

        if(length < 8){
            counter.text(counterValue - length);
            counter.removeClass('ok');
            regVrf.find('.vrf-cir').fadeIn();
            nextInput.attr('disabled', true);

        } else {
            counter.html('<i class="icon-ok-1"></i>');
            counter.addClass('ok');
            nextInput.attr('disabled', false);
        }
    },    

    validatePassword: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();

        if(value.length <= 7) {
            input.closest('div').removeClass('validated-input-resize');
        } else if (value.length > 7){
            var request = $.get('/api/check/password?password=' + value);
            
            request.done(function(msg) {
                var div = input.closest('div');
                div.addClass('validated-input-resize');
                input.attr('disabled', true);
                div.closest('form').find('.new-password').attr('disabled', false);
            });
             
            request.fail(function(jqXHR, textStatus) {
                input.closest('div').removeClass('validated-input-resize');
            });
        }
    },

    updateDetails: function(evt){
        var updated = false;
        var form = $(evt.currentTarget).closest('form');
        var inputs = form.find('input'); 

        inputs.each(function(){
            var input = $(this);
            var value = input.val();

            if(!input.hasClass('error') && value){
                var name = input.attr('name');
                app.user.set(name, value);
                updated = true;
            }
        });

        if(updated){
            this.model.save(this.model.attributes,{
                success: _.bind(function(model){
                    this.$el.find('#form-profile-details .response').addClass('text-animate');
                    app.changed = false;
                }, this)
            });
        }
    },

    cancelUpdateDetails: function(evt){
        var form = $(evt.currentTarget).closest('form');
        form.find('.validated-input-resize').removeClass('validated-input-resize');
        var inputs = form.find('input'); 

        inputs.each(function(){
            var input = $(this);
            input.val('');
            input.removeClass('error');
        });
    },

    validateEmail: function(evt){
        var input = $(evt.currentTarget);

        houston.validateAndApproveEmail(input,this.validateEmailSuccess, this.validateEmailFail);
    },

    validateEmailSuccess: function(input){
        input.closest('div').removeClass('validated-input-resize');
    },

    validateEmailFail: function(input){
        var div = input.closest('div');
        div.addClass('validated-input-resize');      
    },

    keyEvent: function(e){
        var keyCode = e.which;
        if (keyCode == 27) {
            this.previewClose();
        }
    },

	fileDialogTrigger: function(){
		this.$el.find('#filesInput').trigger('click');
	},

	handleFileSelect: function(evt) {
		this.addAvatar(evt.target.files[0]);
	},

	handleDragFileSelect: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();

	    $(evt.currentTarget).removeClass('drop-highlight');
	    this.addAvatar(evt.dataTransfer.files[0]);
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

    toggleEmails: function(evt){
        $(evt.currentTarget).toggleClass('on');
    },   

    previewClose: function(){
        $('#canvas-wrap').html('').removeClass('active, max-height-canvas-image');
    }, 

	addAvatar: function(file){
		var reader = new FileReader();

	    reader.onloadend = _.bind((function(theFile) {
	        return function(e) {
                this.addImageToCanvas(e.target.result);
	        };
        })(file), this);

        reader.readAsDataURL(file);
	}, 

    grayscaleImage: false,
    grayscaleHandler: function(evt){
        $(evt.currentTarget).toggleClass('gray');

        if(!this.grayscaleImage){
            this.grayscaleImage = true;
        } else {
            this.grayscaleImage = false;
        }

        this.drawScene();
    },

    makeGrayscale: function(canvasContext) {
        var imgData = canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var pixels  = imgData.data;
            for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale;	// Red
            pixels[i+1] = grayscale;	// Green
            pixels[i+2] = grayscale;	// Blue
            //pixels[i+3] is alpha
        }

        // Redraw the image in black & white
        canvasContext.putImageData(imgData, 0, 0);
    },    

	canvas: null, 
	image: null,
	iMouseX: null,
	iMouseY: 1,
	theSelection: null,

    addImageToCanvas: function(imgSrc){
        // Create image object and pass it uploaded data
        this.image = new Image();
        this.image.src = imgSrc;
        var originalWidth = this.image.width;
        var originalHeight = this.image.height;
        var maxWidth = $(window).width() - 40;
        var maxHeight = $(window).height() - 70;

        // If image too tall give modal warning
        if(originalHeight > maxHeight) {
            houston.createModal({type: 'Error', message: 'The image you are attempting to add is of an unusable ratio.'});

            return;
        } 

        // If image too wide then resize
        if(originalWidth > maxWidth) {
            var imageWidth = maxWidth;
            var widthDifference = originalWidth - imageWidth;
            var percentageDecrease = widthDifference / (originalWidth / 100);
            var imageHeight = originalHeight - ((originalHeight / 100) * percentageDecrease);

            this.image.width = imageWidth;
            this.image.height = imageHeight;


            // Draw resized image onto temporary canvas and set that to this.image
            var temp_ctx, temp_canvas;
            temp_canvas = document.createElement('canvas');
            temp_ctx = temp_canvas.getContext('2d');
            temp_canvas.width = imageWidth;
            temp_canvas.height = imageHeight;
            temp_ctx.drawImage(this.image, 0, 0, originalWidth, originalHeight, 0, 0, imageWidth, imageHeight);
            this.image.src = temp_canvas.toDataURL();
            
        } 

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        $(this.canvas).attr({'width': this.image.width, 'height': this.image.height, id: 'panel'});

        $('#canvas-wrap').html(
            '<div class="canvas-blackout-bg"></div>'+
            '<div class="canvas-window-inner">'+
                '<div class="preview-wrap">'+
                    '<div class="preview-img-wrap">'+
                        '<i class="preview-close icon-cancel-circled"></i>'+
                        '<div class="preview-img-box">'+
                            '<div class="canvas">'+
                            '</div>'+
                        '<button class="crop">Crop and Save</button>'+
                        '<button class="grayscale"><span class="g">Grayscale</span><span class="c">Colour</span></button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
        $('.canvas').html(this.canvas)

        $('#canvas-wrap').addClass('active');

        // create initial selection
        this.theSelection = new this.selection(200, 200, 200, 200);

        this.drawScene();
    },    

    // define Selection constructor
    selection: function(x, y, w, h){
        this.x = x; // initial positions
        this.y = y;
        this.w = w; // and size
        this.h = h;

        this.px = x; // extra variables to dragging calculations
        this.py = y;

        this.csize = 6; // resize cubes size
        this.csizeh = 10; // resize cubes size (on hover)

        this.bHow = [false, false, false, false]; // hover statuses
        this.iCSize = [this.csize, this.csize, this.csize, this.csize]; // resize cubes sizes
        this.bDrag = [false, false, false, false]; // drag statuses
        this.bDragAll = false; // drag whole selection
    },

    drawScene: function() { // main drawScene function
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // clear canvas

        // draw source image
        this.ctx.drawImage(this.image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // and make it darker
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // draw selection
        this.theSelection.draw(this);

        // add greyscale effect if selected
        if(this.grayscaleImage) this.makeGrayscale(this.ctx);
    },

    canvasMousemove: function(e) {
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        // In case of drag of whole selector
        if (this.theSelection.bDragAll) {
            this.theSelection.x = this.iMouseX - this.theSelection.px;
            this.theSelection.y = this.iMouseY - this.theSelection.py;
        }

        for (i = 0; i < 4; i++) {
            this.theSelection.bHow[i] = false;
            this.theSelection.iCSize[i] = this.theSelection.csize;
        }

        // Hovering over resize cubes
        if (this.iMouseX > this.theSelection.x - this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y - this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.csizeh) {

            this.theSelection.bHow[0] = true;
            this.theSelection.iCSize[0] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x + this.theSelection.w-this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.w + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y - this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.csizeh) {

            this.theSelection.bHow[1] = true;
            this.theSelection.iCSize[1] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x + this.theSelection.w-this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.w + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.h-this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.h + this.theSelection.csizeh) {

            this.theSelection.bHow[2] = true;
            this.theSelection.iCSize[2] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x - this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.h-this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.h + this.theSelection.csizeh) {

            this.theSelection.bHow[3] = true;
            this.theSelection.iCSize[3] = this.theSelection.csizeh;
        }

        // In case of dragging of resize cubes
        var iFW, iFH;
        if (this.theSelection.bDrag[0]) {
            var iFX = this.iMouseX - this.theSelection.px;
            var iFY = this.iMouseY - this.theSelection.py;
            iFW = this.theSelection.w + this.theSelection.x - iFX;
            iFH = this.theSelection.h + this.theSelection.y - iFY;
            // iFH = this.theSelection.h + this.theSelection.x - iFX;
        }
        if (this.theSelection.bDrag[1]) {
            var iFX = this.theSelection.x;
            var iFY = this.iMouseY - this.theSelection.py;
            iFW = this.iMouseX - this.theSelection.px - iFX;
            iFH = this.theSelection.h + this.theSelection.y - iFY;
        }
        if (this.theSelection.bDrag[2]) {
            var iFX = this.theSelection.x;
            var iFY = this.theSelection.y;
            iFW = this.iMouseX - this.theSelection.px - iFX;
            iFH = this.iMouseY - this.theSelection.py - iFY;
        }
        if (this.theSelection.bDrag[3]) {
            var iFX = this.iMouseX - this.theSelection.px;
            var iFY = this.theSelection.y;
            iFW = this.theSelection.w + this.theSelection.x - iFX;
            iFH = this.iMouseY - this.theSelection.py - iFY;
        }

        if (iFW > this.theSelection.csizeh * 2 && iFH > this.theSelection.csizeh * 2) {
            this.theSelection.w = iFW;
            this.theSelection.h = iFH;

            this.theSelection.x = iFX;
            this.theSelection.y = iFY;
        }

        this.drawScene();
    },

    canvasMousedown: function(e) {
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        this.theSelection.px = this.iMouseX - this.theSelection.x;
        this.theSelection.py = this.iMouseY - this.theSelection.y;

        if (this.theSelection.bHow[0]) {
            console.log('0');
            this.theSelection.px = this.iMouseX - this.theSelection.x;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[1]) {
            console.log('1');
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[2]) {
            console.log('2');
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y - this.theSelection.h;
        }
        if (this.theSelection.bHow[3]) {
            console.log('3');
            this.theSelection.px = this.iMouseX - this.theSelection.x;
            this.theSelection.py = this.iMouseY - this.theSelection.y - this.theSelection.h;
        }
        
        if (this.iMouseX > this.theSelection.x + this.theSelection.csizeh && this.iMouseX < this.theSelection.x+this.theSelection.w - this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.csizeh && this.iMouseY < this.theSelection.y+this.theSelection.h - this.theSelection.csizeh) {

            this.theSelection.bDragAll = true;
        }

        for (i = 0; i < 4; i++) {
            if (this.theSelection.bHow[i]) {
                this.theSelection.bDrag[i] = true;
            }
        }
    },

    canvasMouseup: function(e) {
        this.theSelection.bDragAll = false;

        for (i = 0; i < 4; i++) {
            this.theSelection.bDrag[i] = false;
        }
        
        this.theSelection.px = 0;
        this.theSelection.py = 0;
    },

    getResults: function() {
        var temp_ctx, temp_canvas;
        temp_canvas = document.createElement('canvas');
        temp_ctx = temp_canvas.getContext('2d');
        temp_canvas.width = this.theSelection.w;
        temp_canvas.height = this.theSelection.h;
        temp_ctx.drawImage(this.image, this.theSelection.x, this.theSelection.y, this.theSelection.w, this.theSelection.h, 0, 0, this.theSelection.w, this.theSelection.h);
        
        // Add grayscale effect if selected 
        if(this.grayscaleImage)this.makeGrayscale(temp_ctx);
        var vData = temp_canvas.toDataURL();

        this.model.set('avatar', vData);
        this.model.save(this.model.attributes);

        this.previewClose();
    }
});;var TicketHeaderView = Backbone.View.extend({
	className: 'box-app-top msg-top',
	agentTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'{{generateDropSwitch attributes.status}}'+					
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct"><span>{{getUserName attributes.agent}}</span><i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="dropdown droplist">'+
				'<div class="drop-top rounded">'+
					'<div class="btn in-progress drop-slct">Awaiting Agent<i class="icon-down-dir-1"></i></div>'+
				'</div>'+						
				'<ul class="drop">'+
					'{{populateAgentDropdown}}'+
				'</ul>'+
			'</div>'+
		'{{/if}}'
	),

	userTemplate: Handlebars.compile(
		'<h2>Ticket #{{attributes.reference}}</h2>'+
		'{{#if attributes.agent}}'+
			'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>'+
			'<div class="btn ticketheader-agent">{{getUserName attributes.agent}}</div>'+
		'{{else}}'+
			'<div class="btn new">New</div>'+
			'<div class="btn on-hold">Awaiting Agent</div>'+
		'{{/if}}'
	),

	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);
	},

	onClose: function(){
		this.stopListening();
	},

	render: function (){
		if(app.user.attributes.role === 'USER'){
			this.$el.html(this.userTemplate(this.model));
		} else {
			this.$el.html(this.agentTemplate(this.model));
		}

		return this;
	}
});;var TicketsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">'+
					'<h2>Open Tickets</h2>'+
					'<a href="/tickets/new" class="btn">New Ticket</a>'+
				'</div>'+
				
				'<div class="box-app-nav">'+
					'<div class="helper">'+
						'<div class="box-app-nav-inner">'+
							'<div class="sort">'+
								'<a class="sortByDate">Sort By Date {{dateArrow}}</a>'+
								'<a class="sortByCompany mid-link">Sort By Company {{companyArrow}}</a>'+
							'</div>'+
							'<div class="filter">'+
								
								'<a class="allTickets">All<span> Tickets</span></a>'+
								'<a class="updatedTickets">Updated<span> Tickets</span></a>'+
								'<a class="myTickets"><span class="mine">Mine</span><span>My Tickets</span></a>'+
								'<a class="completedTickets">Completed<span> Tickets</span></a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app tickets-box-app" style="{{fullHeightPage}}">'+
			'<ul id="ticket-stream">'+
			'{{#if models}}'+
			'{{#each models}}'+
				'<li class="ticket">'+
					'<a href="/tickets/{{attributes.id}}">'+
						'<div class="update-alert {{updateCheck attributes.updated}}"></div>'+
						'<div class="ticket-info">'+					
							'<div class="date">{{convertToDate attributes.date}}</div>'+
							'<div class="ticket-info-inner">'+
								'<div class="name">{{getUserName attributes.authorID}}</div>'+
								'<div class="company-name">{{getCompanyName attributes.authorID}}</div>'+
								'<div class="summary"><span>#{{attributes.reference}}</span> {{attributes.subject}}</div>'+
							'</div>'+
						'</div>'+
						'<div class="ticket-status">'+
							'<div class="btn {{convertToClass attributes.status}}">{{attributes.status}}</div>'+
							'{{#if attributes.agent}}'+
								'<div class="ticket-agent">{{getUserName attributes.agent}}</div>'+
							'{{else}}'+
								'<div class="ticket-agent">Awaiting Agent</div>'+
							'{{/if}}'+								
						'</div>' +
					'</a>'+
				'</li>'+
			'{{/each}}'+
			'{{else}}'+
			'<h4 class="no-tickets">No tickets to display</h4>'+
			'{{/if}}'+					
			'</ul>' +
			'<div class="loader">'+
			'<div class="otloader"></div>'+
			'</div>'+
		'</div>' 
	),
	
	initialize: function() {	
		this.listenTo(this.collection, 'reset add remove change sort sync', this.render);		
	},

	onClose: function(){
		this.stopListening();
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		
		this.delegateEvents({
			'click .sortByDate': 'sortByDate',
			'click .sortByCompany': 'sortByCompany',
			'click .myTickets': 'byAgent',
			'click .completedTickets': 'byCompleted',
			'click .updatedTickets': 'updated',
			'click .allTickets': 'all'
		});

		return this;		
	},
	
	all: function(){
		this.collection.reset(app.tickets.allTickets());
	},

	updated: function(){
		this.collection.reset(app.tickets.updatedTickets());
	},
	
	byAgent: function(){
		this.collection.reset(app.tickets.byAgent());
	},
	
	byCompleted: function(){
		this.collection.reset(app.tickets.byCompleted());	
	},
	
	sortByDate: function(){
		app.tickets.byDate();	
	},
	
	sortByCompany: function(){
		app.tickets.byCompany();
	}		
});;var TicketDetailView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+

			'</div>'+
		'</div>'+			
		'<ul id="msg-stream" class="box-app" style="{{fullHeightPage}}">'+		
			'<li class="msg from-{{getUserRoleAsClass attributes.authorID}}">'+
				'<div class="msg-dtl">'+
					'<img class="avatar" src="{{getUserAvatar attributes.authorID}}" alt="{{getUserName attributes.authorID}}"/>'+
					'<div class="msg-dtl-inr">'+
						'<h3 class="msg-agent">{{getUserName attributes.authorID}}</h3>'+
						'<h4 class="msg-company">{{getCompanyName attributes.authorID}}</h4>'+
						'<div class="msg-date">{{convertToDateTime attributes.date}}</div>'+
					'</div>'+
					'<div class="msg-tri"></div>'+
				'</div>'+
				'<div class="msg-body">'+					
					'<div class="msg-subject">'+
						'<h5>{{attributes.subject}}</h5>'+	
						'<span>Ticket #{{attributes.reference}}</span>'+						
					'</div>'+
					'<div>'+
						'{{attributes.message}}'+							
					'</div>'+						
					'<ul class="files">'+
					'{{#each attributes.files}}'+
						'<li class="file">'+
							'<div class="file-text">'+
				  				'<div class="file-icon">'+
				  					'<span>'+
				  					'{{#if type}}'+
				  					'{{formatFileType type}}'+
				  					'{{else}}'+
				  					'FILE'+
				  					'{{/if}}'+
				  					'</span>'+
				  				'</div>'+
				  				'<div class="file-info">'+
									'<div class="filename">{{name}}</div>'+
									'{{showFilePreviewLink type @index}}'+
									'<a data-bypass="true" href="http://' + window.location.hostname + '/api/tickets/file/{{ref}}">Download</a>'+
								'</div>'+
							'</div>'+
						'</li>'+	
					'{{/each}}'+
					'</ul>'+
					'{{downloadTicketAttachments attributes.files}}'+
				'{{#if messagesCollection.length}}'+
					'</div>'+											
				'{{else}}'+
				'<a class="btn reply-btn">Reply</a>'+
				'</div>'+
				'<div class="reply">'+
					'<form id="form-reply">' +
						'<textarea class="required" name="new-textarea" placeholder="Please add your comments here..."></textarea>' +		
						'<div id="file-upload-view-wrap">'+	

						'</div>'+
						'{{outputMarkAsCompleted}}'+
						'<div class="reply-submit-buttons">'+
							'<button class="add-message" type="button">Submit</button>'+
							'<div class="beige or">or</div>'+
							'<a class="cancel-btn ib">Cancel</a>'+
						'</div>'+
					'</form>'+
				'</div>'+					
				'{{/if}}'+						
			'</li>'+
			'<div id="messages-wrap">'+

			'</div>'+	
		'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model.messagesCollection, 'sync', this.render);

		this.ticketHeaderView = new TicketHeaderView({model: this.model});
		this.ticketHeaderView.parent = this;

		this.messagesView = new MessagesView({collection: this.model.messagesCollection});
		this.messagesView.parent = this;	
	},

	onClose: function(){
		this.ticketHeaderView.close();
		this.messagesView.close();
	},
	
	render: function (){	
		this.$el.html(this.template(this.model));

		app.files.reset();

		this.$('.box-app-fixed-inner').append(this.ticketHeaderView.$el);
		this.ticketHeaderView.render();

		this.$('#messages-wrap').append(this.messagesView.$el);
		this.messagesView.render();		

		//Add user to updated array if not already there
		if(!houston.updateCheck(this.model.get('updated'))){
			this.updateSeen();
		}

		this.delegateEvents({
			'click .drop-slct': 'dropSelect',
			'click .dropdown li': 'dropDown',
			'click .reply-btn': 'replyToggle',
			'click .cancel-btn': 'replyToggle',
			'click .add-message': 'addMessage',
			'click .file-preview': 'filePreview',
			'input textarea': 'markAsChanged'
		});

		return this;
	},
		
	dropSelect: function(e){
		houston.dropSelect(e.currentTarget);		
	},
	
	dropDown: function(e){
		var changed = houston.dropDown(e.currentTarget);

		if(changed.param == 'status') {
			this.model.set({
				status: changed.value
			});
		} else {
			this.model.set({
				agent: changed.value
			});
			
			//If setting agent for the first time add status of in progress
			var currentStatus = this.model.get('status');
			
			if(currentStatus == 'New'){
				this.model.set({
					status: 'In Progress'
				});
			}			
		}

		this.saveModel();
	},
	
	replyToggle: function(){
		houston.replyToggle(this.$el);
	},
	
	updateSeen: function() {
		this.model.set({			
			updated: this.model.get('updated').concat(app.user.id)
		});

		this.model.save(this.model.attributes);	
	},
	
	saveModel: function(){
		//Set updated attribute to empty array
		this.model.set({			
			updated: [app.user.id]
		});

		this.model.save(this.model.attributes);	
	},
	
	addMessage: function(e){
		if(!houston.validateForm(e.currentTarget)) return;

		//If ticket marked as complete
		if(this.$el.find('input[name="ticket-completed"]').prop('checked')){
			this.model.set({
				status: 'Completed'
			});		
		}
		
		var attributes = {
			'authorID': app.user.id,
			'message': this.$el.find('textarea[name="new-textarea"]').val(),
			'files': app.files.createFilesArray()
		};

		this.model.messagesCollection.create(
			attributes, 
			{
				wait:true,
				success: function(){
					app.changed = false;
					console.log('success');
				}
			}
		);

		this.saveModel();
	},

	filePreview: function(e){
		var button = $(e.currentTarget);
		var index = button.data("index");
		//If a reply get the reference of the reply
		var ul = button.closest('ul');
		
		if (ul.data("reply")){
			var messageRef = ul.data("reply");
			app.files.createImagesCollectionFromArray(this.model.messagesCollection.get(messageRef).attributes.files);
		} else {
			app.files.createImagesCollectionFromArray(this.model.attributes.files);
		}

		app.files.filesPreviewCollection.models[index].set({preview:true});

		app.preview = new PreviewWindow({collection: app.files.filesPreviewCollection});

		app.preview.render();
		app.modalWindow.html(app.preview.$el);
	}	
});;var UsersView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h4 class="client-has-no-users">This client currently has no users</h4>'
	),

	initialize: function(){
		this.listenTo(this.collection, 'add change remove', this.render);
		_.bindAll(this, 'renderUser');
	},

	onClose: function(){
		this.stopListening();

		this.collection.each(function(model){
			model.modelView.close();
		});
	},

	renderUser: function(model) {
		model.modelView = new UserView({model: model});
		model.modelView.parent = this;

		this.parent.$el.find('.client-user-stream').append(model.modelView.$el);
		model.modelView.render();	
	},

	render: function(){
		this.parent.$el.find('.client-user-stream').html(''); //clear out existing userViews

		if(this.collection.length == 0){
			this.parent.$el.find('.client-user-stream').html(this.template);
		} else {
			this.collection.each(this.renderUser);
		}
		
		return this;
	}
});;var UserView = Backbone.View.extend({
	tagName: 'li',
	className: 'person',
	template: Handlebars.compile(
		'<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{attributes.firstName}} {{attributes.lastName}}" />'+
		'<h3>{{#if attributes.firstName}}{{attributes.firstName}} {{attributes.lastName}}{{else}}{{attributes.emailAddress}}{{/if}}</h3>'+
		'{{#ifCond attributes.verify true}}'+
			'<h4>{{getCompanyName id}} {{convertUserRole attributes.role}}</h4>'+
		'{{else}}'+
			'<h4>Awaiting Verification</h4>'+
			'<a class="resend-verification">Resend</a> '+
		'{{/ifCond}}'+
		'<a class="delete-user">Delete</a>'
	),

	onClose: function(){
		this.stopListening();
	},

	render: function(){
		this.$el.html(this.template(this.model));

		this.delegateEvents({
			'click .delete-user': 'deleteUser'
		});

		return this;
	},

	deleteUser: function(){
		var theModel = this.model
		var attributes = theModel.attributes;
		var name;

		if(attributes.firstName){
			name = attributes.firstName + ' ' + attributes.lastName;
		} else {
			name = attributes.emailAddress;
		}
		
		houston.createModal({type: 'Warning', message: 'Are you sure you would like to delete ' + name +'?', cancel: true},
	    	function(){
	    		theModel.destroy({wait:true});		    				
			}
	    );		
	}
});;Backbone.View.prototype.markAsChanged = function () {
	app.changed = Backbone.history.fragment;
};

Backbone.View.prototype.close = function(){
	this.remove();
	
	this.unbind();
	
	if(this.onClose){
		this.onClose();
	}
};;var AppRouter = Backbone.Router.extend({
	root: '/',
	routes: {
		'': 'indexFrontController',
		'tickets/new': 'ticketFormFrontController',
		'tickets/:ticket': 'ticketDetailsFrontController',
		'people': 'peopleOverviewFrontController',
		'profile': 'profileFrontController',
		'account': 'accountMainFrontController',
		'*notFound': 'indexFrontController'
	},

	initialize: function() {
		$.ajaxSetup({
			timeout: 0
		});
		
		// Add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for File API support
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
			console.warn('The File API is not fully supported by this browser');
		}

		this.user = new UserModel();
		this.users = new Users();
		this.tickets = new Tickets();
		this.ticketDetailModel = new TicketDetailModel();
		this.agentsCollection =  new Agents();
		this.clients = new Clients();
		this.files = new Files();

		this.fetchData();
	},

	fetchData: function(callback){
		$.when(this.user.fetch({reset:true}), this.users.fetch({reset:true}), this.tickets.fetch({reset:true}))
		.done(function(){
			app.fetchClients(callback)
		});
	},

	fetchUsers: function(callback){
		$.when(this.users.fetch({reset:true}))
		.done(function(){
			app.fetchClients(callback)
		});				
	},

	fetchClients: function(callback){
		$.when(app.clients.fetch({reset:true}))
		.done(function(){
			app.users.addUsersToClient();
			if(!app.currentView){
				app.initializeSuccess();
			} else if(callback){
				callback();
			}
		});
	},

	initializeSuccess: function(){
		app.setUpSocket();
		app.startHistory();
	},

	fetchError: function(a,b,c){
		console.log(a);
	},

	setUpSocket: function(){
		// Connect to namespaced socket using company ID
		var socket = io('http://houstonsupportdesk.com:3000/'+app.user.attributes.companyID);
		
		// On receiving a notify event display the notification popup
		socket.on('notify', function(data){	
			$('#notice span').html(data);
			$('#notice').fadeIn(1000, function(){ $(this).delay(5000).fadeOut(1000) });
			socket.emit('response', 'success');

			app.fetchData();
		});
	},

	startHistory: function() {
		handlebarsHelpers.bindHelpers();
		events.bindEvents();
		this.modalWindow = $('#modal-window');
		this.appElement = $('#app');
		this.updateElem = $('update-alert');
		this.tickets.countUpdated();

		$(function(){ Backbone.history.start({ pushState: true, root: app.root })});		
	},
	
 	currentView: false,
	showView: function(view) {
		if(this.currentView) this.currentView.close();
		this.currentView = view;
		this.appElement.html(this.currentView.render().el);
	},

	// Define controllers
	indexFrontController: function() {
		var ticketsView = new TicketsView({collection: this.tickets.filtered});
		this.showView(ticketsView);
	},

	ticketDetailsFrontController: function(ticket) {
		this.ticketDetailModel.messagesCollection.url = '/api/tickets/reply/' + ticket;
		this.ticketDetailModel.set(this.tickets.get(ticket).attributes);
		$.when(this.ticketDetailModel.messagesCollection.fetch({reset: true}))
		.done(function(){
			var ticketDetailView = new TicketDetailView({model: app.ticketDetailModel});
			app.showView(ticketDetailView);
		});
	},

	ticketFormFrontController: function() {
		var formView = new FormView({model: new TicketModel()});
		this.showView(formView);
	},
	
	peopleOverviewFrontController: function() {
		if(!app.currentView) {
			this.createAndShowPeopleView();
		} else {
			app.fetchData(this.createAndShowPeopleView);
		}
	},

	createAndShowPeopleView: function(){
		var peopleView = new PeopleView({collection: app.agentsCollection});
		app.showView(peopleView);
	},

	profileFrontController: function() {
		var profileView = new ProfileView({model: this.user});
		this.showView(profileView);
	},
	
	accountMainFrontController: function() {
		var accountView = new AccountView({model: this.user});
		this.showView(accountView);
	},

	modal: false,
	preview: false,

	// Custom Execute Method
	changed: false,
	executeArguments: false,
	execute: function(callback, args, name) {
	    //If nothing has been changed  and no arguments have been set then continue with execute as normal
	    if(!this.changed && !this.executeArguments){
	    	if (callback) callback.apply(this, args);
	    	//Close preview view if exists
	    	if (app.preview) {
	    		app.preview.close();
	    		app.preview = false;
	    	}
	    //If something has been changed and arguments have been previously set by an attempted execute use the arguments
		} else if (!this.changed && this.executeArguments){
			this.executeArguments.callback.apply(this, this.executeArguments.args);
	    	this.executeArguments = false;
	    //If something has changed set the arguments to global variables to be use in the future and create modal
	    } else {
	    	this.executeArguments = {
		    	callback: callback,
		    	args: args,
		    	name: name
		    }
		    
	    	houston.createModal(
	    		{
		    		type: 'Warning', 
					message: 'Any unsaved changes will be lost, would you like to continue?', 
					cancel: true
		    	},
		    	
		    	function(){
					app.changed = false;
					app.execute();
				},
				
				function(){
					app.navigate(app.changed, {trigger: false});
				}
		    );			    
	    }
    }
});

// Session timeout polling (every 5 seconds)
(function timeout() {
	setTimeout(function() {
		$.get('/api/session/check', function(data) {
			var obj = JSON.parse(data);
			
			if(obj.code === 'SESSION_CHECK' && obj.status === 'error') {
				window.location.href = '/logout';
			} else {
				timeout();
			}
		});
	}, 5000);
})();

var app = new AppRouter();
//# sourceMappingURL=ticketapp.js.map