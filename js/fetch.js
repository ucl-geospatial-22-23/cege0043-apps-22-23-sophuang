"use strict";

// fetch user ID
//let userId;
function fetchUserId() {
    return new Promise((resolve, reject) => {
      let serviceUrl = document.location.origin + "/api/userId";
  
      $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function (data) {
          if (data && data.length > 0) {
            let userId = data[0].user_id;
            resolve(userId);
          } else {
            reject("Error fetching user ID: empty response");
          }
        },
        error: function (errorThrown) {
          reject("Error fetching user ID: " + errorThrown);
        },
      });
    });
  }


//fetch condition description
function fetchConditionMapping() {
    let serviceUrl = document.location.origin + "/api/conditionDetails";
    return fetch(serviceUrl)
      .then(response => response.json())
      .then(mapping => {
        const conditionMapping = {};
  
        mapping.forEach(condition => {
          conditionMapping[condition.condition_description] = condition.id;
        });
        
        
        return conditionMapping;
      });
  }


//fetch User Ranking
function fetchUserRanking(userId) {
    let serviceUrl = document.location.origin + "/api/userRanking/" + userId;
  
        $.ajax({
            url: serviceUrl,
            crossDomain: true,
            type: "GET",
            success: function(data) {
            // Extract the ranking from the response data and show an alert
            let ranking = data[0].array_to_json[0].rank;
            alert("Your ranking based on condition reports is: " + ranking);
            },
            error: function(err) {
            console.error("Error while fetching user ranking:", err);
            }
        });
} 

function loadUserAssets_A(userId) {
    let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (data) {
        console.log(data);
        displayAssetsOnMap(data); // Call displayAssetsOnMap here
      },
    });
  }

  function loadUserAssets_C(userId) {
    let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (data) {
        console.log(data);
        displayAssetsOnMap(data); // Call displayAssetsOnMap here
      },
    });
  }
  

/*
  function displayAssetsOnMap(assetData) {

    let assetPoints = L.geoJSON(assetData, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Asset Name: " + feature.properties.asset_name);
      }
    });
    assetPoints.addTo(mymap);
    
  }
*/
  function displayAssetsOnMap(assetData) {

    let assetPoints = L.geoJSON(assetData, {
      pointToLayer: function (feature, latlng) {
        let assetId = feature.properties.asset_id;
        let condition = feature.properties.condition_description;
        console.log(assetId);
        console.log(condition);
        let icon = getIconByCondition(condition);
        
        let marker = L.marker(latlng, { icon: icon });
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