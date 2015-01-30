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
		// Possible refactor 
		filtered = this.filter(function(data){
			return data.get('status') !== 'Completed';
		});
		return filtered;
	},
	
	byAgent: function(){
		filtered = this.filter(function(data){
			return data.get('agent') == app.user.attributes.firstName + ' ' + app.user.attributes.lastName && data.get('status') !== 'Completed';
		});
		return filtered;	
	},
	
	byCompleted: function(){
		filtered = this.filter(function(data){
			return data.get('status') === 'Completed';
		});
		return filtered;	
	},

	byFilter: function(key, value){
		filtered = this.filter(function(data){
			return data.get(key) === value;
		});
		return filtered;
	},
	
	byDateOrder: 2,
	byDate: function() {
		this.byCompanyOrder = false;
		
		if(this.byDateOrder === 1 || !this.byDateOrder){
			this.byDateOrder = 2;
			this.filtered.comparator = function(a, b) {
				if(a.get('date') < b.get('date')) {
					return 1;	
				} else if(b.get('date') > a.get('date')){
					return -1;
				}
				return 0;
			};
		} else if(this.byDateOrder === 2) {
			this.byDateOrder = 1;
			this.filtered.comparator = function(model) {
				return model.get('date');
			}			
		}
		this.filtered.sort();
	},

	byCompanyOrder: false,		
	byCompany: function(){
		
		this.byDateOrder = false;

		if(this.byCompanyOrder === 1 || !this.byCompanyOrder){
			this.byCompanyOrder = 2;
			this.filtered.comparator = function(model) {
				return model.get('company');
			}
		} else if(this.byCompanyOrder === 2) {
			this.byCompanyOrder = 1;
			this.filtered.comparator = function(a, b) {
				if(a.get('company') < b.get('company')) {
					return 1;	
				} else if(b.get('company') > a.get('company')){
					return -1;
				}
				return 0;
			};			
		}
		this.filtered.sort();
	}
});