/* ////////////////////////////////////////////////////////////////////////////////////////

This file sotres functions that create barchart on the dash board
It also include the interaction between the cesium viewer

*/ ////////////////////////////////////////////////////////////////////////////////////////

//load the graph when the page is load
document.addEventListener("DOMContentLoaded", function() {
    showRadarChart()
  });

//the graph size change with window resize
window.addEventListener("resize", showRadarChart);

//define global varable to store slected condition of bars 
let selectedCircle = null;


// This function allow when a bar is clicked, the bar will be highlighted
// And the cesium viewer will zoom to corresponding asset
function onCircleClick(d,cfg) {
    console.log("Circle clicked:", d);
    console.log("Coordinates:", d.coordinates);
    // Deselect the previously selected circle
  if (selectedCircle && selectedCircle !== this) {
    d3.select(selectedCircle).classed("selected", false).style("fill", function(d, i, j) { return cfg.color(j); } );
  }
  
    // Toggle the selected state of the current circle
    const isSelected = d3.select(this).classed("selected");
    d3.select(this).classed("selected", !isSelected).style("fill", isSelected ? function(d, i, j) { return cfg.color(j); } : "#71EEB8");
  
    // Update the selectedCircle reference
    selectedCircle = isSelected ? null : this;
    
    const coordinates = d.coordinates;

  
    if (!isSelected) {
      zoomToAsset(coordinates);
      // Trigger a click event on the bar

    } else {
      setDefaultView(viewer);
      d3.select(this).style("fill", "#FFA500");

    
    }
  }
  


// This function load the data from endpoint and call RadarChart() to draw the radar chart in the 
// radarChart container
function showRadarChart() {
    fetchUserId()
      .then((userId) => {
        let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
        d3.json(serviceUrl).then((rawData) => {

      fetchConditionMapping()
      .then(conditionMapping => {
        // Fetch your data here
        return { rawData, conditionMapping };
      })
      .then(({ rawData, conditionMapping }) => {
        // Preprocess data using the fetched conditionMapping
        rawData = rawData[0].features;
        const data = preprocessData(rawData, conditionMapping);
  
        // Continue with the rest of your code using the processedData
        console.log(data);
         // Prepare the radar chart data
         let radarChartData = [
          {
            className: "radar-data",
            axes: data.map((d) => {
              return {
                axis: d.name,
                value: d.condition_number,
                coordinates: d.geometry, // add this line
              };
            }),
          },
        ];
      console.log(radarChartData);

      // Get the container dimensions
      const container = document.querySelector("#radarChartContainer");
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Create the radar chart
      var chartConfig = {
        w: containerWidth,
        h: containerHeight,
        maxValue: Math.max(...data.map(d => d.condition_number)),
        levels: 5
      };

      RadarChart("#radarChartContainer", radarChartData, chartConfig);
      });
           
          })
          .catch((error) => {
            console.error("Error fetching GeoJSON data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  }
  
  
      
  
  