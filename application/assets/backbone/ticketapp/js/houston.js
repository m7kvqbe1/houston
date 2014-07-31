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
	}
}