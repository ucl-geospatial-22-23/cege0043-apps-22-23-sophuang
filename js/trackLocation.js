"use strict";
// create an array to store all the location tracking points 
let trackLocationLayer = [];

// store the ID of the location tracker so that it can be used to switch the location tracking off 
let geoLocationID;

let trackedLatitude;
let trackedLongitude;

function trackLocation() {
    if (navigator.geolocation) {
        // test to see if there is an active tracking and clear it if so 
        // so that we don’t have multiple tracking going on
        try { (navigator.geolocation.clearWatch(geoLocationID));}
        catch (e){ console.log(e);}

        // clear any existing data from the map
        removeTracks();
        // need to tell the tracker what we will do with the coordinates – showPosition
        // also what we will do if there is an error – errorPosition
        // also set some parameters – e.g how often to renew, what timeout to set
        const options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000};
        

        geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
    } 
else {
    document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; }
    }


function showPosition(position) {
    // add the new point into the array
    // the 'push' command 
    let userLocationMarker = L.divIcon({
        className: 'custom-div-icon',
        html: '<i class="bi bi-geo-alt-fill" style="color: red; font-size: 40px;"></i>',
        iconSize: [40, 40],
        iconAnchor: [15, 48]
      });
    
    trackedLatitude = position.coords.latitude;
    trackedLongitude = position.coords.longitude;
    
    trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude], { icon: userLocationMarker }).addTo(mymap));

    // Call the findClosestFormPoint function
    closestFormPoint();
    
}

function errorPosition(error){
    alert(error); }












function removePositionPoints() {
    // disable the location tracking so that a new point won't be added while you are removing the old points 
    // use the geoLocationID to do this
    navigator.geolocation.clearWatch(geoLocationID);
    removeTracks();
    }



function removeTracks(){
    // now loop through the array and remove any points
    // note that we start with the last point first as if you remove point 1 then point 2 becomes point 1 so 
    // a loop doesn't work
    // also we use -1 as arrays in javascript start counting at 0
    for (let i=trackLocationLayer.length-1; i > -1;i--) {
        console.log("removing point "+i + " which has coordinates "+trackLocationLayer[i].getLatLng()); 
        mymap.removeLayer(trackLocationLayer[i]);

        // if you want to totally remove the points, you can also remove them 
        // from the array where they are stored, using the pop command 
        trackLocationLayer.pop();
        }   
    }


//Proximity alert
function closestFormPoint() {
    let minDistance = 100000000000;
    let closestLayer = null;
    let proximityThreshold = 0.025; // Set your proximity threshold in kilometers
  
    mapPoint.eachLayer(function (layer) {
        let distance = calculateDistance(
          trackedLatitude,
          trackedLongitude,
          layer.getLatLng().lat,
          layer.getLatLng().lng,
          "K"
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestLayer = layer;
        }
      });
    console.log("Minimum Distance"+minDistance);
    // Check if the closest point is within the proximity threshold
  if (minDistance <= proximityThreshold) {
    // Get asset properties
    let assetName = closestLayer.feature.properties.asset_name;
    let installationDate = closestLayer.feature.properties.installation_date;
    let lastCondition = closestLayer.feature.properties.condition_description;
    let assetID= closestLayer.feature.properties.asset_id;
    let popUpHTML = getPopupHTML(assetID,assetName, installationDate, lastCondition);

    // Show the popup for the closest point
    closestLayer.bindPopup(popUpHTML);
    closestLayer.openPopup();
  } else {
    console.log("No assets within proximity threshold");
  }
  }
  