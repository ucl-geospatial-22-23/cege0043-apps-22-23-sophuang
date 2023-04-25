/* ////////////////////////////////////////////////////////////////////////////////////////

This file stores functions to add and remove layers containing assets in different situations:
        -- 5 assets cloest to the user's location
        -- assets that have 5 latest condition reports
        -- assets that do not have any condition reports uploaded in 3 days

When the loading layer functions are triggered, the default user's asset layer will be removed
And when those removing layer functions are trigger, those additional layers will be removed and the default layer will be reloaded

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";
/*************************************
    Functions for Closest 5 assets
**************************************/

// This function will be called when the menu item "Add Layer – 5 closest assets"" is clicked
function Add5assets() {
    alert("Five cloest Assets will be shown in Gold Makers");
    loadClosest5();
}



// This function will be called when the menu item "Remove Layer – 5 closest assets"" is clicked
// And it reloads the the default points, without proximity alert
function Remove5assets() {
    alert("User Assets will be reloaded");
    removeClosest5();
    
    // Reload points in mapCondition, and restart 
    setMapClickEvent();
}



// This function fetch the asset data from endpoint /userFiveClosestAssets/:Latitude/:Longitude
// By passing global variables trackedLatitude and trackedLongitude from trackLocation() into it
function loadClosest5() {
    let serviceUrl = document.location.origin + "/api/userFiveClosestAssets/" + trackedLatitude + "/" + trackedLongitude;
      
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function (data) {
        console.log(data);
        displayClosest5(data);
        },
    });
}
    
    

// Declare ClosestPoints as a global variable
let ClosestPoints;

// This function create markers for closets 5 assets and display them on the map
function displayClosest5(assetData) {

    // Delete current layers
    initialize();

    //disable track location
    removePositionPoints();
    
    //Define the gold icon
    let goldIcon = createCustomIcon('gold');
    
    // Append each asset into ClosestPoints and bind a asset name popup to it
    ClosestPoints = L.geoJSON(assetData, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: goldIcon });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Asset Name: " + feature.properties.asset_name);
          }        
    });

    // Add them on to map
    if (ClosestPoints) {
        mymap.removeLayer(mapCondition);
      }    
    mapCondition = ClosestPoints.addTo(mymap);
    
    // Set the map view to fit the ClosestPoints
    let ClosestPointsBounds = ClosestPoints.getBounds();
    mymap.fitBounds(ClosestPointsBounds);      
}
    
    
function removeClosest5() {
    //remove the ClosetsPoints
    if (ClosestPoints) {
        mymap.removeLayer(mapCondition);
      } 
}
    
    






/*************************************
    Functions for Last 5 Reports
**************************************/
// Following the same structure as functions foe Closest 5

// This function will be called when the menu item "Add Layer – last 5 reports"" is clicked
// It will show user's assets that have latest 5 condition report
// the color of the marker corresponds to the report
function Add5reports() {
    alert("User's assets with latest 5 condition reports will be shown in marker, colored by their conditions");
    loadLast5();
}
    


// Reomve assets with last 5 reports and reload user's assets
function Remove5reports() {
    alert("User Assets will be reloaded");
    removeLast5();
}
    
    

// Fetch the data from endpoint: /lastFiveConditionReports/:user_id
// Pass the downloaded data to displayLast5()
function loadLast5() {
    fetchUserId()
        .then((userId) => {
            let serviceUrl = document.location.origin + "/api/lastFiveConditionReports/" + userId ;
            $.ajax({
                url: serviceUrl,
                crossDomain: true,
                type: "GET",
                success: function (data) {
                  console.log(data);
                  displayLast5(data);
                },
            });    
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        }); 
}
    
    


// Declare ClosestPoints as a global variable
let LastAssets;

// This function create markers for last 5 condition assets according to their condition
// and display them on the map
function displayLast5(assetData) {

    // Remove any existing LastAssets layer from the map before adding a new one
    initialize();

    //disable track location
    removePositionPoints();

    if (LastAssets) {
      mymap.removeLayer(mapCondition);
    }
  
    LastAssets = L.geoJSON(assetData, {
      pointToLayer: function (feature, latlng) {
        // Get the icon based on the condition of the feature
        let conditionIcon = getIconByCondition(feature.properties.condition_description);
        return L.marker(latlng, { icon: conditionIcon });
      },
      // Add an asset name and last condition popup message to the marker
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Asset Name: " + feature.properties.asset_name +". Last Condition: " +feature.properties.condition_description);
      },
    });
  
    mapCondition = LastAssets.addTo(mymap);
  
    // Set the map view to fit the LastAssets layer
    let lastAssetsBounds = LastAssets.getBounds();
    mymap.fitBounds(lastAssetsBounds);    
}
      
      
// Remove layer and reload default points    
function removeLast5() {
    if (LastAssets) {
        mymap.removeLayer(mapCondition);
    };

    // Reload points in mapCondition, and restart location track
    setMapClickEvent();   
}
    
    
    
    
    
    
    
    
    
    
/*****************************************************
    Functions for Assets without cnditions in 3 days
******************************************************/
// Following the same structure as functions foe Closest 5

function Add3rated() {
    alert("Assets without condition updates in 3 days will be shown in grey markers");
    loadNo3();
}
    
function Remove3rated() {
    alert("User Assets will be reloaded");
    removeNo3();
}
    
    
    
function loadNo3() {
    fetchUserId()
    .then((userId) => {
        let serviceUrl = document.location.origin + "/api/conditionReportMissing/" + userId ;
        $.ajax({
            url: serviceUrl,
            crossDomain: true,
            type: "GET",
            success: function (data) {
              console.log(data);
              displayNo3(data);
            },
          });
    })
    .catch((error) => {
      console.error("Error fetching user ID:", error);
    });      
}
    
    
// Declare ClosestPoints as a global variable
let NoReports;
    
function displayNo3(assetData) {

    initialize();

    //disable track location
    removePositionPoints();

    let greyIcon = createCustomIcon('grey');
    
    NoReports = L.geoJSON(assetData, {
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: greyIcon });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Asset Name: " + feature.properties.asset_name);
          },
    });    
    
    if (NoReports) {
        mymap.removeLayer(mapCondition);
      }
      mapCondition = NoReports.addTo(mymap);

    // Set the map view to fit the LastAssets layer
    let NoReportsBounds = NoReports.getBounds();
    mymap.fitBounds(NoReportsBounds);  
}
    
    
      
    
function removeNo3() {
    if (NoReports) {
        mymap.removeLayer(mapCondition);
    }

    // Reload points in mapCondition, and restart location track
    setMapClickEvent();   
}