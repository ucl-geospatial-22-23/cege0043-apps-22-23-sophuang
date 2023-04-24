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
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
let mapCondition;
let assetPoints;

function setMapClickEvent() {
  // get the window width
  width = $(window).width();

  if (width < 768) {
    //the condition capture
    if (mapPoint) {
      mymap.removeLayer(mapPoint);
    }
    // cancel the map onclick event using off ..
    mymap.off('click', onMapClick);

    fetchUserId()
      .then((userId) => {
        loadUserAssets_C(userId);
        setUpPointClick();
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
    trackLocation();
  } else if (width >= 992 && width < 1200) {
    // the asset creation page
    if (mapPoint) {
      mymap.removeLayer(mapPoint);
    }
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
  }
}



// Create an object to store the markers
let markers = {};
let updatedConditions = {};

function setUpPointClick(data) {
    let assetPoints = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            let assetId = feature.properties.asset_id;
            let condition = updatedConditions[assetId] || feature.properties.condition;
            let icon = getIconByCondition(condition);
            let marker = L.marker(latlng, {icon: icon});
            marker.assetId = assetId;
            return marker;
          },
      onEachFeature: function (feature, layer) {
        let assetName = feature.properties.asset_name;
        let installationDate = feature.properties.installation_date;
        let lastCondition = feature.properties.condition_description;
        let asset_id = feature.properties.asset_id;
        let popUpHTML = getPopupHTML(asset_id,assetName, installationDate, lastCondition);
        layer.bindPopup(popUpHTML);
        
        // Store the marker in the markers object
      let assetId = feature.properties.asset_id;
      markers[assetId] = layer;
      layer.assetId = assetId;
      },
    });

    // Add assetPoints to the map
    mapPoint = assetPoints.addTo(mymap);
    console.log("Asset Points added to the map");

    return assetPoints;
}
  

  

function setUpConditionClick(data) {
    let assetPoints = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        let lastCondition = feature.properties.condition_description;
        let pre_con;
        if (lastCondition=='Unknown') {
            pre_con = "No Previous Condition Report Captured for this Asset";
        }
        else{
            pre_con = "Last Condition: " + lastCondition;
        }
  
        // Show lastCondition popup when the layer is clicked
        layer.on("click", function (e) {
          let lastConditionPopup = L.popup()
            .setLatLng(layer.getLatLng())
            .setContent(pre_con);
  
          lastConditionPopup.openOn(mymap);
        });
      },
    });
  
    // Add assetPoints to the map
    mapCondition = assetPoints.addTo(mymap);
    console.log("Asset Points added to the map");
  }






