/*document.addEventListener('deviceready', onDeviceReady.bind(this), false);
function onDeviceReady(){
		alert("here");
		//pictureSource = navigator.camera.PictureSourceType;
		//destinationType = navigator.camera.destinationType;

		document.getElementById("capturePhoto").onclick = function(){
			navigator.camera.getPicture(onPhotoDataSuccess, onFail,{
				quality : 50,
				destinationType:destinationType.DATA_URL
			});
}
}*/

(function(){

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady(){
		//alert("here");
		var pictureSource = navigator.camera.PictureSourceType;
		var destinationType = navigator.camera.destinationType;

		document.getElementById("capturePhoto").onclick = function(){
			navigator.camera.getPicture(onPhotoDataSuccess, onFail,{
				quality : 50,
				destinationType:destinationType.DATA_URL
			});
		}

	document.getElementById("scanner").onclick=function barcode(){
	cordova.plugins.barcodeScanner.scan(onResult, errorMessage,
      {
          "preferFrontCamera" : true, // iOS and Android 
          "showFlipCameraButton" : true, // iOS and Android 
          "prompt" : "Place a barcode inside the scan area", // supported on Android only 
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
      }
   	);
	}

	var watchID;
	document.getElementById("geolocation").addEventListener("click", function(){
//		navigator.geolocation.getCurrentPosition(onSuccess,onError, 
//	{enableHighAccuracy:true});
	//watch position
	watchID = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError,
		{timeout : 30000}
		);

	});

	document.getElementById("clearWatchbtn").addEventListener("click", function() {
		var element1 = document.getElementById('divWatchMeMove');
		element1.innerHTML="";
	});
}


	

	//camera bit
	function onPhotoDataSuccess(imageData){
		var smallImage=document.getElementById('smallImage');
		smallImage.style.display='block';
		smallImage.src="data:image/jpeg;base64,"+ imageData;	
	}

	function onFail(message){
		alert("The camera failed because " + message);
	}


	//barcode bit
    function onResult(result) {
        alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
    }

    function errorMessage(error) {
        alert("Scanning failed: " + error);
    }

    //geolocation bit
1

	//watch position bit
	var onWatchSuccess = function(position) {
		var element = document.getElementById('divWatchMeMove');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

})();

