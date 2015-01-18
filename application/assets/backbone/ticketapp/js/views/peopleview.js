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
				'<div class="add-person add-agent">'+
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
	),
	
	initialize: function() {		

		this.listenTo(this.collection, "sync", this.render);	

		//give collection reference to this view
		this.collection.view = this;

		var clientsCollection = new Clients();
		this.clientsView = new ClientsView({ collection: clientsCollection});
		this.clientsView.parent = this;

		//new model
		this.addAgentModel = new AgentModel();
		//give model reference to this view
		this.addAgentModel.view = this;

		this.listenTo(this.addAgentModel, "sync", this.render);	

		Handlebars.registerHelper("fullHeightPage", function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	

		this.$('#clients-wrap').append(this.clientsView.$el); //changed from #clients-stream
		this.clientsView.render();
		
		this.delegateEvents({
			'click .box-app-top .btn':'addToggle',
			'click .add-agent .cancel-btn':'addToggle',
			'click #form-add-agent button': 'addAgent'
		});
		return this;		
	},

	addToggle: function() {
		this.$el.find('.add-agent').slideToggle().find('input[type="text"]').focus();
	},

	addAgent: function() {
		var attributes = 
			{
				"emailAddress": this.$el.find('#form-add-agent input[type="text"]').val(),
				"verify": false
			}

		this.addAgentModel.save(attributes,{
			success: _.bind(function(model){
				this.addAgentModel.clear();
			}, this)
		});

	}
			
});
