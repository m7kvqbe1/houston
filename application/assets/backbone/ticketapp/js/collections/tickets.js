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
		console.log(this);
		filtered = this.filter(function(data){
			return data.get(key) === value;
		});
		return new Tickets(filtered);
	},
	
	byDate: function() {
		this.comparator = function(ticketA, ticketB) {
		  if (ticketA.get('date') > ticketB.get('date')) return -1; // before
		  if (ticketB.get('date') > ticketA.get('date')) return 1; // after
		  return 0; // equal
		};
		this.sort();
	},
		
	byCompany: function(){
		console.log('trend');
		this.comparator = function(model) {
			return model.get('company');
		}
		this.sort();
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