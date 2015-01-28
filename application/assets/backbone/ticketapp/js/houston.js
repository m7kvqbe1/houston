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
		var text = val+'<i class="icon-down-dir-1"></i>';
		var dropdown = item.closest('.dropdown');
			
		dropdown.find('.drop-slct').removeClass('on-hold in-progress').addClass(css).html(text);

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
		}else {
			output = {param: 'agent', value: val};
		}
		
		return output;
	},

	generateDropSwitch: function(attribute){
		if(attribute === 'In Progress') {
			return '<div class="dropdown dropswitch">'+
						'<div class="drop-inner">'+				
							'<div class="drop-top on-hold rounded">'+
								'<div class="btn in-progress drop-slct">In Progress<i class="icon-down-dir-1"></i></div>'+
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
								'<div class="btn on-hold drop-slct">On Hold<i class="icon-down-dir-1"></i></div>'+
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
		var scroll = view.closest(document).scrollTop()+ 195;
		view.closest("html, body").animate({ scrollTop: scroll });
	},

	updateCheck: function(arr){
		var updateSeen = false;
		var i;
		for (i = 0; i < arr.length; ++i) {
			//could use app.user.id
			if(arr[i] == app.user.attributes.id) {					
				updateSeen = true;
			}
		}
		return updateSeen;
	},

	// populateAgentDropdown: function(){
	// 	// var arr = app.companyModel.attributes.users;
	// 	var arr = app.agents;
	// 	var i;
	// 	var str = '';
	// 	for (i = 0; i < arr.length; ++i) {
	// 		str += '<li>'+arr[i].name+'</li>';
	// 	}
	// 	return str;

	// },

	// populateAgentDropdown: function(){
	// 	// var arr = app.companyModel.attributes.users;
	// 	var arr = app.agents;
	// 	var i;
	// 	var str = '';
	// 	// for (i = 0; i < arr.length; ++i) {
	// 	// 	str += '<li>'+arr[i].name+'</li>';
	// 	// }
	// 	return str;

	// },

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
		var footerHeight = 60;
		var headerHeight = $('header').height() + $('.box-app-fixed').height();
		var idealHeight = windowHeight - footerHeight - headerHeight - 37;
		return idealHeight;
	},

	getUserName: function(userID){
		var userName = app.clients.get('54c7a19fd21a5848693b8942').usersCollection.get('54c7a1b3d21a58a4693b8942').attributes.emailAddress;
		console.log(userName);
		return userName;
	},

	getAuthorDetails: function(authorRole,authorID,companyID){
		if(authorRole == 'user'){
			var company = app.clients.get('54c7a19fd21a5848693b8942');		
			var companyName = company.attributes.name;
			var user = company.usersCollection.get('54c7a1b3d21a58a4693b8942').attributes;
			if(user.firstName){
				return '<div class="name">'+user.firstName+' '+user.lastName+'</div>' +
						'<div class="company-name">'+companyName+'</div>';			
			} else {
				return '<div class="name">'+user.emailAddress+'</div>' +
						'<div class="company-name">'+companyName+'</div>';
			}
		} else {
			var author = app.agents.get('54c79b88d21a58cb683b8941').attributes;
			// console.log(app.user.attributes.id);
			var companyName = app.user.attributes.companyName;
			return '<div class="name">'+author.firstName+' '+author.lastName+'</div>' +
					'<div class="company-name">'+companyName+'</div>';
		}
	}

}

//ONLY SEND DOWN COMPANY NAME IF AN AGENT OR ADMIN?





		// var companyID = app.agents.get(userID).attributes.companyID.$id;
		// var companyID = app.agents.get(userID);
		// console.log(companyID);
		// var companyID = "54bf87b6d21a58b067f47d2e";
		// var companyName = app.peopleView.clientsView.collection.get(companyID).attributes.name;
		// console.log(companyName);