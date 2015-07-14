this["JST"] = this["JST"] || {};

this["JST"]["accountview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>Manage Your Account</h2>\n		</div>\n	</div>\n</div>\n<div class=\"box-app\" style=\""
    + this.escapeExpression(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n</div>";
},"useData":true});

this["JST"]["analyticsview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>System Analytics</h2>\n		</div>\n	</div>\n</div>\n<div class=\"box-app\" style=\""
    + this.escapeExpression(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n</div>";
},"useData":true});

this["JST"]["clientsview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"company-stream\">\n	<div id=\"modal-form\" class=\"active\">\n		<div class=\"modal-window-inner\">\n            <div class=\"modal-outer\">\n				<div class=\"modal-wrap\">\n					<div class=\"box\">\n						<form>\n							<h3>Text</h3>\n							<h4>Text</h4>\n							<div class=\"modal-buttons\">\n								<input id=\"modal-form-input\" type=\"text\" />\n								<div class=\"validated-marker\">\n			                        <div class=\"vrf-cir\">\n			                            <i class=\"icon-cancel\"></i>\n			                        </div>\n			                    </div>\n								<button class=\"confirm\" type=\"button\">OK</button>\n								<div class=\"beige or\">or</div>\n								<button class=\"btn-can\" type=\"button\">Cancel</button>\n							</div>\n						</form>\n					</div>\n				</div>\n			</div>\n        </div>\n	</div>\n	<ul id=\"clients-stream\">\n	</ul>\n</div>";
},"useData":true});

this["JST"]["clientview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"company-info\">\n	<h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n	<a class=\"edit-client\" data-form=\"3\" data-model=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">Rename</a>\n	<a class=\"delete-client\">Delete</a>\n	<a class=\"new-client-user\" data-form=\"2\" data-model=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">New User</a>\n</div>\n<div class=\"client-stream\">\n	<ul class=\"client-user-stream\">\n	</ul>\n</div>";
},"useData":true});

this["JST"]["fileuploadview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "		<li class=\"file\">\n			<div class=\"file-text "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1), depth0))
    + "\">\n				<img class=\"svg-loader\" src=\"/application/assets/img/oval.svg\" width=\"52\" alt=\"Loading\">\n  				<div class=\"file-icon\">\n  					<span>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.type : stack1),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "  					</span>\n  				</div>\n  				<div class=\"file-info\">\n					<div class=\"filename\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n					<a data-cid=\""
    + alias2(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"cid","hash":{},"data":data}) : helper)))
    + "\" class=\"file-del\">Delete</a>\n"
    + ((stack1 = helpers.unless.call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</div>			\n		</li>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return "  					"
    + this.escapeExpression((helpers.formatFileType || (depth0 && depth0.formatFileType) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.type : stack1),{"name":"formatFileType","hash":{},"data":data}))
    + "\n";
},"4":function(depth0,helpers,partials,data) {
    return "  					FILE\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return "						"
    + this.escapeExpression((helpers.showFileUploadPreviewLink || (depth0 && depth0.showFileUploadPreviewLink) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.type : stack1),((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.target : stack1),(depth0 != null ? depth0.cid : depth0),{"name":"showFileUploadPreviewLink","hash":{},"data":data}))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"attach-files\">\n	<a class=\"attach-link\">Attach files to this ticket</a>\n	<div class=\"supported\">Supported -</div>\n	<ul class=\"filetypes\">\n		<li>Jpg</li>\n		<li>Png</li>\n		<li>Gif</li>\n		<li>Pdf</li>\n	</ul>\n	<div class=\"file-input-wrapper\">\n		<div id=\"drop_zone\">Drop files here</div>\n		<input type=\"file\" id=\"filesInput\" name=\"files[]\" multiple />\n	</div>\n	<ul id=\"files\" class=\"files\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});

this["JST"]["formview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>Create Ticket</h2>\n		</div>\n	</div>\n</div>\n<div class=\"box-app\" style=\""
    + this.escapeExpression(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n	<form id=\"form-new\">\n		<input type=\"text\" class=\"required new-sub\" name=\"new-sub\" placeholder=\"The problem in one sentence\" />\n		<div class=\"char-count\"><span>75</span> Characters Remaining</div>\n		<textarea class=\"required\" name=\"new-textarea\" placeholder=\"Please provide the specifics of your problem here\"></textarea>\n		<div id=\"file-upload-view-wrap\">\n		</div>\n		<button class=\"save\" type=\"button\">Create Ticket</button>\n		<div class=\"beige or\">or</div>\n		<a class=\"cancel-btn ib\">Cancel</a>\n	</form>\n</div>";
},"useData":true});

this["JST"]["messagesview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "	<li class=\"msg from-"
    + alias2((helpers.getUserRoleAsClass || (depth0 && depth0.getUserRoleAsClass) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserRoleAsClass","hash":{},"data":data}))
    + "\">\n		<div class=\"msg-dtl\">\n			<img class=\"avatar\" src=\""
    + alias2((helpers.getUserAvatar || (depth0 && depth0.getUserAvatar) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserAvatar","hash":{},"data":data}))
    + "\" alt=\""
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "\" />\n			<div class=\"msg-dtl-inr\">\n				<h3 class=\"msg-agent\">"
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</h3>\n				<h4 class=\"msg-company\">"
    + alias2((helpers.getCompanyName || (depth0 && depth0.getCompanyName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getCompanyName","hash":{},"data":data}))
    + "</h4>\n				<div class=\"msg-date\">"
    + alias2((helpers.convertToDateTime || (depth0 && depth0.convertToDateTime) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.date : stack1),{"name":"convertToDateTime","hash":{},"data":data}))
    + "</div>\n			</div>\n			<div class=\"msg-tri\"></div>\n		</div>\n		<div class=\"msg-body\">\n			<div>\n				"
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.message : stack1), depth0))
    + "\n			</div>\n			<ul class=\"files\" data-reply=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.files : stack1),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n			"
    + alias2((helpers.downloadTicketAttachments || (depth0 && depth0.downloadTicketAttachments) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.files : stack1),{"name":"downloadTicketAttachments","hash":{},"data":data}))
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.$last : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "	</li>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "				<li class=\"file\">\n					<div class=\"file-text\">\n		  				<div class=\"file-icon\">\n		  					<span>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "		  					</span>\n		  				</div>\n		  				<div class=\"file-info\">\n							<div class=\"filename\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n							"
    + alias3((helpers.showFilePreviewLink || (depth0 && depth0.showFilePreviewLink) || alias1).call(depth0,(depth0 != null ? depth0.type : depth0),(data && data.index),{"name":"showFilePreviewLink","hash":{},"data":data}))
    + "\n							<a data-bypass=\"true\" href=\"/api/tickets/file/"
    + alias3(((helper = (helper = helpers.ref || (depth0 != null ? depth0.ref : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ref","hash":{},"data":data}) : helper)))
    + "\">Download</a>\n						</div>\n					</div>\n				</li>\n";
},"3":function(depth0,helpers,partials,data) {
    return "		  					"
    + this.escapeExpression((helpers.formatFileType || (depth0 && depth0.formatFileType) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.type : depth0),{"name":"formatFileType","hash":{},"data":data}))
    + "\n";
},"5":function(depth0,helpers,partials,data) {
    return "		  					FILE\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "			<a class=\"btn reply-btn\">Reply</a>\n		</div>\n		<div class=\"reply\">\n			<form id=\"form-reply\">\n				<textarea class=\"required\" name=\"new-textarea\" placeholder=\"Please add your comments here...\"></textarea>\n				<div id=\"file-upload-view-wrap\">\n				</div>\n				"
    + this.escapeExpression(((helper = (helper = helpers.outputMarkAsCompleted || (depth0 != null ? depth0.outputMarkAsCompleted : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"outputMarkAsCompleted","hash":{},"data":data}) : helper)))
    + "\n				<div class=\"reply-submit-buttons\">\n					<button class=\"add-message\" type=\"button\">Submit</button>\n					<div class=\"beige or\">or</div>\n					<a class=\"cancel-btn ib\">Cancel</a>\n				</div>\n			</form>\n		</div>\n";
},"9":function(depth0,helpers,partials,data) {
    return "		</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.forEach || (depth0 && depth0.forEach) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"forEach","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["modalview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "			<div class=\"beige or\">or</div>\n			<button class=\"btn-can\" type=\"button\">Cancel</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-outer\">\n	<div class=\"modal-wrap\">\n		<div class=\"box\">\n		<h3>"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</h3>\n		<h4>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</h4>\n		<div class=\"modal-buttons\">\n			<button class=\"confirm\" type=\"button\">OK</button>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cancel : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		</div>\n	</div>\n</div>";
},"useData":true});

this["JST"]["peopleview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "			<li class=\"person\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.verify : stack1),true,{"name":"ifCond","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "				"
    + this.escapeExpression((helpers.displayAgentDelete || (depth0 && depth0.displayAgentDelete) || alias1).call(depth0,(depth0 != null ? depth0.id : depth0),{"name":"displayAgentDelete","hash":{},"data":data}))
    + "\n			</li>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "					<img class=\"avatar\" src=\""
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "\" />\n					<h3>"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</h3>\n					<h4>"
    + alias2((helpers.convertUserRole || (depth0 && depth0.convertUserRole) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.role : stack1),{"name":"convertUserRole","hash":{},"data":data}))
    + "</h4>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1), depth0));
},"5":function(depth0,helpers,partials,data) {
    return "application/assets/img/avatar.png";
},"7":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0));
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0));
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return "					<img class=\"avatar\" src=\"application/assets/img/avatar.png\" />\n					<h3>"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0))
    + "</h3>\n					<h4>Awaiting Verification</h4>\n					<a class=\"resend-verification\">Resend</a> \n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>People</h2>\n			<a class=\"btn new-client\" data-form=\"1\">New Client</a>\n			<a class=\"btn\" data-form=\"0\">New Agent</a>\n		</div>\n	</div>\n</div>\n<div class=\"box-app box-people\" style=\""
    + this.escapeExpression(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n	<div id=\"agent-stream\">\n	<h2>Support Agents</h2>\n		<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<h2 class=\"people-clients-header\">Clients</h2>\n	<div id=\"clients-wrap\">\n	</div>\n</div>";
},"useData":true});

this["JST"]["previewwindow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.preview : stack1),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "		<div class=\"preview-wrap\">\n			<div class=\"preview-img-wrap\">\n				<i class=\"preview-close icon-cancel-circled\"></i>\n				<div class=\"preview-img-box\">\n					<div class=\"preview-img-info\">\n						<div class=\"preview-prev\">\n							"
    + alias2((helpers.generateFilePreviousLink || (depth0 && depth0.generateFilePreviousLink) || alias1).call(depth0,(data && data.index),{"name":"generateFilePreviousLink","hash":{},"data":data}))
    + "				\n						</div>\n						<h3 class=\"preview-filename\">"
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n						<div class=\"preview-next\">	\n							"
    + alias2((helpers.generateFileNextLink || (depth0 && depth0.generateFileNextLink) || alias1).call(depth0,(data && data.index),((stack1 = (depth0 != null ? depth0.collection : depth0)) != null ? stack1.length : stack1),{"name":"generateFileNextLink","hash":{},"data":data}))
    + "\n						</div>\n					</div>\n					<div class=\"img-wrap\">					\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.type : stack1),"application/pdf",{"name":"ifCond","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "					</div>\n					<div class=\"preview-img-bottom\">\n						<div class=\"preview-type\">\n							"
    + alias2((helpers.formatFileType || (depth0 && depth0.formatFileType) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.type : stack1),{"name":"formatFileType","hash":{},"data":data}))
    + "\n						</div>\n						<div class=\"preview-download\">\n							<a data-bypass=\"true\" href=\""
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.ref : stack1),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\"><i class=\"icon-down-circled2\"></i></a>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "						    <object data=\"/api/tickets/file/inline/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.ref : stack1), depth0))
    + "\" type=\"application/pdf\" width=\"100%\" height=\"100%\" frameborder=\"0\"> alt : <a href=\"/api/tickets/file/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.ref : stack1), depth0))
    + "\">test.pdf</a> </object>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "						    <img class=\"preview-img\" style=\"max-height:"
    + this.escapeExpression(((helper = (helper = helpers.maxHeightImg || (depth0 != null ? depth0.maxHeightImg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"maxHeightImg","hash":{},"data":data}) : helper)))
    + "px;\" src=\""
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.ref : stack1),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\" />	\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return "/api/tickets/file/"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.ref : stack1), depth0));
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.target : stack1), depth0));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["profileview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1), depth0));
},"3":function(depth0,helpers,partials,data) {
    return "application/assets/img/avatar.png";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailNotifications : stack1), depth0));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=this.lambda;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>Manage Your Profile</h2>\n		</div>\n	</div>\n</div>\n<div class=\"box-app profile\" style=\""
    + alias1(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n	<form id=\"form-profile-details\">	\n        <h3>Your Details</h3>			\n		<div class=\"profile-input-wrap\">\n			<label for=\"first-name\">First Name</label>\n			<input id=\"first-name\" name=\"firstName\" type=\"text\" placeholder=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "\" />\n		</div>\n		<div class=\"profile-input-wrap\">\n			<label for=\"last-name\">Last Name</label>\n			<input id=\"last-name\" name=\"lastName\" type=\"text\" placeholder=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "\" />\n		</div>\n		<div class=\"profile-input-wrap\">\n			<label for=\"email-address\">Email Address</label>\n			<input id=\"email-address\" name=\"emailAddress\" type=\"email\" placeholder=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0))
    + "\" />\n			<h4 class=\"profile-tooltip\">A validation link will be sent to your email address for verification.</h4>\n            <div class=\"in-use-marker\">\n                <div class=\"vrf-cir\">\n                    <i class=\"icon-cancel\"></i>\n                </div>\n            </div>\n		</div>\n		<button type=\"button\">Update</button>\n		<div class=\"beige or\">or</div>\n		<a class=\"cancel-btn\">Cancel</a>\n		<div class=\"response\">\n			<h3>Your profile was succesfully updated</h3>\n		</div>\n	</form>\n	<h3>Update Password</h3>\n	<form id=\"form-profile-password\">\n        <div class=\"profile-input-wrap\">\n			<input class=\"current-password\" type=\"password\" placeholder=\"Current Password\" />\n            <div class=\"validated-marker\">\n                <div class=\"vrf-cir ok\">\n                    <i class=\"icon-ok-1\"></i>\n                </div>\n            </div>\n        </div>    \n        <div class=\"profile-input-wrap\">\n		    <input class=\"new-password\" type=\"password\" placeholder=\"New Password\" disabled />\n            <div class=\"validated-marker\">\n                <div class=\"vrf-cir vrf-count\">8</div>\n            </div>\n        </div>\n        <div class=\"profile-input-wrap\">\n		    <input class=\"repeat-password\" type=\"password\" placeholder=\"Repeat Password\" disabled />\n            <div class=\"validated-marker\">\n                <div class=\"vrf-cir ok\">\n                    <i class=\"icon-ok-1\"></i>\n                </div>\n            </div>\n        </div>\n		<button type=\"button\">Update</button>\n		<div class=\"beige or\">or</div>\n		<a class=\"cancel-btn\">Cancel</a>\n		<div class=\"response\">\n			<h3>Your password has been updated</h3>\n		</div>\n	</form>\n    <div class=\"profile-avatar\">\n        <h3>Avatar</h3>                    \n        <div id=\"avatar-drop\">\n            <img class=\"avatar\" src=\""
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" />\n        </div>\n        <h4 class=\"profile-avatar-prompt\">Drag and drop image onto area above to update.</h4> \n        <a class=\"update-avatar-link\">Add image from file</a>\n        <input type=\"file\" id=\"filesInput\" name=\"files\" />\n        <div id=\"canvas-wrap\"></div>\n    </div>\n    <div class=\"email-notifications\">\n        <h3>Email Notifications</h3>\n        <div class=\"toggle-button-wrap\">\n            <div class=\"toggle-button-outer "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailNotifications : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <div class=\"on\">on</div>\n                <div class=\"off\">off</div>\n                <div class=\"toggle-button\"></div>\n            </div>\n            <label>Ticket Emails</label>\n        </div>\n        <div class=\"toggle-button-wrap\">\n            <div class=\"toggle-button-outer "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailNotifications : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <div class=\"on\">on</div>\n                <div class=\"off\">off</div>\n                <div class=\"toggle-button\"></div>\n            </div>\n            <label>System Emails</label>\n        </div>\n        <div class=\"toggle-button-wrap\">\n            <div class=\"toggle-button-outer "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailNotifications : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <div class=\"on\">on</div>\n                <div class=\"off\">off</div>\n                <div class=\"toggle-button\"></div>\n            </div>\n            <label>Houston Newsletter</label>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["JST"]["ticketheaderview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "	"
    + alias2((helpers.generateDropSwitch || (depth0 && depth0.generateDropSwitch) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1),{"name":"generateDropSwitch","hash":{},"data":data}))
    + "					\n	<div class=\"dropdown droplist\">\n		<div class=\"drop-top rounded\">\n			<div class=\"btn in-progress drop-slct\"><span>"
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</span><i class=\"icon-down-dir-1\"></i></div>\n		</div>						\n		<ul class=\"drop\">\n			"
    + alias2(((helper = (helper = helpers.populateAgentDropdown || (depth0 != null ? depth0.populateAgentDropdown : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"populateAgentDropdown","hash":{},"data":data}) : helper)))
    + "\n		</ul>\n	</div>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "	<div class=\"btn new\">New</div>\n	<div class=\"dropdown droplist\">\n		<div class=\"drop-top rounded\">\n			<div class=\"btn in-progress drop-slct\">Awaiting Agent<i class=\"icon-down-dir-1\"></i></div>\n		</div>						\n		<ul class=\"drop\">\n			"
    + this.escapeExpression(((helper = (helper = helpers.populateAgentDropdown || (depth0 != null ? depth0.populateAgentDropdown : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"populateAgentDropdown","hash":{},"data":data}) : helper)))
    + "\n		</ul>\n	</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Ticket #"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.reference : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["ticketheaderviewuser"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "	<div class=\"btn "
    + alias2((helpers.convertToClass || (depth0 && depth0.convertToClass) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1),{"name":"convertToClass","hash":{},"data":data}))
    + "\">"
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1), depth0))
    + "</div>\n	<div class=\"btn ticketheader-agent\">"
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</div>\n";
},"3":function(depth0,helpers,partials,data) {
    return "	<div class=\"btn new\">New</div>\n	<div class=\"btn on-hold\">Awaiting Agent</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Ticket #"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.reference : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["ticketsview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "		<li class=\"ticket\">\n			<a href=\"/tickets/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n				<div class=\"update-alert "
    + alias2((helpers.updateCheck || (depth0 && depth0.updateCheck) || alias3).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.updated : stack1),{"name":"updateCheck","hash":{},"data":data}))
    + "\"></div>\n				<div class=\"ticket-info\">					\n					<div class=\"date\">"
    + alias2((helpers.convertToDate || (depth0 && depth0.convertToDate) || alias3).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.date : stack1),{"name":"convertToDate","hash":{},"data":data}))
    + "</div>\n					<div class=\"ticket-info-inner\">\n						<div class=\"name\">"
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias3).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</div>\n						<div class=\"company-name\">"
    + alias2((helpers.getCompanyName || (depth0 && depth0.getCompanyName) || alias3).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getCompanyName","hash":{},"data":data}))
    + "</div>\n						<div class=\"summary\"><span>#"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.reference : stack1), depth0))
    + "</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.subject : stack1), depth0))
    + "</div>\n					</div>\n				</div>\n				<div class=\"ticket-status\">\n					<div class=\"btn "
    + alias2((helpers.convertToClass || (depth0 && depth0.convertToClass) || alias3).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1),{"name":"convertToClass","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.status : stack1), depth0))
    + "</div>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				</div>\n			</a>\n		</li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "						<div class=\"ticket-agent\">"
    + this.escapeExpression((helpers.getUserName || (depth0 && depth0.getUserName) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.agent : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</div>\n";
},"5":function(depth0,helpers,partials,data) {
    return "						<div class=\"ticket-agent\">Awaiting Agent</div>\n";
},"7":function(depth0,helpers,partials,data) {
    return "	<h4 class=\"no-tickets\">No tickets to display</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n		<div class=\"box-app-top\">\n			<h2>Open Tickets</h2>\n			<a href=\"/tickets/new\" class=\"btn\">New Ticket</a>\n		</div>	\n		<div class=\"box-app-nav\">\n			<div class=\"helper\">\n				<div class=\"box-app-nav-inner\">\n					<div class=\"sort\">\n						<a class=\"sortByDate\">Sort By Date "
    + alias3(((helper = (helper = helpers.dateArrow || (depth0 != null ? depth0.dateArrow : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dateArrow","hash":{},"data":data}) : helper)))
    + "</a>\n						<a class=\"sortByCompany mid-link\">Sort By Company "
    + alias3(((helper = (helper = helpers.companyArrow || (depth0 != null ? depth0.companyArrow : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"companyArrow","hash":{},"data":data}) : helper)))
    + "</a>\n					</div>\n					<div class=\"filter\">\n						\n						<a class=\"allTickets\">All<span> Tickets</span></a>\n						<a class=\"updatedTickets\">Updated<span> Tickets</span></a>\n						<a class=\"myTickets\"><span class=\"mine\">Mine</span><span>My Tickets</span></a>\n						<a class=\"completedTickets\">Completed<span> Tickets</span></a>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n<div class=\"box-app tickets-box-app\" style=\""
    + alias3(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">\n	<ul id=\"ticket-stream\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "	</ul>\n	<div class=\"loader\">\n	<div class=\"otloader\"></div>\n	</div>\n</div>";
},"useData":true});

this["JST"]["ticketview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "				<li class=\"file\">\n					<div class=\"file-text\">\n		  				<div class=\"file-icon\">\n		  					<span>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "		  					</span>\n		  				</div>\n		  				<div class=\"file-info\">\n							<div class=\"filename\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n							"
    + alias3((helpers.showFilePreviewLink || (depth0 && depth0.showFilePreviewLink) || alias1).call(depth0,(depth0 != null ? depth0.type : depth0),(data && data.index),{"name":"showFilePreviewLink","hash":{},"data":data}))
    + "\n							<a data-bypass=\"true\" href=\"/api/tickets/file/"
    + alias3(((helper = (helper = helpers.ref || (depth0 != null ? depth0.ref : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ref","hash":{},"data":data}) : helper)))
    + "\">Download</a>\n						</div>\n					</div>\n				</li>	\n";
},"2":function(depth0,helpers,partials,data) {
    return "		  					"
    + this.escapeExpression((helpers.formatFileType || (depth0 && depth0.formatFileType) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.type : depth0),{"name":"formatFileType","hash":{},"data":data}))
    + "\n";
},"4":function(depth0,helpers,partials,data) {
    return "		  					FILE\n";
},"6":function(depth0,helpers,partials,data) {
    return "			</div>											\n";
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "		<a class=\"btn reply-btn\">Reply</a>\n		</div>\n		<div class=\"reply\">\n			<form id=\"form-reply\">\n				<textarea class=\"required\" name=\"new-textarea\" placeholder=\"Please add your comments here...\"></textarea>	\n				<div id=\"file-upload-view-wrap\">	\n				</div>\n				"
    + this.escapeExpression(((helper = (helper = helpers.outputMarkAsCompleted || (depth0 != null ? depth0.outputMarkAsCompleted : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"outputMarkAsCompleted","hash":{},"data":data}) : helper)))
    + "\n				<div class=\"reply-submit-buttons\">\n					<button class=\"add-message\" type=\"button\">Submit</button>\n					<div class=\"beige or\">or</div>\n					<a class=\"cancel-btn ib\">Cancel</a>\n				</div>\n			</form>\n		</div>					\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "<div class=\"box-app-fixed\">\n	<div class=\"box-app-fixed-inner\">\n	</div>\n</div>			\n<ul id=\"msg-stream\" class=\"box-app\" style=\""
    + alias2(((helper = (helper = helpers.fullHeightPage || (depth0 != null ? depth0.fullHeightPage : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"fullHeightPage","hash":{},"data":data}) : helper)))
    + "\">		\n	<li class=\"msg from-"
    + alias2((helpers.getUserRoleAsClass || (depth0 && depth0.getUserRoleAsClass) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserRoleAsClass","hash":{},"data":data}))
    + "\">\n		<div class=\"msg-dtl\">\n			<img class=\"avatar\" src=\""
    + alias2((helpers.getUserAvatar || (depth0 && depth0.getUserAvatar) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserAvatar","hash":{},"data":data}))
    + "\" alt=\""
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "\"/>\n			<div class=\"msg-dtl-inr\">\n				<h3 class=\"msg-agent\">"
    + alias2((helpers.getUserName || (depth0 && depth0.getUserName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getUserName","hash":{},"data":data}))
    + "</h3>\n				<h4 class=\"msg-company\">"
    + alias2((helpers.getCompanyName || (depth0 && depth0.getCompanyName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.authorID : stack1),{"name":"getCompanyName","hash":{},"data":data}))
    + "</h4>\n				<div class=\"msg-date\">"
    + alias2((helpers.convertToDateTime || (depth0 && depth0.convertToDateTime) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.date : stack1),{"name":"convertToDateTime","hash":{},"data":data}))
    + "</div>\n			</div>\n			<div class=\"msg-tri\"></div>\n		</div>\n		<div class=\"msg-body\">					\n			<div class=\"msg-subject\">\n				<h5>"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.subject : stack1), depth0))
    + "</h5>	\n				<span>Ticket #"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.reference : stack1), depth0))
    + "</span>						\n			</div>\n			<div>\n				"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.message : stack1), depth0))
    + "							\n			</div>						\n			<ul class=\"files\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.files : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n			"
    + alias2((helpers.downloadTicketAttachments || (depth0 && depth0.downloadTicketAttachments) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.files : stack1),{"name":"downloadTicketAttachments","hash":{},"data":data}))
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.messagesCollection : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "	</li>\n	<div id=\"messages-wrap\">\n	</div>	\n</ul>";
},"useData":true});

this["JST"]["userview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1), depth0));
},"3":function(depth0,helpers,partials,data) {
    return "application/assets/img/avatar.png";
},"5":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0));
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0));
},"9":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "	<h4>"
    + alias2((helpers.getCompanyName || (depth0 && depth0.getCompanyName) || alias1).call(depth0,(depth0 != null ? depth0.id : depth0),{"name":"getCompanyName","hash":{},"data":data}))
    + " "
    + alias2((helpers.convertUserRole || (depth0 && depth0.convertUserRole) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.role : stack1),{"name":"convertUserRole","hash":{},"data":data}))
    + "</h4>\n";
},"11":function(depth0,helpers,partials,data) {
    return "	<h4>Awaiting Verification</h4>\n	<a class=\"resend-verification\">Resend</a> \n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<img class=\"avatar\" src=\""
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.avatar : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "\" />\n<h3>"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</h3>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.verify : stack1),true,{"name":"ifCond","hash":{},"fn":this.program(9, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "<a class=\"delete-user\">Delete</a>";
},"useData":true});