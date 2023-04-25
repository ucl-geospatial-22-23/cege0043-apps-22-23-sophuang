/* ////////////////////////////////////////////////////////////////////////////////////////

This file sotres functions that create barchart on the dash board
It also include the interaction between the cesium viewer
This script is adapted from the previous practical material

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";
//load the graph when the page is load
   document.addEventListener("DOMContentLoaded", function() {
    showGraph();
    
  });

//the graph size change with window resize
  window.addEventListener("resize", showGraph);

//define global varable to store slected condition of bars
let selectedBar = null;


// The condition value and condition description are not hard coded in the dash board component
// They are get from the endpoint /conditionDetails
// Details of conditionmaping functions are in the fetch.js
function getMaxConditionValue(data) {
  const conditions = data.map(d => d.condition_number);
  const maxCondition = Math.max(...conditions);
  return maxCondition;
  }
  

// This function allow when a bar is clicked, the bar will be highlighted
// And the cesium viewer will zoom to corresponding asset
function onBarClick(d) {
    // Deselect the previously selected bar
    if (selectedBar && selectedBar !== this) {
    d3.select(selectedBar).classed("selected", false);
  }
  
    // Toggle the selected state of the current bar
    const isSelected = d3.select(this).classed("selected");
    d3.select(this).classed("selected", !isSelected);

    // Update the selectedBar reference
  selectedBar = isSelected ? null : this;

    const coordinates = d.geometry;

    // Find the corresponding circle in the radar chart
    const radarCircle = d3
    .selectAll("#radarChartContainer .radar-data .radarMarker")
    .filter((circleData) => circleData.axis === d.name)
    .node(); // Get the DOM element

    if(!isSelected) {
      zoomToAsset(coordinates);
      
    }
    else{
      setDefaultView(viewer);
      
    }  
}


// Function to zoom the cesium viewer when the bar is clicked
function zoomToAsset(coordinates) {
    if (coordinates && coordinates.length === 2) {
      const [longitude, latitude] = coordinates;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 1000),
        duration: 1,
      });
    } 
  }


// Once the bar is clicked again, the cesium view will reload to the default view.
function setDefaultView(viewer) {
    // Define the default camera position
    const defaultPosition = Cesium.Cartesian3.fromDegrees(0, 0, 10000000);
  
    // Define the default camera orientation
    const defaultOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -90, 0);
  
    // Set the camera's position and orientation
    viewer.camera.setView({
      destination: defaultPosition,
      orientation: defaultOrientation,
    });
  }

  

  function preprocessData(data,conditionMapping) {
    
    return data.map(asset => ({
      name: asset.properties.asset_name,
      condition_number: conditionMapping[asset.properties.condition_description],
      geometry: asset.geometry.coordinates,
    }));
  }

  

  
   // create the graph
  function showGraph() {
    // Clear the existing graph elements
  d3.select("#svg1").selectAll("*").remove();
  // code to create the graph
  let widtha = document.getElementById("barChartContainer").clientWidth;
  let heighta = document.getElementById("barChartContainer").offsetHeight;
  d3.select("#svg1")
    .attr("width", widtha)
    .attr("height", heighta);
  console.log(widtha + " " + heighta);

  

  // add the SVG element for the graph
  document.getElementById("barChartContainer").innerHTML =
    `<svg fill="blue" width="` + widtha + `" height="` + heighta + `" id="svg1"></svg>`;

        // create an SVG container for the graph
        // g is a grouping element
        let marginTop = 20;
        let marginBottom = 30;
        let marginLeft = 50;
        let marginRight = 60;

        fetchUserId()
        .then((userId) => {
          // Call ConditionUploaded with the fetched userId
          let  serviceUrl = document.location.origin + "/api/userAssets/" + userId;
            
   // download the data and create the graph
   d3.json(serviceUrl).then(rawData => {
    rawData = rawData[0].features;
    //data = preprocessData(data[0].features);

    fetchConditionMapping()
      .then(conditionMapping => {
        // Fetch your data here
        return { rawData, conditionMapping };
      })
      .then(({ rawData, conditionMapping }) => {
        // Preprocess data using the fetched conditionMapping
        const data = preprocessData(rawData, conditionMapping);
  
        // Continue with the rest of your code using the processedData
        console.log(data);

    const maxCondition = getMaxConditionValue(data);
    
   
     // loop through the data and get the length of the x axis titles
     let xLen = 0;
     data.forEach(feature =>{
         if (xLen < feature.name.length) {
           xLen = feature.name.length;
         }
         console.log(xLen);
           });
   
     // Increase the marginBottom value
      if (xLen > 100) {
        marginBottom = Math.round(xLen / 3, 0) + 40;
      } else {
        marginBottom = xLen + 40;  // the 20 allows for the close button 
      }
     
      let   svg   = d3.select("#svg1"),
         margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
         width   = svg.attr("width") - marginLeft - marginRight,
         height  = svg.attr("height") - marginTop - marginBottom,
         x       = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1),
         y       = d3.scaleLinear().rangeRound([height, 0]),
         g       = svg.append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);
   
      console.log("svg"+svg);
      
      // Update the x domain to include the data
      x.domain(data.map(d => d.name));
      y.domain([0, d3.max(data, d => d.condition_number)]);
   
   
   
   // adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
    g.append("g")
       .attr("class", "axis axis-x")
       .attr("transform", `translate(0,${height})`)
         .call(d3.axisBottom(x))
         .selectAll(".tick text")
         .call(wrap,x.bandwidth());

         
         g.append("g")
         .attr("class", "axis axis-y")
         .call(d3.axisLeft(y).tickFormat(d3.format("d")).tickValues(d3.range(0, maxCondition + 1, 1)));

      // Modify the bars' part of the code with the click event listener
        g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.condition_number))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.condition_number))
        .attr("fill", 'slateblue')
        .on("click", onBarClick);

      // Add labels for the x-axis and y-axis
      g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .style("text-anchor", "middle")
      .text("Asset");

      g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - marginLeft)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Condition");

       
  
      });
    
    
      })
      .catch(err => {
          svg.append("text")         
              .attr("y", 20)
              .attr("text-anchor", "left")  
              .style("font-size", "10px") 
              .style("font-weight", "bold")  
              .text(`Couldn't open the data file: "${err}".`);
      });
   
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
      
   
   }
   


   function wrap(text, width) {
    text.each(function() {
      let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }