/* ////////////////////////////////////////////////////////////////////////////////////////

This file sotres basic functions realting to map.
Including initialize map, load map, set on map click

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";
// global variable to store the map
let mymap; 
// create a custom popup as a global variable         
let popup = L.popup(); 

// Store Latitude and Longitude by user clicking
let clickedLat;
let clickedLng;




// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
function onMapClick(e) {
    clickedLat = e.latlng.lat;
    clickedLng = e.latlng.lng;
    let formHTML = basicFormHtml();
    
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML) 
        .openOn(mymap);
  }



// Function to load leaflet map
function loadLeafletMap() {
    if(mymap) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([51.500149, -0.126240], 13); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(mymap);
                    console.log('load leaflet map');

                    // now add the click event detector to the map 
                    mymap.on('click', onMapClick);

                    console.log("check on map click");
} 





// Initialze the map by removing any existing layer 
function initialize() {
  if (mapCondition) {
    mymap.removeLayer(mapCondition);
  }
  if (mapPoint) {
    mymap.removeLayer(mapPoint);
  }
}



// Store the screen width as global variable
let width; 
let assetPoints;

// Function to set map click events according to different screen size
function setMapClickEvent() {

  // get the window width
  width = $(window).width();

  // If the screen size is small, the condition app will start
  if (width < 768) {
    
    //the existing layer condition capture
    if (mapCondition) {
      mymap.removeLayer(mapCondition);
    }

    // cancel the map onclick event using off ..
    // Only allow click on the asset point
    mymap.off('click', onMapClick);

    // Pass the fetched user_id to allow loadUserAssets_C() function
    fetchUserId()
      .then((userId) => {
        loadUserAssets_C(userId,trackLocation);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  } 

  // If the screen size is Large, the asset creation app will start
  else if (width >= 992 && width < 1200) {

    // the existing layer condition capture
    if (mapPoint) {
      mymap.removeLayer(mapPoint);
    }

    // Remove the tracked location markers
    removePositionPoints();

    // the on click functionality of the map start
    // And popup the asset creation html
    mymap.on('click', onMapClick);

    // Pass the fetched user_id to allow loadUserAssets_A() function
    fetchUserId()
      .then((userId) => {
        loadUserAssets_A(userId);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  } 
  
  // If neither the small, extra small or large screen size, nothing should appear
  else {
    mymap.off('click', onMapClick);
    initialize();
  }
}