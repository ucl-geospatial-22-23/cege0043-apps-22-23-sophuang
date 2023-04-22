document.addEventListener("DOMContentLoaded", function() {
    showRadarChart()
    
  });

  window.addEventListener("resize", showRadarChart);

 
  let selectedCircle = null;

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
    } else {
      setDefaultView(viewer);
      d3.select(this).style("fill", "#FFA500");
    }
  }
  
  // Find the corresponding circle marker in the radar chart
    console.log("Data bound to radar markers:", d3.selectAll(".radarMarker").data());



  function showRadarChart() {
    fetchUserId()
      .then((userId) => {
        let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
        d3.json(serviceUrl)
          .then((data) => {
            data = preprocessData(data[0].features);
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
          })
          .catch((error) => {
            console.error("Error fetching GeoJSON data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  }
  
  
      
  
  