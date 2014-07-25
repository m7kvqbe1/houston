var houston = {
	convertDate: function(dateTime){
		var monthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'); 
		var date = dateTime.toString();			
		var day = date.substring(8,10);
		var month = date.substring(4,7);
		date = day+' '+month;		
		return date;		
	},
	
	convertToClass: function(attribute){
		return attribute;
	}
}