var dataHelper = {

	getUserName: function(userID){
		var user = app.users.get(userID);
		console.log(user);
		var userName = user.attributes.firstName+' '+user.attributes.lastName;
		return userName;
	}
	

	// getCompanyName: function()

	// getAuthorDetails: function(authorRole,authorID,companyID){
	// 	var output = {};
	// 	if(authorRole == 'user'){
	// 		// var company = app.clients.get(companyID);		
	// 		// var author = company.usersCollection.get(authorID).attributes;
	// 		// var companyName = company.attributes.name;
	// 		// if(author.firstName){
	// 		// 	var authorName = author.firstName+' '+author.lastName;		
	// 		// } else {
	// 		// 	var authorName = author.emailAddress;
	// 		// }
	// 	} else {	
	// 		// var author = app.agents.get(authorID);
	// 		// output.authorName = author.attributes.firstName+' '+author.attributes.lastName;
	// 		// output.companyName = app.user.attributes.companyName;			
	// 	}

	// 	return output;
	// }

}


