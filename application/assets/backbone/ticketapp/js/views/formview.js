var FormView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-top">' +
			'<h2>Create Ticket</h2>' +
			'<a class="btn">New Ticket</a>' +
		'</div>' +
		'<div class="box-app">' +
			'<form id="form-new">' +
				'<input type="text" class="new-sub" name="new-sub" placeholder="The problem in one short sentence / subject line" />' +
				'<div class="char-count"><span>75</span> Characters Remaining</div>' +
				'<textarea name="new-textarea" placeholder="Please provide the specifics of your problem here"></textarea>' +		
				'<div class="attach-files">' +
					'<a class="attach-link" href="">Attach files to this ticket</a>' + 
					'<div class="supported">Supported -</div>' + 
					'<ul class="filetypes">' +
						'<li>Jpg</li>' +
						'<li>Png</li>' +
						'<li>Gif</li>' +
						'<li>Pdf</li>' +
					'</ul>' +
					'<ul class="files">' +
						'<li class="file">' +
							'<div class="file-icon jpg"></div>' +
							'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
							'<a href="">View</a>' +
							'<a href="">Delete</a>' +
						'</li>' +
						'<li class="file">' +
							'<div class="file-icon jpg"></div>' +
							'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
							'<a href="">View</a>' +
							'<a href="">Delete</a>' +
						'</li>' +
						'<li class="file">' +
							'<div class="file-icon jpg"></div>' +
							'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
							'<a href="">View</a>' +
							'<a href="">Delete</a>' +
						'</li>' +
						'<li class="file">' +
							'<div class="file-icon jpg"></div>' +
							'<div class="filename">Screenshot_329724_72837.Jpg</div>' +
							'<a href="">View</a>' +
							'<a href="">Delete</a>' +
						'</li>' +							
					'</ul>' +
				'</div>' +
				'<button class="save" type="button">Create Ticket</button>' +
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib" href="">Cancel</a>' +
			'</form>' +
		'</div>' 
	),
	render: function(){
		this.$el.html(this.template());
		this.delegateEvents({
			'click .save': 'save',
			'input .new-sub': 'count'
		});
		return this;
	},
	
	count: function(){
		var max = 75;
		var input = this.$el.find('.new-sub');
		var value = input.val();
		var length = value.length;
		if(length >= max){
			input.val(value.substr(0, max));
			length = max;
		}
		
		var count = max - length; 
		this.$el.find('.char-count span').text(count);
		if(count <= 10){
			this.$el.find('.char-count span').addClass('count');
		} else {
			this.$el.find('.char-count span').removeClass('count');
		}
		
		if(count == 0){
			this.$el.find('.char-count').addClass('count');
		} else {
			this.$el.find('.char-count').removeClass('count');
		}
		
	},
	
	save: function(){
		this.setModelData();
		this.model.save(this.model.attributes,
			{
				success: function(model){
					app.tickets.add(model);
					//ensure menu form always uses a fresh model
					app.formView.model = new TicketModel();
					//app.navigate('contacts/' + model.get('url'), {trigger: true});
					app.navigate('', {trigger: true});
				}
			}
		);
	
	},
	setModelData: function(){
		var newDate = new Date();
		var newDateHuman = houston.convertDate(newDate);
		this.model.set({
			subject: this.$el.find('input[name="new-sub"]').val(),
			id: null,
			url: this.$el.find('input[name="new-sub"]').val(),
			name: user.name,
			company: user.company,
			date: newDate,
			//dateHuman: 'trens'
			datehuman: newDateHuman
		});
	}
});