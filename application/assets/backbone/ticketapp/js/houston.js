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

	populateAgentDropdown: function(){
		var arr = app.users.filter(function(data){
			return data.get('role') !== 'USER' && data.get('verify') === true;
		});
		console.log(arr);
		var i;
		var str = '';
		for (i = 0; i < arr.length; ++i) {
			str += '<li>'+arr[i].attributes.firstName+' '+arr[i].attributes.lastName+'</li>';
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
		var footerHeight = 60;
		var headerHeight = $('header').height() + $('.box-app-fixed').height();
		var idealHeight = windowHeight - footerHeight - headerHeight - 37;
		return idealHeight;
	}

}
