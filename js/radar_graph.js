document.addEventListener("DOMContentLoaded", function() {
    showRadarChart()
    
  });

  window.addEventListener("resize", showRadarChart);




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
                  return { axis: d.name, value: d.condition_number };
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
  
  
      
  
  