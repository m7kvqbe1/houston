var TicketDetail = Backbone.View.extend({
	template: Handlebars.compile(
			'<div class="box-app-top msg-top">'+
				'<h2>Open Tickets</h2>'+
				'<a class="btn in-progress">In Progress<i class="icon-down-dir-1"></i></a>'+
				'<a class="btn sel-agent">Thomas Humphris<i class="icon-down-dir-1"></i></a>'+			
			'</div>'+
			'<ul id="msg-stream" class="box-app">'+
				'<li class="msg from-agent">'+
					'<div class="msg-dtl">'+
						'<img class="msg-avatar" src="img/avatar.png" />'+
						'<div class="msg-dtl-inr">'+
							'<h3 class="msg-agent">Thomas Humphris</h3>'+
							'<h4 class="msg-company">Optimal Internet</h4>'+
							'<div class="msg-date">29<sup>TH</sup> Mar 2014 10:12am</div>'+
						'</div>'+
						'<div class="msg-tri"></div>'+
					'</div>'+
					'<div class="msg-body">'+
						'<div class="msg-text">'+
							'Hello Rachel,<br />'+
							'Registrar - Holds control over the domain<br />'+
							'Name Servers - Control where the domain points to<br />'+
							'Web Server - Where the website itself is hosted<br /><br />'+
							'The domain is currently using the zebradns.net name servers and the registrar is one.com. However the DNS records on the name servers point to our web server. Although the domain is indeed setup to point to our web server, it isn&#39;t under our control.  It is possible for the domain to be transferred to our Registrar and to use our Name Servers if you wish.<br /><br />'+
							'In order to do this a transfer process has to be conducted. To transfer a domain of the following types the steps below must be followed: .com, .net, .org, .biz, .info, .co, .tv, .name, .me, .xxx, .mobi, .cc, .sx<br /><br />'+
							'Kind Regards,<br /><br />'+
							'Tom'+
						'</div>'+
						'<a class="btn">Reply</a>'+
					'</div>'+
				'</li>'+
				'<li class="msg from-client">'+
					'<div class="msg-dtl">'+
					'<img class="msg-avatar" src="img/avatar.png" />'+
						'<div class="msg-dtl-inr">'+
							'<h3 class="msg-agent">Jessica Guyon</h3>'+
							'<h4 class="msg-company">Paramount Recruitment has a long name too</h4>'+
							'<div class="msg-date">29<sup>TH</sup> Mar 2014 09:35am</div>'+
						'</div>'+
						'<div class="msg-tri"></div>'+
					'</div>'+
					'<div class="msg-body">'+
						'<div class="msg-text">'+
							'<h5>Ticket Subject</h5>'+
							'Please could you help me with this domain issue? (this is the subject line)<br /><br />'+
							'<h5>Ticket Message</h5>'+
							'Hi Support,<br /><br />'+ 
							'Name Servers - Control where the domain points to<br />'+
							'Please could you help me on this - one.com have sent me an email this morning with regards to our name servers- as below. I&#39;ve asked them what this means and they have replied, but is this ok to leave?  Dear Rachel Baker, During a routine check we have noticed that your adamsons.com is not using our name servers. <a href="">hostmaster-support@one.com</a>.<br />'+
							'Regards,<br /><br />'+
							'Jessica'+
						'</div>'+
						'<ul class="files">'+
							'<li class="file">'+
								'<div class="file-icon jpg"></div>'+
								'<div class="filename">Screenshot_329724_72837.Jpg</div>'+
								'<a href="">View</a>'+
								'<a href="">Delete</a>'+
							'</li>'+
							'<li class="file">'+
								'<div class="file-icon jpg"></div>'+
								'<div class="filename">Screenshot_329724_72837.Jpg</div>'+
								'<a href="">View</a>'+
								'<a href="">Delete</a>'+
							'</li>'+					
						'</ul>'+
						'<a class="btn">Reply</a>'+
					'</div>'+
				'</li>'+
			'</ul>'	
	),
	
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function (){		
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});