this["JST"] = this["JST"] || {};

this["JST"]["loginformview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Login Here</h2>\n<h3 class=\"log-tag\">Great to see you again!</h3>\n<form id=\"form-log\">\n	<input class=\"required\" type=\"email\" name=\"log-e\" placeholder=\"Email Address\" autofocus spellcheck=\"false\" />\n	<input class=\"required\" type=\"password\" name=\"log-p\" placeholder=\"Password\" />\n	<label>\n		<input id=\"log-rem\" type=\"checkbox\" name=\"log-r\" value=\"remember\" />\n		Remember me on this computer\n	</label>\n	<button class=\"login\" type=\"button\">\n		<span>Sign In</span>\n		<img class=\"svg-dots\" src=\"/application/assets/img/three-dots.svg\" width=\"52\" alt=\"Loading\">\n	</button>		\n</form>\n<h3 class=\"ib\">Help!</h3>&nbsp;\n<a class=\"forgot\">Ive forgotten my password</a>";
},"useData":true});

this["JST"]["loginview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-wel\">\n	<h2>Welcome to Houston</h2>\n	<h3 class=\"wel-tag\">Super-fast, easy to use frontline support</h3>\n	<h3>Get Houston!</h3>\n	<a href=\"/register\">Try Houston for 60 days, absolutely free!</a>\n</div>\n<div id=\"login-form-wrap\">\n</div>\n<div class=\"box box-try\">\n	<h2>Try Houston</h2>\n	<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>\n	<a class=\"btn\" href=\"/register\">Lets Go</a>\n</div>";
},"useData":true});

this["JST"]["paymentview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-reg\">\n	<div class=\"payment-header\">\n		<h2><span>Enter Your Payment Details</span></h2>\n		<h3><span>Almost got your Houston account!</span></h3>\n	</div>\n	<div class=\"payment-form-wrap\">\n	<div class=\"payment-houston\"></div>\n		<form id=\"form-payment\" action=\"\">\n			<span class=\"payment-errors\"></span>\n			<div class=\"card-front\">\n				<div class=\"form-row\">\n					<label for=\"card-number\">Card Number</label>\n					<input id=\"card-number\" type=\"text\" maxlength=\"20\" data-stripe=\"number\" />			\n				</div>	\n				<div class=\"form-row expiration-date\">\n					<label for=\"expiration-month\">Expiration Date</label>\n					<input id=\"expiration-month\" type=\"text\" maxlength=\"2\" data-stripe=\"exp-month\" placeholder=\"MM\"/>		\n					<input type=\"text\" maxlength=\"4\" data-stripe=\"exp-year\" placeholder=\"YYYY\"/>\n				</div>\n				<div class=\"form-row\">\n					<label for=\"cardholder-name\">Cardholder Name</label>\n					<input id=\"cardholder-name\" type=\"text\" />			\n				</div>\n			</div>\n			<div class=\"card-back\">\n				<div class=\"form-row\">\n					<label for=\"cvc\">CVC/CVV</label>\n					<input id=\"cvc\" type=\"text\" maxlength=\"4\" data-stripe=\"cvc\" />\n					<div>\n						<span>The last </span>\n						<span>3 or 4 digits </span>\n						<span>on back </span>\n						<span>of the card</span>\n					</div>			\n				</div>'\n			</div>\n			<div class=\"payment-buttons\">\n				<button class=\"payment-confirm\" type=\"button\">\n					<span>Confirm</span>\n					<img class=\"svg-dots\" src=\"/application/assets/img/three-dots.svg\" width=\"52\" alt=\"Loading\">\n				</button>\n				<div class=\"beige or\">or</div>\n				<a class=\"btn-can payment-back\">Back</a>\n			</div>\n			<div class=\"powered-by-stripe\"></div>\n		</form>\n	</div>\n</div>";
},"useData":true});

this["JST"]["paymentviewsuccess"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-suc\">\n	<h2>You Have a Houston Account!</h2>\n	<h3>Hoot have thought it would be so easy?</h3>\n	<div class=\"got-wrap\">\n		<h2>You\\'ve Got Mail!</h2>\n		<h3>Please click the verification link in the email we just sent you to complete your account creation</h3>\n	</div>\n</div>";
},"useData":true});

this["JST"]["planview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"box box-reg\">\n	<div class=\"box-plan\">\n		<h2><span>Choose a Pricing Plan</span></h2>\n		<h3><span>After your 60 day free trial which pricing plan suits you best "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "?</span></h3>\n		<div class=\"pricing-plan left-plan\">\n			<div class=\"vld-cir\">1</div>\n			<div class=\"price\">£99.99</div>\n			<h3>Unlimited Access<br />Annually</h3>\n			<button class=\"plan-select\" type=\"button\" data-plan=\"1\">Select</button>\n		</div>\n		<div class=\"svg-wrapper\">\n			<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 943.6 1025.2\">\n				<g id=\"owl\">\n					'<path fill=\"#9B8D75\" d=\"M785.9 788.2c39.7-76.1 62.8-167.4 62.8-265.6 0-85.3-17.5-165.3-48-234.8 0 0-18.4-219.8 8.2-271.4 25.3-49-108.5 23.5-147.7 68.1-42-36.9-111.1-61.1-189.3-61.4h-1.2c-78.2.2-147.3 24.4-189.3 61.4-39.3-44.5-173-117.1-147.7-68.1 26.6 51.6 8.2 271.4 8.2 271.4-30.6 69.4-48 149.5-48 234.8 0 98.2 23.2 189. 62.8 265.6-29.4 20.9-46.2 45.1-46.2 70.8 0 79.9 161.2 144.6 360.2 144.9h1.2c199-.3 360.2-65 360.2-144.9 0-25.7-16.8-49.9-46.2-70.8z\"/>\n					'<path class=\"right-wing\" fill=\"#CFC3AF\" d=\"M926.7 659.5c-23.9-146.9-64.2-262.6-90.1-258.4-.2 0-.5.2-.7.2-.9-.1-1.7-.4-2.7-.3-.1 0-.3-.1-.4-.1-3.2-.2-6.4 1.3-9.6 4.3-26.7 17.5-65.6 89.5-95.3 180.3-36 109.8-44.9 205.4-20 213.6 15.3 5 39.7-24.1 64.6-72.6 2.3 91.6 16.5 157.4 36.7 158.4 16.5.8 33-41.3 44.7-105.9 22.6 93.5 49. 157.1 69.2 153.9 25.9-4 27.5-126.5 3.6-273.4z\"/>\n					'<path class=\"left-wing\" fill=\"#CFC3AF\" d=\"M16.9 659.5C40.8 512.6 81.2 396.9 107 401.1c.2 0 .5.2.7.2.9-.1 1.7-.4 2.7-.3.1 0 .3-.1.4-.1 3.2-.2 6.4 1.3 9.6 4.3 26.7 17.5 65.6 89.5 95.3 180.3 36 109.8 44.9 205.4 20 213.6-15.3 5-39.7-24.1-64.6-72.6-2.3 91.6-16.5 157.4-36.7 158.4-16.5.8-33-41.3-44.7-105.9-22.6 93.5-49.9 157.1-9.2 153.9-25.9-4-27.5-126.5-3.6-273.4z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M314.5 600.5c13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S601 558.2 601 536.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 1.2 25.7 16.8 63.9 38.3 63.9z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M658.1 624.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 652.2 351 630.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 312-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M658.1 718.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 746.2 351 724.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z\"/><ellipse fill=\"#F69328\" cx=307.1\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M330.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"365\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M388.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"423\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M446 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"518.4\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M541.4 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"576.3\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M599.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"634.3\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M657.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M642.2 95.3c-74.1 0-138.4 41.7-170.8 102.9-32.3-61.6-96.8-103.6-171.2-103.6-106.7 0-193.2 86.5-193.2 193.2C107 394.5 193.5 481 300.2 81c74.1 0 138.4-41.7 170.8-102.9 32.3 61.6 96.8 103.6 171.2 103.6 106.7 0 193.2-86.5 193.2-193.2.1-106.7-86.5-193.2-193.2-193.2z\"/>\n					<circle fill=\"#FFF\" cx=\"300.2\" cy=\"287.8\" r=\"136.6\"/>\n					<circle fill=\"#FFF\" cx=\"642.2\" cy=\"288.5\" r=\"136.6\"/>\n					<g id=\"eyes\">\n						<circle fill=\"#060707\" cx=\"310.2\" cy=\"282.8\" r=\"81.6\"/>\n						<circle fill=\"#FFF\" cx=\"291.9\" cy=\"244.5\" r=\"16.6\"/>'+				\n						<circle fill=\"#060707\" cx=\"652.2\" cy=\"283.5\" r=\"81.6\"/>\n						<circle fill=\"#FFF\" cx=\"633.8\" cy=\"245.2\" r=\"16.6\"/>\n					</g>\n					<path fill=\"#F69328\" d=\"M523.5 375.3l-51.6 89.4-51.6-89.4 26.1-6.8c16.7-4.4 34.3-4.4 51.1 0l26 6.8z\"/>\n				</g>\n			</svg>\n		</div>\n		<div class=\"pricing-plan right-plan\">\n			<div class=\"vld-cir\">2</div>\n			<div class=\"price\">£9.99</div>\n			<h3>Unlimited Access<br />Monthly</h3>\n			<button class=\"plan-select\" type=\"button\" data-plan=\"2\">Select</button>\n		</div>\n		<div class=\"plan-buttons\">\n			<button class=\"plan-confirm\" type=\"button\">Confirm</button>\n			<div class=\"beige or\">or</div>\n			<a class=\"btn-can plan-back\">Back</a>\n		</div>\n	</div>\n</div>";
},"useData":true});

this["JST"]["registerview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "vld-a";
},"3":function(depth0,helpers,partials,data) {
    return "vld-b";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"box box-reg box-reg-form\">\n	<h2>Create an Account</h2>\n	<h3>Just this one easy form and you're done!</h3>\n	<div class=\"reg-form-wrap\">\n		<form id=\"form-reg\" action=\"\">\n			<div class=\"vld-wrap vld-pair-one "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">1</div>						\n					</div>\n				</div>\n				<input type=\"text\" id=\"first-name\" name=\"reg-fn\" placeholder=\"First Name\" class=\"vld-aa\" data-vld=\"vld-a\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "\" autofocus />\n				<input class=\"inp-spa vld-bb\" type=\"text\" name=\"reg-ln\" placeholder=\"Last Name\" data-vld=\"vld-b\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "\" />				\n			</div>\n			<div class=\"vld-wrap vld-pair-two "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.company : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">2</div>							\n					</div>\n				</div>\n				<div class=\"reg-vrf\">\n					<input type=\"email\" name=\"reg-e\" placeholder=\"Email Address\" class=\"email vld-aa\" data-vld=\"vld-a\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0))
    + "\" spellcheck=\"false\" />\n					<div class=\"vrf\">\n						<div class=\"vrf-cir\"><i class=\"icon-cancel\"></i></div>\n						<div class=\"vrf-msg\">Already<br />In Use</div>\n					</div>\n				</div>\n				<div class=\"reg-vrf\">\n					<input class=\"inp-spa vld-bb company\" type=\"text\" name=\"reg-c\" placeholder=\"Company\" data-vld=\"vld-b\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.company : stack1), depth0))
    + "\" />\n					<div class=\"vrf\">\n						<div class=\"vrf-cir\"><i class=\"icon-cancel\"></i></div>\n						<div class=\"vrf-msg\">Already<br />In Use</div>\n					</div>\n				</div>\n			</div>\n			<div class=\"vld-wrap vld-pair-three\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">3</div>\n					</div>\n				</div>\n					<div class=\"reg-vrf\">\n						<input type=\"password\" class=\"reg-p vld-aa\" name=\"reg-p\" placeholder=\"Password\" class=\"vld-aa\" data-vld=\"vld-a\" />\n						<div class=\"vrf\">\n							<div class=\"vrf-cir vrf-count\">8</div>\n							<div class=\"vrf-msg\"></div>\n						</div>				\n					</div>\n					<div class=\"reg-vrf\">\n						<input class=\"inp-lst vld-bb\" type=\"password\" name=\"register-password-confirm\" placeholder=\"Repeat Password\" data-vld=\"vld-b\" disabled=\"disabled\" />\n						<div class=\"vrf\">\n							<div class=\"vrf-cir ok\"><i class=\"icon-ok-1\"></i></i></div>\n							<div class=\"vrf-msg\"></div>\n						</div>\n					</div>\n			</div>\n			<button class=\"details-confirm\" type=\"button\">Confirm</button>\n			<div class=\"beige or\">or</div>\n			<a class=\"btn-can\" href=\"/\">Cancel</a>\n		</form>\n	</div>\n</div>";
},"useData":true});

this["JST"]["resetpassview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Reset Your Password</h2>\n<h3 class=\"pass-tag\">Out with the old in with the new!</h3>\n<form id=\"form-pass\">\n	<input class=\"required\" type=\"email\" name=\"pass-e\" placeholder=\"Email Address\" />\n	<h3>A reset link will be sent to this email address, click the link and follow the simple directions.</h3>\n	<button class=\"reset\" type=\"button\">Reset</button>\n</form>\n<div class=\"beige\">or</div>\n<a class=\"btn-can\">Cancel</a>";
},"useData":true});

this["JST"]["resetview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-wel\">\n	<h2>Welcome to Houston</h2>\n	<h3 class=\"wel-tag\">Super-fast, easy to use frontline support</h3>\n		<h3>Get Houston!</h3>\n		<a href=\"/#/register\">Try Houston for 60 days, absolutely free!</a>\n</div>\n<div class=\"box box-log\">\n	<h2>Change Password</h2>\n	<h3 class=\"log-tag\">Please enter a new password below</h3>\n	<form id=\"form-pass-confirm\">\n		<div class=\"reg-vrf\">\n			<input class=\"reg-p required pass-input\" type=\"password\" name=\"pass\" placeholder=\"Password\" />\n			<div class=\"vrf\">\n				<div class=\"vrf-cir vrf-count\">8</div>\n				<div class=\"vrf-msg\"></div>\n			</div>				\n		</div>\n		<div class=\"reg-vrf\">	\n			<input class=\"inp-lst required\" type=\"password\" name=\"pass-c\" placeholder=\"Confirm Password\" />\n			<div class=\"vrf\">\n				<div class=\"vrf-cir ok\"><i class=\"icon-ok-1\"></i></i></div>\n				<div class=\"vrf-msg\"></div>\n			</div>\n		</div>'+				\n		<button class=\"reset\" type=\"button\">Confirm</button>\n		<div class=\"beige\">or</div>\n		<a href=\"/\" class=\"btn-can\">Cancel</a>\n	</form>	\n</div>\n<div class=\"box box-try\">\n	<h2>Try Houston</h2>\n	<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>\n	<a class=\"btn\" href=\"/#/register\">Lets Go</a>\n</div>";
},"useData":true});

this["JST"]["validateview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-wel\">\n	<h2>Welcome to Houston</h2>\n	<h3 class=\"wel-tag\">Super-fast, easy to use frontline support</h3>\n		<h3>Get Houston!</h3>\n		<a href=\"/register\">Try Houston for 60 days, absolutely free!</a>\n</div>\n<div class=\"box box-log\">\n	<h2>Set Password</h2>\n	<h3 class=\"verify-tag\">Please set your password below</h3>\n	<form id=\"form-verify\">\n		<div class=\"reg-vrf\">\n			<input class=\"reg-p required pass-input\" type=\"password\" name=\"pass\" placeholder=\"Password\" />\n			<div class=\"vrf\">\n				<div class=\"vrf-cir vrf-count\">8</div>\n				<div class=\"vrf-msg\"></div>\n			</div>						\n		</div>\n		<div class=\"reg-vrf\">					\n			<input class=\"inp-lst required\" type=\"password\" name=\"pass-c\" placeholder=\"Confirm Password\" />			\n			<div class=\"vrf\">\n				<div class=\"vrf-cir ok\"><i class=\"icon-ok-1\"></i></i></div>\n				<div class=\"vrf-msg\"></div>\n			</div>\n		</div>	\n		<h3>Just this final step and your new Houston account will be good to go!</h3>							\n		<button class=\"validate\" type=\"button\">Login</button>\n	</form>			\n</div>\n<div class=\"box box-try\">\n	<h2>Try Houston</h2>\n	<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>\n	<a class=\"btn\" href=\"/register\">Lets Go</a>	\n</div>";
},"useData":true});;var RegisterModel = Backbone.Model.extend({
	url:'/api/register'
});;var LoginFormView = Backbone.View.extend({
	className: "box box-log",
	template: JST.loginformview,

	initialize: function() {
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template());

		this.delegateEvents({
			'click .forgot': 'passwordView',
			'click .login': 'login'
		});

		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 13){
			e.preventDefault();
			this.login();
		} 
	},

	passwordView: function(){
		app.currentView.passReset = true;
		app.currentView.render();
	},	

	login: function(){
		if(!validate.validateForm(this.$el.find('#form-log'))) return;

		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');
		this.$el.find('.login').addClass('loading');

		var data = {
			user: this.$el.find('input[name="log-e"]').val(),
			password: this.$el.find('input[name="log-p"]').val(),
			remember: this.$el.find('input[name="log-r"]').is(':checked')
		};

		var request = $.ajax({
			url: "/api/auth/login",
			method: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});

		request.done(function(msg) {
			window.location.reload();
		});

		request.fail(function(jqXHR, textStatus){
			app.currentView.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			app.currentView.$el.find('.box-log h3.log-tag').hide().text('Please try again').addClass('text-animate');
			app.currentView.$el.find('.login').removeClass('loading');
		});
	}
});;var LoginView = Backbone.View.extend({
	template: JST.loginview,

	passReset: false,
	render: function (){
		var formView;
		console.log(this.template);
		this.$el.html(this.template());

		if(!this.passReset){
			formView = new LoginFormView();
		} else {
			formView = new ResetPassView();
		}

		this.showForm(formView);
		
		return this;
	},

	currentView: false,
	showForm: function(view) {
		if (this.currentView) this.currentView.close();

		this.currentView = view;
		this.$el.find('#login-form-wrap').append(this.currentView.$el);
		this.currentView.render();
	}	
});;var PaymentView = Backbone.View.extend({
	template: JST.paymentview,

	templateSuccess: JST.paymentviewsuccess,

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .payment-confirm': 'paymentConfirm',
			'click .payment-back': 'paymentBack'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.paymentBack();
		} else if (keyCode == 13){
			this.paymentConfirm();
		}
	},		

	paymentConfirm: function(){
		var form = this.$el.find('form');

		//Reset error text
		app.currentView.$el.find('h2 span').show().removeClass('text-animate-ib');
		app.currentView.$el.find('h3 span').show().removeClass('text-animate-ib');

		if(!this.paymentValidate(form)) return;

		// Disable the submit button to prevent repeated clicks
		form.find('.payment-confirm').prop('disabled', true).addClass('loading');

		// Get a token from Stripe API
		Stripe.card.createToken(form, this.responseHandler);

	},

	paymentValidate: function(form) {
		var valid = true;
		var inputs = form.find('input[type="text"]');
		inputs.each(function(){
			var input = $(this);
			if(!input.val()){
				input.addClass('error');
				valid = false;
			} else {
				input.removeClass('error');
			}
		});

		return valid;
	},

	paymentBack: function() {
		var planView = new PlanView({model: this.model});
		app.showView(planView);	
	},

	responseHandler: function(status, response){

		if(response.error){
			app.currentView.$el.find('h2 span').hide().text('OOPS!').addClass('text-animate-ib');
			app.currentView.$el.find('h3 span').hide().text('There was an error with your card details, please try again.').addClass('text-animate-ib');
			app.currentView.$el.find('.payment-confirm').prop('disabled', false).removeClass('loading');
		} else {
			app.currentView.model.set({
				stripeToken: response.id
			});
			app.currentView.model.save(app.currentView.model.attributes,
				{
					success: function(model, response, options){
						console.log(response);
						app.currentView.$el.html(app.currentView.templateSuccess());
					},
					error: function(model, response, options){
						console.log(response);
					}
				}
			);
		}
	},	
});;var PlanView = Backbone.View.extend({
	template: JST.planview,

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .plan-select': 'planSelect',
			'click .plan-confirm': 'planConfirm',
			'click .plan-back': 'planBack'
		});
	
		this.owlAnimation();

		return this;
	},

	owlAnimation: function(){

		this.owl = this.$el.find('#owl');
		this.eyes = this.$el.find('#eyes');
		this.leftWing = this.$el.find('.left-wing');
		this.rightWing = this.$el.find('.right-wing');
		this.wl = new TimelineMax({delay:.5});
		this.tl = new TimelineMax({delay:.5});

		this.wl.to(this.leftWing, 0.01, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp')
		.to(this.rightWing, 0.01, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp')

		.to(this.leftWing, 0.35, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown')
		.to(this.rightWing, 0.35, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown')

		.to(this.leftWing, 0.4, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp2')
		.to(this.rightWing, 0.4, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp2')

		.to(this.leftWing, 0.35, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown2')
		.to(this.rightWing, 0.35, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown2')

		.to(this.leftWing, 0.4, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, 'flapUp3')
		.to(this.rightWing, 0.4, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, 'flapUp3')		

		.to(this.leftWing, 0.8, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, 'flapDown3')
		.to(this.rightWing, 0.8, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, 'flapDown3');		

		
		this.tl.set(this.owl, {y: 2460, x: -200});

		this.tl.to(this.owl, 2.5, {y: -300, x: 0, ease: Back.easeOut.config(1)})
		.to(this.eyes, 0.5, {x:25, delay: 0.7})
		.to(this.eyes, 0.8, {x:-33, delay: 0.5})
		.to(this.eyes, 0.5, {x:0, delay: 0.5})
		.to(this.leftWing, 0.5, {x:5, y:-26, rotation: 4, transformOrigin:"top right", delay: 0.4}, 'shrugUp')
		.to(this.rightWing, 0.5, {x:-5, y:-26, rotation: -4, transformOrigin:"top left", delay: 0.4}, 'shrugUp')
		.to(this.leftWing, 0.5, {x:0, y:0, rotation: 0, transformOrigin:"top right"}, 'shrugDown')
		.to(this.rightWing, 0.5, {x:0, y:0, rotation: 0, transformOrigin:"top left"}, 'shrugDown');	
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.planBack();
		} else if (keyCode == 13){
			this.planConfirm();
		}
	},	

	planBack: function(){
		var registerView = new RegisterView({model: this.model});
		app.showView(registerView);	
	},

	planCount: "A",
	planSelect: function(e){
		var plan = $(e.currentTarget).data('plan');
		var currentPlan = this.model.get('plan');
		this.planCount += 'A';

		this.model.set({
			plan: plan
		});

		if(plan === 1){
			this.planSelectOne();

		} else if(plan === 2){
			this.planSelectTwo();

		}		
	},

	planSelectOne: function(){
		this.$el.find('.right-plan .vld-cir').removeClass('delayed-icon-animate');
		this.$el.find('.left-plan .vld-cir').addClass('delayed-icon-animate');

		this.tl.to(this.eyes, 0.6, {x:-33}, this.planCount)
		.to(this.rightWing, 0.4, {rotation: 0, transformOrigin:"55% 0%", ease: Power1.easeOut}, this.planCount)
		.to(this.leftWing, 0.6, {rotation: 120, transformOrigin:"45% 0%", ease: Power1.easeIn}, this.planCount);
	},

	planSelectTwo: function(){
		this.$el.find('.left-plan .vld-cir').removeClass('delayed-icon-animate');
		this.$el.find('.right-plan .vld-cir').addClass('delayed-icon-animate');

		this.tl.to(this.eyes, 0.6, {x:25}, this.planCount)
		.to(this.leftWing, 0.4, {rotation: 0, transformOrigin:"45% 0%", ease: Power1.easeOut}, this.planCount)
		.to(this.rightWing, 0.6, {rotation: -120, transformOrigin:"55% 0%", ease: Power1.easeIn}, this.planCount);		
	},

	planConfirm: function(){
		if(!this.model.get('plan')){
			this.$el.find('h2 span').hide().text('OOPS!').addClass('text-animate-ib');
			this.$el.find('h3 span').hide().text('Please choose a pricing plan to continue.').addClass('text-animate-ib');
		} else {					
			var paymentView = new PaymentView({model: this.model});
			app.showView(paymentView);
		}
	}
});;var RegisterView = Backbone.View.extend({
	template: JST.registerview,

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.model.unset('password');
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .details-confirm': 'detailsConfirm',
			'blur input': 'validate',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch',
			'focus .email': 'hideAlert',
			'focus .company': 'hideAlert'
		});
		return this;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			window.location.href = 'http://' + window.location.hostname;
		} else if (keyCode == 13){
			this.$el.find('form').focus();
			this.detailsConfirm();
		}
	},
	
	passMatch: function(e){
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e) {	
		validate.registerPasswordShowCount(e.currentTarget);
	},
	
	validate: function(e){
		validate.inputValidation(e.currentTarget);
	},
	
	detailsConfirm: function(){
		if(validate.registerCreateValidate(this.$el)){
			this.model.set({
				firstName: this.$el.find('input[name="reg-fn"]').val().capitalize(),
				lastName: this.$el.find('input[name="reg-ln"]').val().capitalize(),
				emailAddress: this.$el.find('input[name="reg-e"]').val(),
				company: this.$el.find('input[name="reg-c"]').val(),
				password: this.$el.find('input[name="reg-p"]').val()
			});

			var planView = new PlanView({model: this.model});
			app.showView(planView);	
		}
	}
});;var ResetPassView = Backbone.View.extend({
	className: "box box-pass",
	template: JST.resetpassview,

	initialize: function() {
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
	},

	render: function (){	
		this.$el.html(this.template());

		this.delegateEvents({
			'click .btn-can': 'resetCancel',
			'click .reset': 'resetPassword'
		});
		
		return this;
	},	

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode === 13){
			e.preventDefault();
			this.resetPassword();
		} else if (keyCode === 27){
			this.resetCancel();
		}
	},

	resetCancel: function(){
		app.currentView.passReset = false;
		app.currentView.render();
	},

	resetPassword: function() {
		if(!validate.validateForm(this.$el.find('#form-pass'))) return;

		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.pass-tag').show().removeClass('text-animate');

		var data = {
			emailAddress: this.$el.find('input[name="pass-e"]').val()
		};

		var request = $.ajax({
			url: "/api/auth/reset",
			method: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});

		request.done(function( msg ) {
			app.currentView.$el.find('.box-pass h2').hide().text('Reset Request Sent').addClass('text-animate');
			app.currentView.$el.find('.box-pass h3.pass-tag').hide().text('Please check your email').addClass('text-animate');
		});

		request.fail(function( jqXHR, textStatus ) {
			app.currentView.$el.find('.box-pass h2').hide().text('Oops!').addClass('text-animate');
			app.currentView.$el.find('.box-pass h3.pass-tag').hide().text('We dont recognise that email address.').addClass('text-animate');
		});
	}
});;var ResetView = Backbone.View.extend({
	template: JST.resetview,

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .reset': 'reset',
			'input input': 'resetErrorMessage',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch'
		});
		return this;
	},

	passMatch: function(e){
		console.log('match');
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e){	
		validate.registerPasswordShowCount(e.currentTarget);
	},	

	resetErrorMessage: function(){
		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.log-tag').show().removeClass('text-animate');
	},
		
	reset: function() {
		if(!validate.validateForm(this.$el.find('#form-pass-confirm'))) return;

		if(this.$el.find('input[name=pass]').val() !== this.$el.find('input[name="pass-c"]').val()) {
			this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			this.$el.find('.box-log h3.log-tag').hide().text('Please ensure passwords match').addClass('text-animate');		
			return;
		}
		
		this.model.url = '/api/auth/reset/complete';
		this.model.set({
			password: this.$el.find('input[name="pass-c"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: function(model,response,options){
					window.location.href = '';
				},
				error: _.bind(function(){
					this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
					this.$el.find('.box-log h3.log-tag').hide().text('Something went wrong').addClass('text-animate');
				}, this)
			}
		);	
	},
});;var ValidateView = Backbone.View.extend({
	template: JST.validateview,

	render: function (){	
		this.$el.html(this.template());
		this.delegateEvents({
			'click .validate': 'validate',
			'input input': 'resetErrorMessage',
			'focus .reg-p': 'showCount',
			'input .reg-p': 'passCount',
			'input .inp-lst': 'passMatch'
		});
		return this;
	},

	passMatch: function(e){
		console.log('match');
		validate.registerPasswordMatch(e.currentTarget);
	},
	
	passCount: function(e){
		validate.registerPasswordCount(e.currentTarget, this.$el);
	},
	
	showCount: function(e){	
		validate.registerPasswordShowCount(e.currentTarget);
	},	

	resetErrorMessage: function(){
		this.$el.find('h2').show().removeClass('text-animate');
		this.$el.find('h3.verify-tag').show().removeClass('text-animate');
	},
		
	validate: function() {
		if(!validate.validateForm(this.$el.find('#form-verify'))) return;

		if(this.$el.find('input[name=pass]').val() !== this.$el.find('input[name="pass-c"]').val()) {
			this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
			this.$el.find('.box-log h3.verify-tag').hide().text('Please ensure passwords match').addClass('text-animate');		
			return;
		}

		this.model.url = '/api/verify';
		this.model.set({
			password: this.$el.find('input[name="pass-c"]').val()
		});
		this.model.save(this.model.attributes,
			{
				success: function(model,response,options){
					window.location.href = '/profile';
				},
				error: _.bind(function(model, response){
					console.log(response);
					this.$el.find('.box-log h2').hide().text('Oops!').addClass('text-animate');
					this.$el.find('.box-log h3.verify-tag').hide().text('Something went wrong').addClass('text-animate');
				}, this)
			}
		);	
	},
});;Backbone.View.prototype.close = function(){
	this.remove();
	
	this.unbind();
	
	if (this.onClose){
		this.onClose();
	}
};;String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var validate = {
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
		var wrapper = input.closest('.vld-wrap');

		if(!value) valid = false;

		if(valid){
			if(input.is('input[type=email]')) valid = this.emailValidation(input, value, wrapper, css);

			if(input.hasClass('company')) this.companyValidation(input, value, wrapper, css);

			if(input.hasClass('reg-p')) valid = this.passwordValidation(value, length);

			if(input.hasClass('inp-lst')) valid = this.repeatPasswordValidation(value);
		}

		if(valid) {
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
			validate.successfulAjaxValidation(input, wrapper, css);
		});
		 
		request.fail(function(jqXHR, textStatus) {
			validate.failedAjaxValidation(input, wrapper, css);
		});
	},

	companyValidation: function(input, companyName, wrapper, css){

		var request = $.get("/api/check/company?company=" + companyName);

		request.done(function(msg) {
			validate.successfulAjaxValidation(input, wrapper, css);
		});
		 
		request.fail(function(jqXHR, textStatus) {
			validate.failedAjaxValidation(input, wrapper, css);
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

	registerPasswordShowCount: function(input) {	
		var input = $(input);
		if(validate.validatedPassword !== input.val()){
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
			inpLst.removeClass('password-resize');
			inpLst.closest('.reg-vrf').find('.vrf').fadeOut();
			inpLst.closest('.vld-wrap').removeClass('vld-a vld-b');
		} else {
			counter.html('<i class="icon-ok-1"></i>');
			counter.addClass('ok');
			inpLst.prop('disabled', false);

			// Set this.validatedPassword for set/reset password views when using this method
			if(input.hasClass('pass-input')){
				this.validatedPassword = input.val();
			}
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
			wrapper.removeClass(css); // Added to give effect
			input.removeClass('password-resize');
		}	
	},

	registerCreateValidate: function(view){
		if(view.find('div.vld-a').length == 3 && view.find('div.vld-b').length  == 3){
			return true;
		} else {

			return false;
		}
	}

};var AppRouter = Backbone.Router.extend({
	root: '/',
	routes: {
		"": "login",
		"reset/:token": "reset",
		"verify/:token": "validate",
		"register": "register",
		"*notFound": "login"
	},

	currentView: false,
	showView: function(view) {
		//Create a cached element to avoid re scanning the dom
		if(!this.appElement) this.appElement = $("#app");

		if (this.currentView) this.currentView.close();

		this.currentView = view;

		this.appElement.html(this.currentView.render().el);
	},
	
	login: function(){
		//clean url
		var loginView = new LoginView();

		this.showView(loginView);
	},

	reset: function(token){
		var resetModel = new Backbone.Model({'token': token});

		var resetView = new ResetView({model: resetModel});	

		this.showView(resetView);
	},

	validate: function(token){
		var validateModel = new Backbone.Model({'token': token});

		var validateView = new ValidateView({model: validateModel});

		this.showView(validateView);
	},
	
	register: function(){
		var registerModel = new RegisterModel();

		var registerView = new RegisterView({model: registerModel});

		this.showView(registerView);
	}
});

var app = new AppRouter();

$(function() {Backbone.history.start({pushState: true, root: app.root})});

$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
	var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
	var root = location.protocol + "//" + location.host + app.root;

	if (href.prop.slice(0, root.length) === root) {
		evt.preventDefault();
		Backbone.history.navigate(href.attr, true);
	}
});
//# sourceMappingURL=loginapp.js.map