/* ////////////////////////////////////////////////////////////////////////////////////////

This file sotres functions realting to change the color of marker according to the condtion

The use of customized leaflet marker with different color is adapted from:
https://github.com/pointhi/leaflet-color-markers

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";

// This function create icon with different colors
// using the reference from https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/
function createCustomIcon(color) {
    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  
// Get 6 different markers for later use
let greenIcon = createCustomIcon('green');
let yellowIcon = createCustomIcon('yellow');
let orangeIcon = createCustomIcon('orange');
let redIcon = createCustomIcon('red');
let violetIcon = createCustomIcon('violet');
let blueIcon = createCustomIcon('blue');  
  

// return different icon by the condition pass into the function
// this function can deal with condition_id value and condition_description both
function getIconByCondition(condition) {
    let icon;
    switch (condition) {
      case '1':
        case 'Element is in very good condition':
        icon = greenIcon;
        break;
      case '2':
        case 'Some aesthetic defects, needs minor repair':
        icon = yellowIcon;
        break;
      case '3':
        case 'Functional degradation of some parts, needs maintenance':
        icon = orangeIcon;
        break;
      case '4':
        case 'Not working and maintenance must be done as soon as reasonably possible':
        icon = redIcon;
        break;
      case '5':
        case 'Not working and needs immediate, urgent maintenance':
        icon = violetIcon;
        break;
      case '5':
        case 'Unknown':
        icon = blueIcon;
        break;
      default:
        icon = blueIcon;
        break;
    }
    return icon;
}


let makers = {};
let updatedConditions={};
  
// This function is used for update the color when a new condtion report is submitted
function updateLayerColor(assetId, condition) {

  // Get the marker from the markers dictionary defined before
  // by its asset_id 
  let marker = markers[assetId];  

  //Store the new condition into updateConditions dictionary
  updatedConditions[assetId] = condition;
  if (marker) {
    marker.remove();
    let icon;
    switch (condition) {
      case '1':
        icon = greenIcon;
        break;
      case '2':
        icon = yellowIcon;
        break;
      case '3':
        icon = orangeIcon;
        break;
      case '4':
        icon = redIcon;
        break;
      case '5':
        icon = violetIcon;
        break;
      default:
        icon = blueIcon;
        break;
    }
  
  // Create a new marker with the updated icon and add it to the map
  let newMarker = L.marker(marker.getLatLng(), {icon: icon}).addTo(mymap);
  newMarker.bindPopup(marker.getPopup().getContent());

  // Update the marker in the markers object
  markers[assetId] = newMarker;
  newMarker.assetId = assetId;
  }
  
  console.log("updateLayerColor");
}



// This function is used for updating the condition_desctiption result 
// shown in the condition survey form, when the user click between different radio button
function updateDescription(id) {
    let description = '';
    let descriptionDiv = document.getElementById('condition_description');
  
    switch (id) {
      case '1':
        description = 'Element is in very good condition';
        break;
      case '2':
        description = 'Some aesthetic defects, needs minor repair';
        break;
      case '3':
        description = 'Functional degradation of some parts, needs maintenance';
        break;
      case '4':
        description = 'Not working and maintenance must be done as soon as reasonably possible';
        break;
      case '5':
        description = 'Not working and needs immediate, urgent maintenance';
        break;
      default:
        description = 'Unknown';
    }
    descriptionDiv.innerHTML = description;
}