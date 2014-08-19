var login = {
	loginValidate: function(input){
		var input = $(input);
		var form = input.closest('form');
		var email = form.find('input[name="log-e"]');
		var pass = form.find('input[name="log-p"]');
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		var eflag = true;
		var pflag = true;
		
		if(re.test(email.val())){
			email.removeClass('error');
			eflag = true;
		} else {			
			email.addClass('error');
			eflag = false;
		}
		
		if(pass.val().length < 1){
			pass.addClass('error');
			pflag = false;
		} else {
			pass.removeClass('error');
			pflag = true;
		}
		
		if (!eflag || !pflag){
			return false;
		} else {
			return true;
		}
	},

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
				login.emailVal = address;
				//add ellipsis if mobile view
				if($(window).width() < 768){
					var abbr = address.substr(0,13)+'...';
					input.val(abbr);
				}
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
			pFlag = login.regPassFlag;
			//if repeat password has already been verified, check if password has changed and now doesnt match, display error on repeat password
			if(login.regMatchFlag == true && input.val() != $('.inp-lst').val()){
				login.regMatchFlag = false;
				$('.inp-lst').closest('.vld-wrap').removeClass('vld-b');				
				$('.inp-lst').val('');
				$('.inp-lst').prop('disabled', true);
			}
		}
		
		//check passwords match
		if(input.hasClass('inp-lst')){
			var regVrf = input.closest('.reg-vrf');
			var vrf = regVrf.find('.vrf');
			var vrfCir = vrf.find('.vrf-cir');
			var vrfMsg = vrf.find('.vrf-msg');
			if(!login.regMatchFlag){
				qflag = false;	
				input.addClass('error');
				vrfCir.removeClass('ok').html('<i class="icon-cancel"></i>');
				vrfMsg.html('No<br />Match');
				vrf.fadeIn();				
			} else {
				input.removeClass('error');
				vrf.fadeOut();
			}
		}
				
		//check if any flags are false
		if(lFlag && eFlag && iFlag && pFlag && qflag) {
			wrapper.addClass(css);
		} else {
			wrapper.removeClass(css);
		}

	},
	
	
	regMatchFlag: false,
	registerPassMatch: function(input){
		var input = $(input);
		var regVrf = input.closest('.reg-vrf');
		var first = $('.reg-p').val();
			if(input.val() != first || input.val() == ''){			
				login.regMatchFlag = false;	
				regVrf.find('.vrf').fadeOut();				
			} else {
				login.regMatchFlag = true;
				var vrf = regVrf.find('.vrf');
				var vrfCir = vrf.find('.vrf-cir');
				var vrfMsg = vrf.find('.vrf-msg');
				vrfCir.addClass('ok').html('<i class="icon-ok-1"></i>');
				vrfMsg.html('');
				vrf.fadeIn();
			}	
	},
	
	regPassFlag: true,	
	registerPassCount: function(input){
		var input = $(input);
		var length = input.val().length;
		var counter = input.closest('.reg-vrf').find('.vrf-count');
		var counterValue = 8;
		if(length < 8){
			counter.text(counterValue - length);
			counter.removeClass('ok');
			login.regPassFlag = false;
			login.regShowVal = 1;
			//fade counter back in if pass field edited under 8 characters
			input.closest('.reg-vrf').find('.vrf').fadeIn();
		} else {
			login.regShowVal = input.val();
			login.regPassFlag = true;
			counter.html('<i class="icon-ok-1"></i>');
			counter.addClass('ok');
			$(".inp-lst").prop('disabled', false);
		}
	},
	
	emailVal: 1,	
	registerHideInUse: function(input){	
		if(login.emailVal != 1){
			$(input).val(login.emailVal);
		}
		login.registerHideVrf(input);
		login.emailVal = 1;
	},
	
	regShowVal: 1,
	registerShowCount: function(input) {	
		var input = $(input);
		if(login.regShowVal !== input.val()){
			input.closest('.reg-vrf').find('.vrf').fadeIn();
		}
	},
	
	registerHideVrf: function(input){
		var input = $(input);
		input.closest('.reg-vrf').find('.vrf').fadeOut();
	},
	
	registerCreateValidate: function(){
		if($('div.vld-a').length == 3 && $('div.vld-b').length  == 3){
			console.log('passed');
			return true;
		} else {
			console.log('failed');
			return false;
		}
	}
	
}