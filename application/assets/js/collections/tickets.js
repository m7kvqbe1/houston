var Tickets = Backbone.Collection.extend({
	model: TicketModel,
	url: '/tickets',
	
	comparator: function(a,b) {
		if(a.get('date') < b.get('date')) {
			return 1;	
		} else if(b.get('date') > a.get('date')){
			return -1;
		}
	},

	byFilter: function(key, value){
		filtered = this.filter(function(data){
			return data.get(key) === value;
		});
		return new Tickets(filtered);
	}
	
});

	//comparator: 'date',
	//byStatus: function(status){
		//filtered = this.filter(function(data){
			//return data.get("status") === status;
		//});
	    //return new Tickets(filtered);	
	//},
	//byAgent: function(agent){
		//filtered = this.filter(function(data){
			//return data.get("agent") === agent;
		//});
	    //return new Tickets(filtered);	
	//},