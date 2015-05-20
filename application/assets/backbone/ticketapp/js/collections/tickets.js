var Tickets = Backbone.Collection.extend({
	model: TicketModel,	
	url: '/api/tickets',
	
	initialize: function(models){
		this.filtered = new Backbone.Collection(models);

		this.filtered.comparator = function(a,b) {
			if(a.get('date') > b.get('date')) {
				return -1;	
			} else if(b.get('date') > a.get('date')){
				return 1;
			}
			return 0;
		}

		this.on("reset add", function(){		
			this.filtered.reset(this.allTickets());
			this.countUpdated();
		});
	},
	
	allTickets: function(){
		filtered = this.filter(function(data){
			return data.get('status') !== 'Completed';
		});

		return filtered;
	},

	updatedTickets: function(){
		var updated = [];

		this.filter(function(model){
			if(!houston.updateCheck(model.get('updated'))){
				updated.push(model);
			}
		});

		return updated;
	},
	
	byAgent: function(){
		//Needs to change to use id
		filtered = this.filter(function(data){
			return data.get('agent') == app.user.id && data.get('status') !== 'Completed';
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

	countUpdated: function(){	
		if(!app.updateElem) return;
		var updated = 0;

		this.filter(function(model){
			if(!houston.updateCheck(model.get('updated'))) updated++;
		});

		houston.displayUpdates(updated);
	},
	
	byDateOrder: 2,
	byDate: function() {
		this.byCompanyOrder = false;
		
		if(this.byDateOrder === 1 || !this.byDateOrder){
			this.byDateOrder = 2;
			this.filtered.comparator = function(a, b) {
				if(a.get('date') > b.get('date')) {
					return -1;	
				} else if(b.get('date') > a.get('date')){
					return 1;
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
				return dataHelper.getCompanyName(model.get('authorID'));
			}
		} else if(this.byCompanyOrder === 2) {
			this.byCompanyOrder = 1;
			this.filtered.comparator = function(a, b) {
				if(dataHelper.getCompanyName(a.get('authorID')) < dataHelper.getCompanyName(b.get('authorID'))) {
					return 1;	
				} else if(dataHelper.getCompanyName(b.get('authorID')) > dataHelper.getCompanyName(a.get('authorID'))){
					return -1;
				}
				return 0;
			};			
		}
		
		this.filtered.sort();
	}
});