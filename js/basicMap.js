"use strict";
let mymap; // global variable to store the map
        
let popup = L.popup(); // create a custom popup as a global variable 
let clickedLat;
let clickedLng;


// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you


function onMapClick(e) {
    
    clickedLat = e.latlng.lat;
    clickedLng = e.latlng.lng;
    let formHTML = basicFormHtml();
    
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML) 
        .openOn(mymap);
  }



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
    
    
} //end code to add the leaflet map


let width; // NB – keep this as a global variable

let assetPoints;

function initialize() {
  if (mapCondition) {
    mymap.removeLayer(mapCondition);
  }
  if (mapPoint) {
    mymap.removeLayer(mapPoint);
  }
}

function setMapClickEvent() {
  // get the window width
  width = $(window).width();

  if (width < 768) {
    
    //the condition capture
    if (mapCondition) {
      mymap.removeLayer(mapCondition);
    }
    // cancel the map onclick event using off ..
    mymap.off('click', onMapClick);

    fetchUserId()
      .then((userId) => {
        loadUserAssets_C(userId,trackLocation);

      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
    
  } else if (width >= 992 && width < 1200) {
    // the asset creation page
    if (mapPoint) {
      mymap.removeLayer(mapPoint);
    }
    removePositionPoints();
    // the on click functionality of the MAP should pop up a blank asset creation form
    mymap.on('click', onMapClick);

    fetchUserId()
      .then((userId) => {
        loadUserAssets_A(userId);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  } else {
    mymap.off('click', onMapClick);
    initialize();
  }
}






  








