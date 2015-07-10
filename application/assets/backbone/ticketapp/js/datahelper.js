var dataHelper = {
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
}