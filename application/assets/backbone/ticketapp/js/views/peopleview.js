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
			'<div id="agent-stream">'+
				'<div class="add-person add-agent">'+
					'<form id="form-add-agent">'+
						'<h4>To add a new agent, simply input their email address and Houston will do the rest. Simple!</h4>'+
						'<input class="required" type="email" placeholder="New Agent\'s Email Address" />'+
						'<button type="button">Submit</button>' +
						'<div class="beige or">or</div>' +
						'<a class="cancel-btn ib">Cancel</a>' +
					'</form>'+
				'</div>'+
				'<ul>'+
				'{{#each models}}'+
					'<li class="person">'+
						'{{#if attributes.firstName}}'+					
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
			'</div>'+
			'<div id="clients-wrap">'+	

			'</div>'+
		'</div>'			
	),
	
	initialize: function() {		
		this.listenTo(this.collection, "add change remove", this.render);

		this.collection.view = this;
	},
		
	render: function() {
		console.log(this.collection);
		this.$el.html(this.template(this.collection));	
		this.$('#clients-wrap').append(app.clientsView.$el); 
		app.clientsView.render();
		
		this.delegateEvents({
			'click .box-app-top .btn':'addToggle',
			'click .add-agent .cancel-btn':'addToggle',
			'click #form-add-agent button': 'addAgent'
		});
		return this;		
	},

	addToggle: function() {
		this.$el.find('.add-agent').slideToggle().find('input[type="email"]').focus();
	},

	addAgent: function(e) {
		if(houston.validateForm(e.currentTarget)){
			var attributes = 
				{
					"emailAddress": this.$el.find('#form-add-agent input[type="email"]').val(),
					"verify": false
				};

			app.addAgentModel.save(attributes,{
				success: _.bind(function(model){
					app.addAgentModel.clear();
				}, this)
			});
		}
	}
			
});
