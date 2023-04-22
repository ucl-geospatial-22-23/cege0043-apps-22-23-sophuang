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
      
      const entity = dataSource.entities.add({

        name: feature.properties.asset_name,

        position: Cesium.Cartesian3.fromDegrees(
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1]
        ),

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

      // Add a click event handler to the entity
      entity.onClick = function () {

        const assetName = this.name;

        // Log the data bound to radar markers
        console.log("Data bound to radar markers:", d3.selectAll(".radarMarker").data());


        // Find the corresponding bar in the bar chart
        const bar = d3
          .selectAll(".bar")
          .filter((d) => d.name === assetName);

        // Trigger a click event on the bar
        bar.dispatch("click");

        const radarMarker = d3
        .selectAll(".radarMarker")
        .filter((d) => d.axis === assetName)
        .node(); // Get the DOM element

        console.log("Clicked radar marker: ", radarMarker);

        // Trigger a click event on the radar marker
        if (radarMarker) {
          radarMarker.dispatchEvent(new MouseEvent("click"));
        }
      };

    });

    viewer.flyTo(dataSource);

    // Set up the click event handler for the entities
    viewer.screenSpaceEventHandler.setInputAction((click) => {
      const pickedFeature = viewer.scene.pick(click.position);
    
      if (pickedFeature && pickedFeature.id) {
        const entity = pickedFeature.id;
    
        // Open the description table
        viewer.selectedEntity = entity;
    
        // Zoom to asset
        zoomToAsset(entity.position.getValue(Cesium.JulianDate.now()));
    
        // Highlight corresponding bar in the bar chart
        const assetName = entity.name;
        const bar = d3.selectAll(".bar").filter((d) => d.name === assetName);
        bar.dispatch("click");
    
        // Highlight corresponding radar marker
        const radarMarker = d3
          .selectAll(".radarMarker")
          .filter((d) => d.axis === assetName);
        radarMarker.dispatch("click");
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
    

  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });
})
.catch((error) => {
console.error("Error fetching user ID:", error);
});
}




