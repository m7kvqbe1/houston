<!doctype html>
<html lang="en">
	<head>
		<title>Stripe Integration Sandbox</title>
		
		<meta charset="utf-8">
		
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		
		<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
		<script type="text/javascript">Stripe.setPublishableKey('pk_0BVRc6J0uTEMvHQ4aPHjbudmFY8TN');</script>
	</head>
	<body>		
	<?php
		// Display corresponding form for the stage of the process
		if(isset($_GET['plan'])) {
			echo file_get_contents(__DIR__.'/payment_form.html');
		} else {
			echo file_get_contents(__DIR__.'/plan_selection_form.html');
		}
	?>
	</body>
	
	<script type="text/javascript">
		//4242424242424242
				
		jQuery(function($) {
			$('#payment-form').submit( function(event) {
				var $form  = $(this);
				
				// Disable the submit button to prevent repeated clicks
				$form.find('button').prop('disabled', true);
				
				// Get a token from Stripe API
				Stripe.card.createToken($form, stripeResponseHandler);
				
				// Prevent the form from submitting with the default action
				return false;
			});
		});
		
		function qs(key) {
			key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
			var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
			return match && decodeURIComponent(match[1].replace(/\+/g, " "));
		}
		
		function stripeResponseHandler(status, response) {
			console.log(status);
			console.log(response);
			
			var $form = $('#payment-form');
			if(response.error) {
				// Show the errors on the form
				$form.find('.payment-errors').text(response.error.message);
				$form.find('button').prop('disabled', false);
			} else {				
				var data = {
					token: response.id,
					plan: qs('plan')
				}
				
				// AJAX submit plan selection and token to Houston to perform charge
				$.ajax({
    				type: "POST",
    				url: "/payment/charge",
    				processData: false,
    				contentType: 'application/json',
    				cache: false,
    				data: JSON.stringify(data)
				}).done( function(ret) {
					console.log(ret);
					$('#payment-form').hide();
					$('body').append('<span>Success</span>');
				});
			}
		}
	</script>
</html>