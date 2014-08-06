var login = {
	registerValidate: function(input){
		//set up flags
		var lFlag = true;
		var eFlag = true;
		var iFlag = true;
		var pFlag = true;
		var qflag = true;
		
		//get elements
		var input = $(input);
		var length = input.val().length;
		var css = input.data('vld');
		var wrapper = input.closest('.vld-wrap');
		
		//check if field has been filled
		if(!length) {
			eFlag = false;
		}
		
		//check if valid email
		if(input.hasClass('email')){
			var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			address = input.val();
			if(!re.test(address)){
				eFlag = false;
				input.addClass('error');			
			} else {
				eFlag = true;
				input.removeClass('error');
			}
			
			//check if email already in use
			if(address == "eddneal@hotmail.com"){
				iFlag = false;
					//var abbr = address.substr(0,9)+'...';
					//input.val(abbr);
				input.addClass('in-use');
				input.closest('.reg-vrf').find('.vrf').fadeIn();			
			} else {
				iFlag = true;
				input.removeClass('in-use');
				input.closest('.reg-vrf').find('.vrf').fadeOut();
			}
		}
		
		//check password count of first password input
		if(input.hasClass('reg-p')){
			pFlag = login.regFlag;
		}
		
		//check passwords match
		if(input.hasClass('inp-lst')){
			var first = $('.reg-p').val();
			if(input.val() != first){
				qflag = false;	
				input.addClass('error');
				input.closest('.reg-vrf').find('.vrf').fadeIn();				
			} else {
				input.removeClass('error');
				input.closest('.reg-vrf').find('.vrf').fadeOut				();
			}
		}
				
		//check if any flags are false
		if(lFlag && eFlag && iFlag && pFlag && qflag) {
			wrapper.addClass(css);
		} else {
			wrapper.removeClass(css);
		}

		if($('div.vld-a').length == 3 && $('div.vld-b').length  == 3){			
			$('button').addClass('create').removeClass('vld-button');	
		} else {
			$('button').addClass('vld-button').removeClass('create');
		}
	},
	
	regFlag: true,
	
	registerPassCount: function(input){
		var input = $(input);
		var length = input.val().length;
		var counter = input.closest('.reg-vrf').find('.vrf-count');
		var counterValue = 8;
		if(length < 8){
			counter.text(counterValue - length);
			counter.removeClass('ok');
			login.regFlag = false;
		} else {
			login.regFlag = true;
			counter.html('<i class="icon-ok-1"></i>');
			counter.addClass('ok');
		}
	}
}