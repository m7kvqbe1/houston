var events = {
	pageResize: function(){
		$('.box-app').css('min-height', houston.calculateBoxHeight());
	},

	imgMaxHeight: function(){
		this.$('.preview-img').css('max-height', houston.previewImageResize());
	},

	bindEvents: function(){

		$(window).on("resize", events.pageResize).on("resize", events.imgMaxHeight);

		// Mobile menu
		$('.nav-icon, .mob-menu a').click(function(){
			$('.outer-wrap, .mob-menu').fadeToggle(300);
			$('.nav-icon').toggleClass('cross');
		});
		
		// Close notification popup
		$('#notice .close').click( function() {
			$(this).parent().hide();
		});

		$('.log-out').click(function(){
			houston.createModal({type: 'Warning', message: 'Are you sure you would like to log out?', cancel: true},
		    	function(){
					window.location.href = 'http://' + window.location.hostname + '/logout';
				}
		    );
		});

		// PushState handler
		$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
		  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		  var root = location.protocol + "//" + location.host + app.root;
		  if(href.prop.slice(0, root.length) === root) {
		    evt.preventDefault();
		    Backbone.history.navigate(href.attr, true);
		  }
		});
	}
}