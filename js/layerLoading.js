/* ////////////////////////////////////////////////////////////////////////////////////////

This file sotres functions that fetch, load and display asset data from endpoint, 
for those default layers in Asset creation app and Condition app.

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";

/*************************************
    Condition App Component
**************************************/

// This function load asset data from endpoint /userAssets/:user_id
// parameter  callback is set for the trackLocation function,
// such that, when the tracklocation is not needed, the default layer can 
// still be loaded without the proximity alert
function loadUserAssets_C(userId, callback) {
    let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (data) {

        console.log(data);

        // Call displayConditionOnMap here
        displayConditionOnMap(data); 

        // the call back function can only be shown in small size
        let width = $(window).width();
        if (width < 768) {
          if (callback) {
              callback(); // Execute the callback function
            }
        }
      }
    });
  }


// store the geoJSON feature in Condition component into mapCondition
// so that we can remove it if the screen is resized
let mapCondition;

// Create to store the customized markers
let markers = {};




// This function stores asset features in mapCondtion
// Add markers corresponds to different condition
// And add them on the map
// Also bind condition survey popup html
function displayConditionOnMap(assetData) {

  // Clean the map
  initialize();

  let assetPoints = L.geoJSON(assetData, {
    // Convert each point into a a layer allowing the corlor changing
    pointToLayer: function (feature, latlng) {
      // get the asset id and condition descriprion
      let assetId = feature.properties.asset_id;
      let condition = feature.properties.condition_description;
      console.log(assetId);
      console.log(condition);

      // get the customized icon by getIconByCondition()
      let icon = getIconByCondition(condition);
      let marker = L.marker(latlng, { icon: icon });

      // Append asset id to the marker
      marker.assetId = assetId;
      return marker;
    },  
    
    // For each feature, bind the popupHTML
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
    }  
    });
  
    // Add assetPoints to the mapCondition layer group
    mapCondition = assetPoints.addTo(mymap);
    console.log("Asset Points added to the map");
    return assetPoints;
}
  



/*************************************
    Asset Creation App Component
**************************************/

// This function load asset data from endpoint /userAssets/:user_id
// And call displayAssetsOnMap() to load it on map
function loadUserAssets_A(userId) {
  let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
  $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function (data) {
      console.log(data);
      // pass data to displayAssetsOnMap()
      displayAssetsOnMap(data); 
    },
    });
}
  
  
// store the geoJSON feature in Asset component into mapPoint
// so that we can remove it if the screen is resized  
let mapPoint;
 
  
// This function stores asset features in mapPoint
// Add markers corresponds to different condition
// And add them on the map  
// Also bind the last condition popup message
  function displayAssetsOnMap(data) {

    // Clean the map
    initialize();

    let assetPoints = L.geoJSON(data, {

      pointToLayer: function (feature, latlng) {
        // get the asset id and condition descriprion
        let assetId = feature.properties.asset_id;
        let condition = feature.properties.condition_description;
        console.log(assetId);
        console.log(condition);

        // get the customized icon by getIconByCondition()
        let icon = getIconByCondition(condition);
        let marker = L.marker(latlng, { icon: icon });
        marker.assetId = assetId;
        return marker;    
      },
      
      onEachFeature: function (feature, layer) {
        // Get the last condition
        let lastCondition = feature.properties.condition_description;
        let pre_con;

        // Check the unknown condition, and tell the user when they click the asset point
        if (lastCondition=='Unknown') {
            pre_con = "; Last Condition: " +"No Previous Condition Report Captured for this Asset";
        }
        else{
            pre_con = "; Last Condition: " + lastCondition;
        }
        
        //Added asset name to the popup message
        let Content = "Asset Name: "+feature.properties.asset_name + pre_con;

        // Show lastCondition popup when the layer is clicked
        layer.on("click", function (e) {
          let lastConditionPopup = L.popup()
            .setLatLng(layer.getLatLng())
            .setContent(Content);

          lastConditionPopup.openOn(mymap);
        });
      }
    });
  
    // Add assetPoints to the map
    mapPoint = assetPoints.addTo(mymap);
    console.log("Asset Points added to the map");
  }
  
  
  
  
  
  
    
  
  
  
  
  
  
  
  
  