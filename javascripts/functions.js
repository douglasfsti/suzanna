var webcam = document.querySelector("#webcam");
var webcam_settings = {video: true};
var width = 320;
var height = 0;
var video_resolution_is_setted = false;
var image_is_locked = false;
var images_captured = 0;


var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");


var image = document.querySelector("#image");
var crop = document.querySelector("#crop");


var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);


var canvas_crop = document.querySelector("#canvas_crop");
var crop_context = canvas_crop.getContext("2d");


navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);


function sleep(milliseconds) {
    var now = new Date().getTime();
    while (true)
        if ((new Date().getTime() - now) > milliseconds)
            break;
}


function video_error(error) {
    console.log("Video capture error: ", error.code);
}


function webcam_init() {
    try {
        navigator.getUserMedia(webcam_settings, function (stream) {
            var vendorURL = window.URL || window.webkitURL;
            webcam.src = vendorURL.createObjectURL(stream);
            webcam.play();
        }, video_error);
    } catch (error) {
        console.log("Error in webcam_init: ", error);
    }
}


function set_video_resolution() {
    if (!video_resolution_is_setted) {
        if (webcam.videoWidth > 0 && webcam.videoHeight > 0) {
            video_resolution_is_setted = true;
        }
        else
            setInterval(set_video_resolution, 1000);
    } else {
        height = webcam.videoHeight / (webcam.videoWidth / width);

        webcam.setAttribute('width', width);
        webcam.setAttribute('height', height);

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
    }
}


function capture_frame() {
    context.drawImage(webcam, 0, 0, width, height);

    if (!image_is_locked) {
        image.src = canvas.toDataURL();

        tracking.track('#image', tracker);

        image_is_locked = true;
    }
}