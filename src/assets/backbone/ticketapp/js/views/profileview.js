var ProfileView = Backbone.View.extend({
	template: JST.profileview,
	
	initialize: function() {
		this.listenTo(this.model, 'add change', this.render);	

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);

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
        $(document).unbind('keydown', this.keyEvent);
		this.stopListening();
	},
	
	render: function() {
		this.$el.html(this.template(this.model));

		this.delegateEvents({
            'input input': 'markAsChanged',
			'click .update-avatar-link': 'fileDialogTrigger',
			'change #filesInput': 'handleFileSelect',
			'dragover #avatar-drop': 'handleDragOver',
			'dragleave #avatar-drop': 'handleDragLeave',
			'drop #avatar-drop': 'handleDragFileSelect',
			'click .toggle-button-outer': 'toggleEmails',
            'click .preview-close': 'previewClose',
            'mousemove #panel': 'canvasMousemove',
            'mousedown #panel': 'canvasMousedown',
            'mouseup #panel': 'canvasMouseup',
            'click .crop': 'getResults',
            'click .grayscale': 'grayscaleHandler',

            'click #form-profile-details button': 'updateDetails',
            'click #form-profile-details .cancel-btn': 'cancelUpdateDetails',
            'input input[type=email]': 'validateEmail',

            'input .current-password': 'validatePassword',
            'focus .new-password': 'passwordCounterReveal',
            'blur .new-password': 'passwordCounterHide',
            'input .new-password': 'newPasswordCount',
            'input .repeat-password': 'confirmPassword',
            'click #form-profile-password button': 'updatePassword',
            'click #form-profile-password .cancel-btn': 'cancelUpdatePassword'
        });

		return this;
	},

    cancelUpdatePassword: function(){
        var inputs = this.$el.find('#form-profile-password input');

        inputs.each(function(){
            var input = $(this);
            input.val('');
            input.closest('div').removeClass('validated-input-resize');

            if(input.hasClass('current-password')){
                input.attr('disabled', false);
            } else {
                input.attr('disabled', true);
            }
        });

    },

    updatePassword: function(evt){
        var currentPassword = this.$el.find('.current-password').val();
        var newPassword =  this.$el.find('.new-password').val();
        var repeatPassword = this.$el.find('.repeat-password').val();

        if(!currentPassword || !newPassword || !repeatPassword){
            return;
            
        } else if(currentPassword && newPassword === repeatPassword){
            var request = $.ajax({
                url: '/api/user/update/password',
                method: 'POST',
                data: { 
                    currentPassword: currentPassword,
                    newPassword: newPassword   
                },
                dataType: 'json'
            });

            request.done(function( msg ) {
                this.$el.find('#form-profile-password .response').addClass('text-animate').find('h3').text('Your password has been updated');
            });

            request.fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });

        } else {
            this.cancelUpdatePassword();
            this.$el.find('#form-profile-password .response').addClass('text-animate').find('h3').text('Submission failed, please try again');
        }
    },

    confirmPassword: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();
        var firstValue = this.$el.find('.new-password').val();
        var div = input.closest('div');

        if(value == firstValue){
            div.addClass('validated-input-resize')
        } else {
            div.removeClass('validated-input-resize');
        }
    },

    passwordCounterReveal: function(evt){
        var div = $(evt.currentTarget).closest('div');
        div.addClass('validated-input-resize');
    },

    passwordCounterHide: function(evt){
        var input = $(evt.currentTarget);
        var div = input.closest('div');

        if(!div.find('.vrf-cir').hasClass('ok')){
            div.removeClass('validated-input-resize');
        }
    },

    newPasswordCount: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();
        var length = value.length;
        var regVrf = input.closest('div');
        var counter = regVrf.find('.vrf-cir');
        var counterValue = 8;
        var nextInput = this.$el.find('.repeat-password');

        // Remove repeat passwords validation if new password is altered
        if(value !== nextInput.val()){
            nextInput.closest('div').removeClass('validated-input-resize');
            nextInput.attr('disabled', true);
        }

        if(length < 8){
            counter.text(counterValue - length);
            counter.removeClass('ok');
            regVrf.find('.vrf-cir').fadeIn();
            nextInput.attr('disabled', true);

        } else {
            counter.html('<i class="icon-ok-1"></i>');
            counter.addClass('ok');
            nextInput.attr('disabled', false);
        }
    },    

    validatePassword: function(evt){
        var input = $(evt.currentTarget);
        var value = input.val();

        if(value.length <= 7) {
            input.closest('div').removeClass('validated-input-resize');
        } else if (value.length > 7){
            var request = $.get('/api/check/password?password=' + value);
            
            request.done(function(msg) {
                var div = input.closest('div');
                div.addClass('validated-input-resize');
                input.attr('disabled', true);
                div.closest('form').find('.new-password').attr('disabled', false);
            });
             
            request.fail(function(jqXHR, textStatus) {
                input.closest('div').removeClass('validated-input-resize');
            });
        }
    },

    updateDetails: function(evt){
        var updated = false;
        var form = $(evt.currentTarget).closest('form');
        var inputs = form.find('input'); 

        inputs.each(function(){
            var input = $(this);
            var value = input.val();

            if(!input.hasClass('error') && value){
                var name = input.attr('name');
                app.user.set(name, value);
                updated = true;
            }
        });

        if(updated){
            this.model.save(this.model.attributes,{
                success: _.bind(function(model){
                    this.$el.find('#form-profile-details .response').addClass('text-animate');
                    app.changed = false;
                }, this)
            });
        }
    },

    cancelUpdateDetails: function(evt){
        var form = $(evt.currentTarget).closest('form');
        form.find('.validated-input-resize').removeClass('validated-input-resize');
        var inputs = form.find('input'); 

        inputs.each(function(){
            var input = $(this);
            input.val('');
            input.removeClass('error');
        });
    },

    validateEmail: function(evt){
        var input = $(evt.currentTarget);

        houston.validateAndApproveEmail(input,this.validateEmailSuccess, this.validateEmailFail);
    },

    validateEmailSuccess: function(input){
        input.closest('div').removeClass('validated-input-resize');
    },

    validateEmailFail: function(input){
        var div = input.closest('div');
        div.addClass('validated-input-resize');      
    },

    keyEvent: function(e){
        var keyCode = e.which;
        if (keyCode == 27) {
            this.previewClose();
        }
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

    toggleEmails: function(evt){
        $(evt.currentTarget).toggleClass('on');
    },   

    previewClose: function(){
        $('#canvas-wrap').html('').removeClass('active, max-height-canvas-image');
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

    grayscaleImage: false,
    grayscaleHandler: function(evt){
        $(evt.currentTarget).toggleClass('gray');

        if(!this.grayscaleImage){
            this.grayscaleImage = true;
        } else {
            this.grayscaleImage = false;
        }

        this.drawScene();
    },

    makeGrayscale: function(canvasContext) {
        var imgData = canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var pixels  = imgData.data;
            for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale;	// Red
            pixels[i+1] = grayscale;	// Green
            pixels[i+2] = grayscale;	// Blue
            //pixels[i+3] is alpha
        }

        // Redraw the image in black & white
        canvasContext.putImageData(imgData, 0, 0);
    },    

	canvas: null, 
	image: null,
	iMouseX: null,
	iMouseY: 1,
	theSelection: null,

    addImageToCanvas: function(imgSrc){
        // Create image object and pass it uploaded data
        this.image = new Image();
        this.image.src = imgSrc;
        var originalWidth = this.image.width;
        var originalHeight = this.image.height;
        var maxWidth = $(window).width() - 40;
        var maxHeight = $(window).height() - 70;

        // If image too tall give modal warning
        if(originalHeight > maxHeight) {
            houston.createModal({type: 'Error', message: 'The image you are attempting to use is too large please try a smaller image.'});

            return;
        } 

        // If image too wide then resize
        if(originalWidth > maxWidth) {
            var imageWidth = maxWidth;
            var widthDifference = originalWidth - imageWidth;
            var percentageDecrease = widthDifference / (originalWidth / 100);
            var imageHeight = originalHeight - ((originalHeight / 100) * percentageDecrease);

            this.image.width = imageWidth;
            this.image.height = imageHeight;


            // Draw resized image onto temporary canvas and set that to this.image
            var temp_ctx, temp_canvas;
            temp_canvas = document.createElement('canvas');
            temp_ctx = temp_canvas.getContext('2d');
            temp_canvas.width = imageWidth;
            temp_canvas.height = imageHeight;
            temp_ctx.drawImage(this.image, 0, 0, originalWidth, originalHeight, 0, 0, imageWidth, imageHeight);
            this.image.src = temp_canvas.toDataURL();
            
        } 

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        $(this.canvas).attr({'width': this.image.width, 'height': this.image.height, id: 'panel'});

        $('#canvas-wrap').html(
            '<div class="canvas-blackout-bg"></div>'+
            '<div class="canvas-window-inner">'+
                '<div class="preview-wrap">'+
                    '<div class="preview-img-wrap">'+
                        '<i class="preview-close icon-cancel-circled"></i>'+
                        '<div class="preview-img-box">'+
                            '<div class="canvas">'+
                            '</div>'+
                        '<button class="crop">Crop and Save</button>'+
                        '<button class="grayscale"><span class="g">Grayscale</span><span class="c">Colour</span></button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
        $('.canvas').html(this.canvas)

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

        // add greyscale effect if selected
        if(this.grayscaleImage) this.makeGrayscale(this.ctx);
    },

    canvasMousemove: function(e) {
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        // In case of drag of whole selector
        if (this.theSelection.bDragAll) {
            this.theSelection.x = this.iMouseX - this.theSelection.px;
            this.theSelection.y = this.iMouseY - this.theSelection.py;
        }

        for (i = 0; i < 4; i++) {
            this.theSelection.bHow[i] = false;
            this.theSelection.iCSize[i] = this.theSelection.csize;
        }

        // Hovering over resize cubes
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

        // In case of dragging of resize cubes
        var iFW, iFH;
        if (this.theSelection.bDrag[0]) {
            var iFX = this.iMouseX - this.theSelection.px;
            var iFY = this.iMouseY - this.theSelection.py;
            iFW = this.theSelection.w + this.theSelection.x - iFX;
            iFH = this.theSelection.h + this.theSelection.y - iFY;
            // iFH = this.theSelection.h + this.theSelection.x - iFX;
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

    canvasMousedown: function(e) {
        var canvasOffset = $(this.canvas).offset();

        this.iMouseX = Math.floor(e.pageX - canvasOffset.left);
        this.iMouseY = Math.floor(e.pageY - canvasOffset.top);

        this.theSelection.px = this.iMouseX - this.theSelection.x;
        this.theSelection.py = this.iMouseY - this.theSelection.y;

        if (this.theSelection.bHow[0]) {
            console.log('0');
            this.theSelection.px = this.iMouseX - this.theSelection.x;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[1]) {
            console.log('1');
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y;
        }
        if (this.theSelection.bHow[2]) {
            console.log('2');
            this.theSelection.px = this.iMouseX - this.theSelection.x - this.theSelection.w;
            this.theSelection.py = this.iMouseY - this.theSelection.y - this.theSelection.h;
        }
        if (this.theSelection.bHow[3]) {
            console.log('3');
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

    canvasMouseup: function(e) {
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
        
        // Add grayscale effect if selected 
        if(this.grayscaleImage)this.makeGrayscale(temp_ctx);
        var vData = temp_canvas.toDataURL();

        this.model.set('avatar', vData);
        this.model.save(this.model.attributes);

        this.previewClose();
    }
});