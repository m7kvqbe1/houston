String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var login = {

	validateForm: function(form){
		var valid = true;
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		var form = $(form);
		var inputs = form.find('.required');
		inputs.each(function(){
			var input = $(this);
			if(input.val() == ''){
				input.addClass('error');
				valid = false;
			} else {
				input.removeClass('error')
			}

			if(input.is('input[type=email]')){
				address = input.val();
				if(!re.test(address)){
					valid = false;
					input.addClass('error');		
				} else {
					input.removeClass('error');
				}
			}
		});
		return valid;
	},

	inputValidation: function(input){
		var valid = true;
		var input = $(input);
		var value = input.val();
		var length = value.length;
		var css = input.data('vld');
		// var dataID = input.data('id');
		var wrapper = input.closest('.vld-wrap');

		if(!value) valid = false;

		if(valid){
			if(input.is('input[type=email]')) valid = this.emailValidation(input, value, wrapper, css);

			if(input.hasClass('company')) this.companyValidation(input, value, wrapper, css);

			if(input.hasClass('reg-p')) valid = this.passwordValidation(value, length);

			if(input.hasClass('inp-lst')) valid = this.repeatPasswordValidation(value);
		}

		if(valid) {
			// console.log(dataID);
			// console.log(app.currentView.model.attributes);
			wrapper.addClass(css);
		} else {
			wrapper.removeClass(css);
		}

		if(input.hasClass('reg-p') || input.hasClass('inp-lst')){
			this.registerHideAlert(input);
		}
	},

	emailValidation: function(input, address, wrapper, css){
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if(!re.test(address)){
			input.addClass('error'); 
			wrapper.removeClass(css);
			return false;			
		} 

		input.removeClass('error');

		var request = $.get("/api/check/email?email=" + address);
		
		request.done(function(msg) {
			login.successfulAjaxValidation(input, wrapper, css);
		});
		 
		request.fail(function(jqXHR, textStatus) {
			login.failedAjaxValidation(input, wrapper, css);
		});
	},

	companyValidation: function(input, companyName, wrapper, css){

		var request = $.get("/api/check/company?company=" + companyName);

		request.done(function(msg) {
			login.successfulAjaxValidation(input, wrapper, css);
		});
		 
		request.fail(function(jqXHR, textStatus) {
			login.failedAjaxValidation(input, wrapper, css);
		});
	},

	successfulAjaxValidation: function(input, wrapper, css){
		input.removeClass('in-use');
		input.closest('.reg-vrf').find('.vrf').fadeOut();
		wrapper.addClass(css);
	},

	failedAjaxValidation: function(input, wrapper, css){
		input.addClass('in-use');
		input.closest('.reg-vrf').find('.vrf').show().addClass('delayed-icon-animate');	
		wrapper.removeClass(css);
	},

	validatedPassword: false,
	passwordValidation: function(value, length){
		if(length >= 8){
			this.validatedPassword = value;
			return true;
		} 
		return false;
	},

	registerHideAlert: function(input){	
		$(input).removeClass('password-resize').closest('.reg-vrf').find('.vrf').fadeOut();
	},

	repeatPasswordValidation: function(value){
		if(value == this.validatedPassword) return true;
		return false;
	},

	//////////////////////////////////////////////////////////

	registerPasswordShowCount: function(input) {	
		var input = $(input);
		if(login.validatedPassword !== input.val()){
			input.addClass('password-resize');
			input.closest('.reg-vrf').find('.vrf').show().addClass('delayed-icon-animate');
		}
	},	

	registerPasswordCount: function(input, view){
		var input = $(input);
		var length = input.val().length;
		var regVrf = input.closest('.reg-vrf');
		var counter = regVrf.find('.vrf-count');
		var counterValue = 8;
		var inpLst = view.find('.inp-lst');
		if(length < 8){
			input.addClass('password-resize');
			counter.text(counterValue - length);
			counter.removeClass('ok');
			this.validatedPassword = false;
			regVrf.find('.vrf').show().addClass('delayed-icon-animate');

			inpLst.val('');
			inpLst.prop('disabled', true);
			inpLst.closest('.reg-vrf').find('.vrf').fadeOut();
			inpLst.closest('.vld-wrap').removeClass('vld-a vld-b');
		} else {
			// input.removeClass('password-resize');
			counter.html('<i class="icon-ok-1"></i>');
			counter.addClass('ok');
			inpLst.prop('disabled', false);
		}
	},

	registerPasswordMatch: function(input){
		var input = $(input);
		var value = input.val();
		var regVrf = input.closest('.reg-vrf');
		var vrf = regVrf.find('.vrf');
		var css = input.data('vld');
		var wrapper = input.closest('.vld-wrap');
		if (value == this.validatedPassword){	
			input.addClass('password-resize');		
			var vrfCir = vrf.find('.vrf-cir');
			var vrfMsg = vrf.find('.vrf-msg');
			vrfCir.addClass('ok').html('<i class="icon-ok-1"></i>');
			vrfMsg.html('');
			vrf.show().addClass('delayed-icon-animate');
			wrapper.addClass(css);
		} else {
			vrf.fadeOut();
			wrapper.removeClass(css); //added to give effect
		}	
	},

	registerCreateValidate: function(view){
		if(view.find('div.vld-a').length == 3 && view.find('div.vld-b').length  == 3){
			return true;
		} else {

			return false;
		}
	}

}