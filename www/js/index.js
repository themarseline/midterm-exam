  var batt = document.getElementById("batt");
      var Latitude = undefined;
      var Longitude = undefined;

      function getBattery() {
        //battery
	document.getElementById("map").innerHTML=" ";
	document.getElementById("photo").innerHTML=" ";
        navigator.getBattery().then(function(battery) {
          var level = battery.level
          batt.innerHTML = "Device's current Battery Level is " + parseInt(level * 100) + "%";
        });
      }

      function openCamera() {
	document.getElementById("map").innerHTML=" ";
	document.getElementById("batt").innerHTML=" ";
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL
        });
      }

      function vibratePhone() {
        navigator.vibrate(500);
      }
      /*
		function getLocation() {
		 //geolocation
		
		if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        loc.innerHTML = "Geolocation is not supported by this browser.";
        }
		}
		
        function showPosition(position) {
        loc.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
        }
		*/
      //camera
      //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 ,destinationType: Camera.DestinationType.DATA_URL});
      // sourceType: Camera.PictureSourceType.PHOTOLIBRARY}); for choosing photo in gallery


      function onPhotoDataSuccess(imageData) {
        // Get image handle
        //
        var photo = document.getElementById('photo');
        // Unhide image elements
        //
        photo.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        photo.src = "data:image/jpeg;base64," + imageData;
      }

      function onFail(message) {
        alert('Capture cancelled or failed');
      }


      // Get geo coordinates

      function getMapLocation() {

        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {
          enableHighAccuracy: true
        });
      }

      // Success callback for get geo coordinates

      var onMapSuccess = function(position) {
	document.getElementById("photo").innerHTML=" ";
	document.getElementById("batt").innerHTML=" ";
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;

        getMap(Latitude, Longitude);

      }

      // Get map by using coordinates

      function getMap(latitude, longitude) {

        var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);


        var latLong = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
          position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
      }

      // Success callback for watching your changing position

      var onMapWatchSuccess = function(position) {

        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;

        if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

          Latitude = updatedLatitude;
          Longitude = updatedLongitude;

          getMap(updatedLatitude, updatedLongitude);
        }
      }

      // Error callback

      function onMapError(error) {
        console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }

      // Watch your changing position

      function watchMapPosition() {

        return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, {
          enableHighAccuracy: true
        });
      }
