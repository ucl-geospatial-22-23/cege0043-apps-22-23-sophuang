"use strict";
let conditionMapping = null;

function createCustomIcon(color) {
    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  
  let greenIcon = createCustomIcon('green');
  let yellowIcon = createCustomIcon('yellow');
 
  let orangeIcon = createCustomIcon('orange');
  let redIcon = createCustomIcon('red');
  let violetIcon = createCustomIcon('violet');
  let blueIcon = createCustomIcon('blue');
  


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
      default:
        icon = blueIcon;
        break;
    }
    return icon;
  }



  




function updateLayerColor(assetId, condition) {
    let marker = markers[assetId];
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
        description = '';
    }
  
    descriptionDiv.innerHTML = description;
}