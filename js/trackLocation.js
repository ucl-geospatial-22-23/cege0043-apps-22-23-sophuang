/* ////////////////////////////////////////////////////////////////////////////////////////

This file stores functions that are used to track user's location, 
and popup the condition survey form automatically,
when the user is close to an asset.

Note: In this application, assets that are within 25m of user's current location
are defined as 'closed'.

Code here are adapted from the example code provided and modified in previous praticals

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";

// create an array to store all the location tracking points 
let trackLocationLayer = [];

// store the ID of the location tracker so that it can be used to switch the location tracking off 
let geoLocationID;

//Define global variable to store tracked user's latitude and logitude
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
        // set the timeout to be half minuite
        const options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000};

        geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
    } 
else {
    document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; }
    }




// This function create a marker to show the position of user
// To distinguish with other asset makers, user's location marker uses bootStrap marker provided from:
// https://icons.getbootstrap.com/icons/geo-alt-fill/
// It also call the findClosestFormPoint function to get proximity alert
function showPosition(position) {
    
    let userLocationMarker = L.divIcon({
        className: 'custom-div-icon',
        html: '<i class="bi bi-geo-alt-fill" style="color: red; font-size: 40px;"></i>',
        iconSize: [40, 40],
        iconAnchor: [15, 48]
      });
    
    trackedLatitude = position.coords.latitude;
    trackedLongitude = position.coords.longitude;
    
    // add the new point into the array
    // the 'push' command 
    trackLocationLayer.push(L.marker([position.coords.latitude,position.coords.longitude], { icon: userLocationMarker }).addTo(mymap));

    closestFormPoint();
}




//Functions for removing tracked points.
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





// Proximity alert function provided in the material 
function closestFormPoint() {

  // set default value for minDistance and layer to store the cloest point
  let minDistance = 100000000000;
  let closestLayer = null;

  // Set proximity threshold to be 25m
  let proximityThreshold = 0.025; 

    
  mapCondition.eachLayer(function (layer) {

      //calculate the distance between every asset potin and current location
        let distance = calculateDistance(
          trackedLatitude,
          trackedLongitude,
          layer.getLatLng().lat,
          layer.getLatLng().lng,
          "K"
        );
      
      //Compare them to get the closet one
        if (distance < minDistance) {
          minDistance = distance;
          closestLayer = layer;
        }
  });

  console.log("Minimum Distance:"+minDistance);

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




// Function to calculte the distance
// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in- your-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  let radlat1 = Math.PI * lat1/180; 
  let radlat2 = Math.PI * lat2/180; 
  let radlon1 = Math.PI * lon1/180; 
  let radlon2 = Math.PI * lon2/180; 
  let theta = lon1-lon2;
  let radtheta = Math.PI * theta/180;
  let subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta); 
  
  subAngle = Math.acos(subAngle);
  subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians 
  let dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
  
  // where radius of the earth is 3956 miles
  if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
  if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles 
  return dist;
  }




// Error handling function
function errorPosition(error){
  alert(error); 
}