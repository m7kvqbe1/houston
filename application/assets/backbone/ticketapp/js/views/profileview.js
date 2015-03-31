// define Selection draw method
var ProfileView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">' +
					'<h2>Manage Your Profile</h2>' +
				'</div>' +
			'</div>'+
		'</div>'+
		'<div class="box-app profile" style="{{fullHeightPage}}">' +
			'<h3>Your Details</h3>'+
			'<form id="form-profile-details">'+				
				'<div>'+
					'<label>First Name</label>'+
					'<input type="text" placeholder="{{attributes.firstName}}" />'+
				'</div>'+
				'<div>'+
					'<label>Last Name</label>'+
					'<input type="text" placeholder="{{attributes.lastName}}" />'+
				'</div>'+
				'<div>'+
					'<label>Email Address</label>'+
					'<input type="email" placeholder="{{attributes.emailAddress}}" />'+
				'</div>'+
				'<button type="button">Update</button>'+
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib">Cancel</a>' +
			'</form>'+
			'<h3>Update Password</h3>'+
			'<form id="form-profile-password">'+
				'<input type="password" placeholder="Current Password" />'+
				'<input type="password" placeholder="New Password" />'+
				'<input type="password" placeholder="Repeat Password" />'+
				'<button type="button">Update</button>'+
				'<div class="beige or">or</div>' +
				'<a class="cancel-btn ib">Cancel</a>' +
			'</form>'+
            '<div class="profile-avatar">'+
                '<h3>Avatar</h3>'+                    
                '<div id="avatar-drop">'+
                    '<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" />'+
                '</div>'+
                '<h4 class="profile-avatar-prompt">Drag and drop image onto area above to update</h4>'+ 
                '<a class="update-avatar-link">Add image from file</a>'+
                '<input type="file" id="filesInput" name="files" />'+
                '<div id="canvas-wrap"></div>'+
            '</div>'+
            '<div class="email-notifications">'+
                '<h3>Email Notifications</h3>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>Ticket Emails</label>'+
                '</div>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>System Emails</label>'+
                '</div>'+
                '<div class="toggle-button-wrap">'+
                    '<div class="toggle-button-outer {{#if attributes.emailNotifications}}{{attributes.emailNotifications}}{{/if}}">'+
                        '<div class="on">on</div>'+
                        '<div class="off">off</div>'+
                        '<div class="toggle-button"></div>'+
                    '</div>'+
                    '<label>Houston Newsletter</label>'+
                '</div>'+
            '</div>'+
		'</div>'
	),
	
	initialize: function() {
		this.listenTo(this.model, "sync add change", this.render);	


        this.selection.prototype.draw = function(view){
            view.ctx.strokeStyle = '#000';
            view.ctx.lineWidth = 2;
            view.ctx.strokeRect(this.x, this.y, this.w, this.h);

            // draw part of original image
            if (this.w > 0 && this.h > 0) {
                view.ctx.drawImage(view.image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
            }

            // draw resize cubes
            view.ctx.fillStyle = '#fff';
            view.ctx.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
            view.ctx.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
            view.ctx.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
            view.ctx.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);
        };

	},

	onClose: function(){
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template(this.model));
		this.delegateEvents({
			'click .update-avatar-link': 'fileDialogTrigger',
			'change #filesInput': 'handleFileSelect',
			'dragover #avatar-drop': 'handleDragOver',
			'dragleave #avatar-drop': 'handleDragLeave',
			'drop #avatar-drop': 'handleDragFileSelect',
			'click .toggle-button-outer': 'toggleEmails',

            'mousemove #panel': 'canvasMousemove',
            'mousedown #panel': 'canvasMousedown',
            'mouseup #panel': 'canvasMouseup',
            'click .crop': 'getResults'
        });

		return this;
	},

	fileDialogTrigger: function(){
		this.$el.find('#filesInput').trigger('click');
	},

	handleFileSelect: function(evt) {
		this.addAvatar(evt.target.files[0]);
	},

	handleDragFileSelect: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	    this.addAvatar(evt.dataTransfer.files[0]);
	},

	handleDragOver: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).addClass('drop-highlight');
	    evt.dataTransfer.dropEffect = 'copy';     
	},

	handleDragLeave: function(evt){
		evt.stopPropagation();
	    evt.preventDefault();
	    $(evt.currentTarget).removeClass('drop-highlight');
	},

	addAvatar: function(file){
		var reader = new FileReader();

	    reader.onloadend = _.bind((function(theFile) {
	        return function(e) {
                this.addImageToCanvas(e.target.result);
	        };
        })(file), this);

        reader.readAsDataURL(file);
	}, 

	toggleEmails: function(evt){
		$(evt.currentTarget).toggleClass('on');
	},

	canvas: null, 
	image: null,
	iMouseX: null,
	iMouseY: 1,
	theSelection: null,

    addImageToCanvas: function(imgSrc){
        //Create Image object and pass it uploaded data
        this.image = new Image();
        this.image.src = imgSrc;
        var originalWidth = this.image.width;
        var originalHeight = this.image.height;

        //If image too wide then resize RESIZE FOR TOO TALL ALSO
        if(originalWidth > 880) {
            var imageWidth = 880;
            var widthDifference = originalWidth - imageWidth;
            var percentageDecrease = widthDifference / (originalWidth / 100);
            var imageHeight = originalHeight - ((originalHeight / 100) * percentageDecrease);

            //Draw resized image onto temporary canvas and set that to this.image
            var temp_ctx, temp_canvas;
            temp_canvas = document.createElement('canvas');
            temp_ctx = temp_canvas.getContext('2d');
            temp_canvas.width = imageWidth;
            temp_canvas.height = imageHeight;
            temp_ctx.drawImage(this.image, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
            this.image.src = temp_canvas.toDataURL();
            console.log('resizing');
        } 

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        $(this.canvas).attr({'width': this.image.width, 'height': this.image.height, id: 'panel'});

        $('#canvas-wrap').html('<div class="canvas-wrap-inner"></div><button class="crop" type="button">Crop and Save</button>');
        $('.canvas-wrap-inner').html(this.canvas)
        $('#canvas-wrap').addClass('active');

        // create initial selection
        this.theSelection = new this.selection(200, 200, 200, 200);

        this.drawScene();
    },    

    // define Selection constructor
    selection: function(x, y, w, h){
        this.x = x; // initial positions
        this.y = y;
        this.w = w; // and size
        this.h = h;

        this.px = x; // extra variables to dragging calculations
        this.py = y;

        this.csize = 6; // resize cubes size
        this.csizeh = 10; // resize cubes size (on hover)

        this.bHow = [false, false, false, false]; // hover statuses
        this.iCSize = [this.csize, this.csize, this.csize, this.csize]; // resize cubes sizes
        this.bDrag = [false, false, false, false]; // drag statuses
        this.bDragAll = false; // drag whole selection
    },

    drawScene: function() { // main drawScene function
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // clear canvas

        // draw source image
        this.ctx.drawImage(this.image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // and make it darker
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // draw selection
        this.theSelection.draw(this);
    },

    canvasMousemove: function(e) { // binding mouse move event
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        // in case of drag of whole selector
        if (this.theSelection.bDragAll) {
            this.theSelection.x = this.iMouseX - this.theSelection.px;
            this.theSelection.y = this.iMouseY - this.theSelection.py;
        }

        for (i = 0; i < 4; i++) {
            this.theSelection.bHow[i] = false;
            this.theSelection.iCSize[i] = this.theSelection.csize;
        }

        // hovering over resize cubes
        if (this.iMouseX > this.theSelection.x - this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y - this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.csizeh) {

            this.theSelection.bHow[0] = true;
            this.theSelection.iCSize[0] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x + this.theSelection.w-this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.w + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y - this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.csizeh) {

            this.theSelection.bHow[1] = true;
            this.theSelection.iCSize[1] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x + this.theSelection.w-this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.w + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.h-this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.h + this.theSelection.csizeh) {

            this.theSelection.bHow[2] = true;
            this.theSelection.iCSize[2] = this.theSelection.csizeh;
        }
        if (this.iMouseX > this.theSelection.x - this.theSelection.csizeh && this.iMouseX < this.theSelection.x + this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.h-this.theSelection.csizeh && this.iMouseY < this.theSelection.y + this.theSelection.h + this.theSelection.csizeh) {

            this.theSelection.bHow[3] = true;
            this.theSelection.iCSize[3] = this.theSelection.csizeh;
        }

        // in case of dragging of resize cubes
        var iFW, iFH;
        if (this.theSelection.bDrag[0]) {
            var iFX = this.iMouseX - this.theSelection.px;
            var iFY = this.iMouseY - this.theSelection.py;
            iFW = this.theSelection.w + this.theSelection.x - iFX;
            iFH = this.theSelection.h + this.theSelection.y - iFY;
        }
        if (this.theSelection.bDrag[1]) {
            var iFX = this.theSelection.x;
            var iFY = this.iMouseY - this.theSelection.py;
            iFW = this.iMouseX - this.theSelection.px - iFX;
            iFH = this.theSelection.h + this.theSelection.y - iFY;
        }
        if (this.theSelection.bDrag[2]) {
            var iFX = this.theSelection.x;
            var iFY = this.theSelection.y;
            iFW = this.iMouseX - this.theSelection.px - iFX;
            iFH = this.iMouseY - this.theSelection.py - iFY;
        }
        if (this.theSelection.bDrag[3]) {
            var iFX = this.iMouseX - this.theSelection.px;
            var iFY = this.theSelection.y;
            iFW = this.theSelection.w + this.theSelection.x - iFX;
            iFH = this.iMouseY - this.theSelection.py - iFY;
        }

        if (iFW > this.theSelection.csizeh * 2 && iFH > this.theSelection.csizeh * 2) {
            this.theSelection.w = iFW;
            this.theSelection.h = iFH;

            this.theSelection.x = iFX;
            this.theSelection.y = iFY;
        }

        this.drawScene();
    },

    canvasMousedown: function(e) { // binding mousedown event
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        this.theSelection.px = this.iMouseX - this.theSelection.x;
        this.theSelection.py = this.iMouseY - this.theSelection.y;

        if (this.theSelection.bHow[0]) {
            this.theSelection.px = this.iMouseX - this.theSelection.x;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[1]) {
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[2]) {
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y - this.theSelection.h;
        }
        if (this.theSelection.bHow[3]) {
            this.theSelection.px = this.iMouseX - this.theSelection.x;
            this.theSelection.py = this.iMouseY - this.theSelection.y - this.theSelection.h;
        }
        
        if (this.iMouseX > this.theSelection.x + this.theSelection.csizeh && this.iMouseX < this.theSelection.x+this.theSelection.w - this.theSelection.csizeh &&
            this.iMouseY > this.theSelection.y + this.theSelection.csizeh && this.iMouseY < this.theSelection.y+this.theSelection.h - this.theSelection.csizeh) {

            this.theSelection.bDragAll = true;
        }

        for (i = 0; i < 4; i++) {
            if (this.theSelection.bHow[i]) {
                this.theSelection.bDrag[i] = true;
            }
        }
    },

    canvasMouseup: function(e) { // binding mouseup event
        this.theSelection.bDragAll = false;

        for (i = 0; i < 4; i++) {
            this.theSelection.bDrag[i] = false;
        }
        this.theSelection.px = 0;
        this.theSelection.py = 0;
    },

    getResults: function() {
        var temp_ctx, temp_canvas;
        temp_canvas = document.createElement('canvas');
        temp_ctx = temp_canvas.getContext('2d');
        temp_canvas.width = this.theSelection.w;
        temp_canvas.height = this.theSelection.h;
        temp_ctx.drawImage(this.image, this.theSelection.x, this.theSelection.y, this.theSelection.w, this.theSelection.h, 0, 0, this.theSelection.w, this.theSelection.h);
        var vData = temp_canvas.toDataURL();

        $('.avatar').attr('src', vData);
        $('#canvas-wrap').html('').removeClass('active');
    }

});
