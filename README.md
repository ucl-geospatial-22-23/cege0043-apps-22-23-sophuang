# cege0043-apps-22-23-sophuang
## 1. Files Description

- **Build/Cesium**: Stores Cesium-related functions and libraries. These files are obtained from the module materials week6-cesium: https://github.com/ucl-geospatial/cege0043-app-examples/tree/week6-cesium
- **css**: Stores the stylesheets of the Bootstrap template
- **img**: Stores icon images and images for the user guidance page
- **js**: Stores all the JavaScript files for the functionalities of the APP component:
  - **bar_graph.js**: Bar chart creation in the dashboard.html
  - **basicMap.js**: Basic functions for map loading and on-click events
  - **bestAsset.js**: Functions for loading the asset in the best condition (List of Assets in Best Condition)
  - **bootstrapTemplate.js**: Template for Bootstrap
  - **cesium_viewer.js**: Loading asset features on the Cesium map
  - **fetch.js**: Fetches user_id and condition_mapping from the start
  - **help.js**: Function to call help.html when the help menu is clicked
  - **iconChange.js**: Functions to change the marker color according to their last condition
  - **layerAdding.js**: Functions related to menus in small screen size (Add Layer, Remove Layer)
  - **layerLoading.js**: Functions to load default layers with user's assets
  - **popup.js**: Functions for popup HTML
  - **radarChart.js**: Functions for radar chart drawing
  - **radar_graph.js**: Create radar chart in dashboard.html
  - **rateGraph.js**: Plot bar chart of daily condition report rate (Daily Reporting Rates Graph – All Users)
  - **trackLocation.js**: Location tracking and proximity alert
  - **uploadData.js**: Functions for Asset creation data and condition report data uploading to the database
  - **userRanking.js**: Get the user's ranking by the number of reports
- **lib**: Original document
- **plugins**: Additional resources for the dashboard template: ADMIN LTE
- **scss**: Original document
- **app.js**: NodeJS server to start the APP component
- **bootstrap.html**: Main Application web page
- **dashboard.html**: Data visualization webpage
- **help.html**: User guidance on Asset creation

## 2. Code References

- **fetch.js**: Promisify AJAX: https://www.taniarascia.com/how-to-promisify-an-ajax-call/
- **iconChange.js**: Customized Leaflet icon: https://github.com/pointhi/leaflet-color-markers
- **bar_graph.js**, **rateGraph.js**: Bar chart creation: https://bl.ocks.org/mbostock/7555321
- **radar_graph.js**, **radarChart.js**: Radar chart creation: https://gist.github.com/nbremer/21746a9668ffdf6d8242
- **trackLocation.js**: Customized Bootstrap icon: https://icons.getbootstrap.com/icons/geo-alt-fill/
- **dashboard.html**: Dashboard template and resources: https://adminlte.io/
