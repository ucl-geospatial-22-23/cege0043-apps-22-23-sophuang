"use strict";
/*
function AssetBest() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu AssetBest is called by: " + sCallerName);
  
    let serviceUrl = document.location.origin + "/api/assetsInGreatCondition";
    
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function(assets) {
        // Display the assets in great condition as a JSON string in an alert
        alert("Assets in Great Condition:\n" + JSON.stringify(assets, null, 2));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching assets in great condition:", errorThrown);
        alert("Error fetching assets in great condition. Please check the console for more details.");
      }
    });
  }
*/
async function AssetBest() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu AssetBest is called by: " + sCallerName);
  
    let serviceUrl = document.location.origin + "/api/assetsInGreatCondition";
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (assets) {
        displayAssetsList(assets);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching assets in great condition:", errorThrown);
        alert("Error fetching assets in great condition. Please check the console for more details.");
      },
    });
  }
  
  function displayAssetsList(assets) {
    let popupContent = "<h3>Assets in Best Condition</h3><div style='max-height: 700px; width: 400px; overflow-y: scroll;'><ul>";
  
    assets.forEach(function (asset) {
      popupContent += "<li>" + JSON.stringify(asset, null, 2) + "</li>";
    });
  
    popupContent += "</ul></div>";
  
    // Get the center coordinates of the current map view
    var mapCenter = mymap.getCenter();
  
    var popup = L.popup({maxWidth: 400})
        .setLatLng(mapCenter) // Set the position of the popup to the map's center
        .setContent(popupContent) // Set the content of the popup
        .openOn(mymap);
  }
  
  
  
  
  






  

function RatesGraph() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu RatesGraph is called by: "+ sCallerName);
}

function help() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu help is called by: "+ sCallerName);
}

function UserRanking() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu UserRanking is called by: "+ sCallerName);
    fetchUserId()
    .then((userId) => {
        fetchUserRanking(userId);
    })
    .catch((error) => {
      console.error("Error fetching user ID:", error);
    });
    
    /*
    let serviceUrl = document.location.origin + "/api/userRanking/600";
  
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
    */
    
}

 /*
    Functions for Closest 5 assets
    */
function Add5assets() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add5assets is called by: "+ sCallerName);

    loadClosest5();
}

function Remove5assets() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove5assets is called by: "+ sCallerName);

    removeClosest5();
}

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

function displayClosest5(assetData) {

    let goldIcon = createCustomIcon('gold');

     ClosestPoints = L.geoJSON(assetData, {
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: goldIcon });
        }
    });
    if (ClosestPoints) {
        mymap.removeLayer(mapPoint);
      }
      mapPoint = ClosestPoints.addTo(mymap);
}

function removeClosest5() {
    if (ClosestPoints) {
        mymap.removeLayer(mapPoint);
      }
    }


 /*
    Functions for last 5 reports
    */
function Add5reports() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add5reports is called by: "+ sCallerName);
    loadLast5();
}

function Remove5reports() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove5reports is called by: "+ sCallerName);
    removeLast5()
}



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

function displayLast5(assetData) {
    // Remove any existing LastAssets layer from the map before adding a new one
    if (LastAssets) {
      mymap.removeLayer(mapPoint);
    }
  
    LastAssets = L.geoJSON(assetData, {
      pointToLayer: function (feature, latlng) {
        // Get the icon based on the condition of the feature
        let conditionIcon = getIconByCondition(feature.properties.condition_description);
        
        return L.marker(latlng, { icon: conditionIcon });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Asset Name: " + feature.properties.asset_name +". Last Condition: " +feature.properties.condition_description);
      },
    });
  
    mapPoint = LastAssets.addTo(mymap);
  
    // Set the map view to fit the LastAssets layer
    let lastAssetsBounds = LastAssets.getBounds();
    mymap.fitBounds(lastAssetsBounds);
  }
  
  

function removeLast5() {
    if (LastAssets) {
        mymap.removeLayer(mapPoint);
      }
    }










 /*
    Functions for assets with no condition in 3 days
    */
function Add3rated() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add3rated is called by: "+ sCallerName);
    loadNo3();
}

function Remove3rated() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove3rated is called by: "+ sCallerName);
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

    let greyIcon = createCustomIcon('grey');

    NoReports = L.geoJSON(assetData, {
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: greyIcon });
        }
    });
    if (NoReports) {
        mymap.removeLayer(mapPoint);
      }
      mapPoint = NoReports.addTo(mymap);

    // Set the map view to fit the LastAssets layer
    let NoReportsBounds = NoReports.getBounds();
    mymap.fitBounds(NoReportsBounds);
}

function removeNo3() {
    if (NoReports) {
        mymap.removeLayer(mapPoint);
      }
    }