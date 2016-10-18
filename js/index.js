
(function(){
	"use strict";

	document.addEventListener('device ready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady(){
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.destinationType;

		document.getElementById("capturePhoto").onclick = function(){
			navigator.camera.getPicture(onPhotoDataSuccess, onFail,{
				quality : 50,
				destinationType:destinationType.DATA_URL
			});
		}

	document.getElementById("scanner").onclick=function barcode(){
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          "preferFrontCamera" : true, // iOS and Android 
          "showFlipCameraButton" : true, // iOS and Android 
          "prompt" : "Place a barcode inside the scan area", // supported on Android only 
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
      }
   );
	}

	document.getElementById("geolocation"),addEventListener("click", function(){
		navigator.geolocation.getCurrentPosition(	
		function onSuccess(position){
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '\n' +
							'Longitude: ' + position.coords.longitude + '\n' ;
	},
	function onError(error){
		alert('code: ' + error.code + '\n' +
				'message: ' + error.message + '\n');
	}, 
	{enableHighAccuracy:true})

	});


	function onPhotoDataSuccess(imageData){
		var smallImage=document.getElementById('smallImage');
		smallImage.style.display='block';
		smallImage.src="data:image/jpeg;base64,"+ imageData;	
	}

	function onFail(message){
		alert("The camera failed because " + message);
	}





	var watchID = navigator.geolocation.watchPosition(onSuccess, onError);

	};




})();

