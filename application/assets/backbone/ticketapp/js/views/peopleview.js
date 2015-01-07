var PeopleView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">'+
					'<h2>Support Agents</h2>'+
					'<a class="btn">New Agent</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app box-people" style="{{fullHeightPage}}">'+
			'<ul id="agent-stream">'+
				'<div class="add-person">'+
					'<form id="form-add-agent">'+
						'<h4>To add a new agent, simply input their email address and Houston will do the rest. Simple!</h4>'+
						'<input type="text" placeholder="New Agent\'s Email Address" />'+
						'<button type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>'+
				'</div>'+	
				'{{#each models}}'+
					'<li class="person">'+
						'{{#if attributes.password}}'+					
							'<img class="avatar" src="{{#if attributes.avatar}}{{avatar}}{{else}}application/assets/img/avatar.png{{/if}}" />'+
							'<h3>{{attributes.firstName}} {{attributes.lastName}}</h3>'+
							'<h4>Support Agent</h4>'+
						'{{else}}'+
							'<img class="avatar" src="application/assets/img/avatar.png" />'+
							'<h3>{{attributes.emailAddress}}</h3>'+
							'<h4>Awaiting Verification</h4>'+
						'{{/if}}'+
					'</li>'+
				'{{/each}}'+
			'</ul>'+
			'<div id="clients-wrap">'+	

			'</div>'+
		'</div>'	
		// '<div class="box-companies-header">'+
		// 	'<h2>Clients</h2>'+
		// 	'<a class="btn">New Client</a>'+
		// '</div>'+
		// '<ul id="company-stream" class="box-app box-companies">'+
		// 	'<div class="add-person">'+
		// 		'<form id="form-add-client">'+
		// 			'<h4>To add a new client, simply add the client\'s name below.</h4>'+
		// 			'<input type="text" placeholder="Clients Name" />'+
		// 			'<button type="button">Submit</button>' +
		// 			'<div class="beige or">or</div>' +
		// 			'<a class="cancel-btn ib">Cancel</a>' +
		// 		'</form>'+
		// 	'</div>'+
		// // '{{#each models}}'+
		// 	'{{#each attributes.clients}}'+
			
		// 	'<li class="company">'+
		// 		'<div class="company-info">'+
		// 			'<h3>{{clientName}}</h3>'+
		// 			'<a>Edit</a>'+
		// 			'<a class="new-client-user">New User</a>'+
		// 		'</div>'+
		// 		'<ul class="client-stream">'+
		// 		'<div class="add-person">'+
		// 			'<form id="form-add-client-user">'+
		// 				'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
		// 				'<input type="text" placeholder="Clients Name" />'+
		// 				'<button type="button">Submit</button>' +
		// 				'<div class="beige or">or</div>' +
		// 				'<a class="cancel-btn ib">Cancel</a>' +
		// 			'</form>'+
		// 		'</div>'+
		// 		'{{#each clientUsers}}'+
		// 			'<li class="person">'+
		// 				'<img class="avatar" src="{{avatar}}" />'+
		// 				'<h3>{{name}}</h3>'+
		// 				'<h4>{{position}}</h4>'+
		// 			'</li>'+
		// 		'{{/each}}'+
		// 		'</ul>'+					
		// 	'</li>'+
			
		// '{{/each}}'+	
		// '</ul>'+
		
	),
	
	initialize: function() {	
		// this.listenTo(this.model, "reset add remove change sort", this.render);	

		this.listenTo(this.collection, "sync", this.render);	

		//give model reference to this view
		this.collection.view = this;

		var clientsCollection = new Clients();
		this.clientsView = new ClientsView({ collection: clientsCollection});
		this.clientsView.parent = this;

		Handlebars.registerHelper("fullHeightPage", function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});
	},
		
	render: function() {
		console.log(this.collection);
		this.$el.html(this.template(this.collection));	

		this.$('#clients-wrap').append(this.clientsView.$el);
		this.clientsView.render();
		
		this.delegateEvents({
			'click .box-app-top .btn':'addToggle',
			'click .add-person .cancel-btn':'addToggle',
			'click #form-add-agent button': 'addAgent'
		});
		return this;		
	},

	addToggle: function(e) {
		console.log("toggle");
		this.$el.find('.add-person').slideToggle().find('input[type="text"]').focus();

	},


	addAgent: function() {
		console.log("addingagent");
		var agt = 
			{
				"emailAddress": this.$el.find('#form-add-agent input[type="text"]').val(),
				"verify": false
			}

		var agent = new AgentModel(agt);
		agent.save();
	}
			
});



// ,

// 	addClient: function() {
// 		var client =
// 			{
// 				"clientName": this.$el.find('#form-add-client input[type="text"]').val(),
// 				"clientUsers": []
// 			}
// 		this.model.set({
// 			clients: this.model.get('clients').concat(client)			
// 		});		
// 		// this.model.save(this.model.attributes,
// 		// 	{
// 		// 		success: _.bind(function(model, response, options){

// 		// 		}, this)
// 		// 	}
// 		// );
// 	},

// 	addClientUser: function(){
// 		//stackoverflow.com/questions/7325004/backbone-js-set-model-array-property
// 		//stackoverflow.com/questions/6351271/backbone-js-get-and-set-nested-object-attribute
// 		var clientUser = 
// 			{
// 				"name": this.$el.find('#form-add-client-user input[type="text"]').val(),
// 				"position": 'Awaiting Verification',
// 				"avatar": 'application/assets/img/avatar.png'
// 			}
// 		 var a = this.model.get('clients');
// 		 // a[0].clientUsers.concat(clientUser)
// 		 a[0].clientUsers[0] = clientUser;
// 			console.log(a[0].clientUsers);
// 		this.model.set({
// 			clients: a			
// 		});
// 		console.log(this.model);
// 	}

	// addAgent: function() {
	// 	var AddUserModel = Backbone.Model.extend({
	// 		urlRoot: '/user/add'
	// 	});
	// 	addUserModel = new AddUserModel();
	// 	addUserModel.set({
	// 		newAgent: this.$el.find('#form-add-agent input[type="text"]').val()
	// 	});
	// 	console.log(addUserModel);
	// 	addUserModel.save(this.model.attributes,
	// 		{
	// 			success: _.bind(function(model,response,options){
	// 				console.log('success');
	// 				// if(response === 1){
	// 				// 	this.$el.find('#form-add-agent h4').text('Success');
	// 				// } else {
	// 				// 	this.$el.find('#form-add-agent h4').text('Error');
	// 				// }
	// 			}, this)
	// 		}
	// 	);
	// }