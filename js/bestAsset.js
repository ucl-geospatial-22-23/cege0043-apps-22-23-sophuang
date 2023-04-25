/* ////////////////////////////////////////////////////////////////////////////////////////

This file stores functions to show the Asset information which are in Best Condition.
AssetBest() function will be called when the menu item of "Asset in Best" is clicked
displayAssetsList() function create a popup html in the center of current map view
to store the geoJSON result from endpoint: /assetsInGreatCondition

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";

function AssetBest() {
  
    let serviceUrl = document.location.origin + "/api/assetsInGreatCondition";
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (assets) {
        displayAssetsList(assets);
      },
      error: function (errorThrown) {
        console.error("Error fetching assets in great condition:", errorThrown);
        alert("Error fetching assets in great condition. Please check the console for more details.");
      },
    });
  }
  

  function displayAssetsList(assets) {

    // Initialize the size of the popup html
    let popupContent = "<h3>Assets in Best Condition</h3><div style='max-height: 700px; width: 400px; overflow-y: scroll;'><ul>";
    
    // Append every feature into the popupContent
    assets.forEach(function (asset) {
      popupContent += "<li>" + JSON.stringify(asset, null, 2) + "</li>";
    });
  
    popupContent += "</ul></div>";
  
    // Get the center coordinates of the current map view
    var mapCenter = mymap.getCenter();
  
    L.popup({maxWidth: 400})
        .setLatLng(mapCenter)     // Set the position of the popup to the map's center
        .setContent(popupContent) // Set the content of the popup
        .openOn(mymap);
  }