var houston = {
	convertToDate: function(dateObject){
		var monthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'); 
		var date = dateObject.toString();			
		var day = date.substring(8,10);
		var month = date.substring(5,7) -1;
		date = day+' '+monthNames[month];	
		return date;	
	},
	
	convertToClass: function(attribute){
		var cssClass = attribute.toLowerCase().split(' ').join('-');
		return cssClass;
	},
	
	convertToDateTime: function(dateObject){
		var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'); 
		var date = dateObject.toString();			
		var day = date.substring(8,10);
		var month = date.substring(5,7) -1;
		var year = date.substring(0,4);
			
		function ordinal_suffix($num){
			if($num < 11 || $num > 13){
				switch($num % 10){
					case 1: return 'st';
					case 2: return 'nd';
					case 3: return 'rd';
				}
			}
			return 'TH';
		}
					
		var suffix = ordinal_suffix(day);
			
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
		var text = item.text();
		var text = text+'<i class="icon-down-dir-1"></i>';
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
			} else {
				drop.find('li').removeClass('slct');
				item.addClass('slct');
			}				
		});
	},
	
	replyToggle: function(){
		$('.reply').slideToggle();
		var scroll = $(document).scrollTop()+ 195;
		$("html, body").animate({ scrollTop: scroll });
	}
}