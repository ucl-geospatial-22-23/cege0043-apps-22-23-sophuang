"use strict";
Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

let imageryProviders = Cesium.createDefaultImageryProviderViewModels();
let selectedImageryProviderIndex = 7;  // MapBox Street is 5th in the list.

let viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProviderViewModels: imageryProviders,
  selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex]
});


// only load the layer when the cesium basemap has been created
document.addEventListener('DOMContentLoaded', function() {
 loadVectorLayer();
}, false);



function getStrokeColor(conditionDescription) {
switch (conditionDescription) {
case 'Element is in very good condition':
return Cesium.Color.GREEN;
case 'Some aesthetic defects, needs minor repair':
return Cesium.Color.YELLOW;
case 'Functional degradation of some parts, needs maintenance':
return Cesium.Color.ORANGE;
case 'Not working and maintenance must be done as soon as reasonably possible':
return Cesium.Color.RED;
case 'Not working and needs immediate, urgent maintenance':
return Cesium.Color.VIOLET;
default:
return Cesium.Color.BLUE;
}
}

function loadVectorLayer() {
fetchUserId()
.then((userId) => {
let serviceUrl = document.location.origin + "/api/userAssets/" + userId;

fetch(serviceUrl)
  .then((response) => response.json())
  .then((geoJSONData) => {
    console.log("GeoJSON data:", geoJSONData);

    let dataSource = new Cesium.CustomDataSource("Assets");
    viewer.dataSources.add(dataSource);

    geoJSONData[0].features.forEach((feature) => {
      let conditionDescription = feature.properties.condition_description;
      let strokeColor = getStrokeColor(conditionDescription);
      
      dataSource.entities.add({
        name: feature.properties.asset_name,
        position: Cesium.Cartesian3.fromDegrees(
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1]
        ),
        /*
        point: {
          pixelSize: 8,
          color: strokeColor,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
        },
        */

        label: {
          text: '*',
          font: '100px sans-serif',
          fillColor: strokeColor,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      },
      description: `
          <table>
            <tr><th>Asset ID</th><td>${feature.properties.asset_id}</td></tr>
            <tr><th>Asset Name</th><td>${feature.properties.asset_name}</td></tr>
            <tr><th>Installation Date</th><td>${feature.properties.installation_date}</td></tr>
            <tr><th>Latest Condition Report Date</th><td>${feature.properties.latest_condition_report_date}</td></tr>
            <tr><th>Last Condition Description</th><td>${conditionDescription}</td></tr>
          </table>
        `,

      });
    });

    viewer.flyTo(dataSource);
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });
})
.catch((error) => {
console.error("Error fetching user ID:", error);
});
}




