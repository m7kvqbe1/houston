var Tickets = Backbone.Collection.extend({
	model: TicketModel,
	
	url: '/tickets/all',
	
	initialize: function(models){
		this.filtered = new Backbone.Collection(models);
		this.on("reset add", function(){		
			this.filtered.reset(this.allTickets());
		});
	},
	
	comparator: function(a,b) {
		if(a.get('date') < b.get('date')) {
			return 1;	
		} else if(b.get('date') > a.get('date')){
			return -1;
		}
		return 0;
	},
	
	allTickets: function(){
		//possible refactor
		filtered = this.filter(function(data){
			return data.get('status') !== 'Completed';
		});
		return filtered;
	},
	
	byAgent: function(){
		filtered = this.filter(function(data){
			return data.get('agent') == app.user.attributes.firstName + ' ' + app.user.attributes.lastName && data.get('status') !== 'Completed';
			//return data.get(key) === value && data.get('status') !== 'Completed';
		});
		return filtered;	
	},
	
	byCompleted: function(){
		filtered = this.filter(function(data){
			return data.get('status') === 'Completed';
			//return data.get(key) === value && data.get('status') !== 'Completed';
		});
		return filtered;	
	},

	byFilter: function(key, value){
		filtered = this.filter(function(data){
			return data.get(key) === value;
			//return data.get(key) === value && data.get('status') !== 'Completed';
		});
		return filtered;
	},
	
	byDate: function() {
		this.filtered.comparator = function(a, b) {
			if(a.get('date') < b.get('date')) {
				return 1;	
			} else if(b.get('date') > a.get('date')){
				return -1;
			}
			return 0;
		};
		this.filtered.sort();
	},
		
	byCompany: function(){
		this.filtered.comparator = function(model) {
			return model.get('company');
		}
		this.filtered.sort();
	}
	
});
