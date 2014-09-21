var PeopleView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<div class="box-app-top">'+
			'<h2>Support Agents</h2>'+
			'<a class="btn">New Agent</a>'+
		'</div>'+

		'<ul id="agent-stream" class="box-app box-people">'+
			'<li class="person">'+
				'<img class="avatar" src="application/assets/img/avatar.png" />'+
				'<h3>Thomas Humphris</h3>'+
				'<h4>Support Agent</h4>'+
			'</li>'+
			'<li class="person">'+
				'<img class="avatar" src="application/assets/img/avatar.png" />'+
				'<h3>Edward Neal</h3>'+
				'<h4>Support Agent</h4>'+
			'</li>'+
			'<li class="person">'+
				'<img class="avatar" src="application/assets/img/avatar.png" />'+
				'<h3>Mark Neale</h3>'+
				'<h4>Support Agent</h4>'+
			'</li>'+
			'<li class="person">'+
				'<img class="avatar" src="application/assets/img/avatar.png" />'+
				'<h3>Babes</h3>'+
				'<h4>Support Agent</h4>'+
			'</li>'+
		'</ul>'+			
			'<div class="box-companies-header">'+
				'<h2>Companies</h2>'+
				'<a class="btn">New Company</a>'+
			'</div>'+
		'<ul id="company-stream" class="box-app box-companies">'+
		'{{#each models}}'+
			'<li class="company">'+
				'<div class="company-info">'+
					'<h3>{{attributes.companyName}}</h3>'+
					'<a href="">Edit</a>'+
					'<a href="">New User</a>'+
				'</div>'+
				'<ul class="client-stream">'+
				'{{#each attributes.users}}'+
					'<li class="person">'+
						'<img class="avatar" src="{{avatar}}" />'+
						'<h3>{{name}}</h3>'+
						'<h4>{{position}}</h4>'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</li>'+
		'{{/each}}'+	
		'</ul>'
	),
	
	initialize: function() {	
		this.listenTo(this.collection, "reset add remove change sort", this.render);		
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		
		this.delegateEvents({

		});
		return this;		
	}
			
});