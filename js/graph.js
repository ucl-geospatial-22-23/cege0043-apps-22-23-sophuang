

function closeAssetData(){
  let mapCollapse = document.getElementById('mapWrapper');
  let bsMapCollapse = new bootstrap.Collapse(mapCollapse,{
   toggle:false, show:false
  });
  bsMapCollapse.show();
 
  let adwCollapse = document.getElementById('assetDataWrapperWrapper');
  let bsAdwCollapse = new bootstrap.Collapse(adwCollapse,{
   toggle:false, show:true
  });
  bsAdwCollapse.hide();
 }
 
 function loadGraph(){
  
  let mapCollapse = document.getElementById('mapWrapper');
  let bsMapCollapse = new bootstrap.Collapse(mapCollapse,{
   toggle:false, show:false
  });
  bsMapCollapse.hide();
 
  let adwCollapse = document.getElementById('assetDataWrapperWrapper');
  let bsAdwCollapse = new bootstrap.Collapse(adwCollapse,{
   toggle: false, show:true
  });
  bsAdwCollapse.show();
 
  // code to create the graph
  let widtha = document.getElementById("assetDataWrapper").clientWidth;
  let heighta = document.getElementById("assetDataWrapper").offsetHeight;
  console.log(widtha+" "+heighta);
  
  showGraph();
 }

 "use strict";

 // create the graph
 function showGraph() {
  // code to create the graph
  let widtha = document.getElementById("assetDataWrapperWrapper").clientWidth*2;
  let heighta = document.getElementById("assetDataWrapperWrapper").offsetHeight;
  console.log(widtha+" "+heighta);
 
  // add the close button and SVG element for the graph
  document.getElementById("assetDataWrapper").innerHTML = 
  `<div class="mh-100 w-100">
  <button type="button" class="btn-close float-end" aria-label="Close" onclick="closeAssetData()"></button>
  <svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1"></svg>
   </div>
  `
      // create an SVG container for the graph
      // g is a grouping element
      let marginTop = 20;
      let marginBottom = 30;
      let marginLeft = 50;
      let marginRight = 60;

 let  serviceUrl = document.location.origin + "/api/dailyParticipationRates";
 //let dataURL = document.location.origin + "/api/dailyParticipationRates";
 let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
 
 // download the data and create the graph
 d3.json(serviceUrl).then(data => {
  data = data[0]["array_to_json"];
   console.log(data);
 
   // loop through the data and get the length of the x axis titles
   let xLen = 0;
   data.forEach(feature =>{
       if (xLen < feature.day.length) {
         xLen = feature.day.length;
       }
       console.log(xLen);
         });
 
   // adjust the space available for the x-axis titles, depending on the length of the text
   if (xLen > 100) {
     marginBottom = Math.round(xLen/3,0);
   }
   else {
     marginBottom = xLen + 20;  // the 20 allows for the close button 
   } //rough approximation for now
   console.log(marginBottom);

    const keys = ['reports_submitted', 'reports_not_working'];
   
    let   svg   = d3.select("#svg1"),
       margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
       width   = svg.attr("width") - marginLeft - marginRight,
       height  = svg.attr("height") - marginTop - marginBottom,
       x       = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1),
       x1      = d3.scaleBand().padding(0.05),
       y       = d3.scaleLinear().rangeRound([height, 0]),
       g       = svg.append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
 
    console.log("svg"+svg);
  // Update the x domain to include the data and the x1 domain to include the keys
  x.domain(data.map(d => d.day));
  x1.domain(keys).rangeRound([0, x.bandwidth()]);
  y.domain([0, d3.max(data, d => d.reports_submitted)]);
 
 
 
 // adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
  g.append("g")
     .attr("class", "axis axis-x")
     .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x))
       .selectAll(".tick text")
       .call(wrap,x.bandwidth());
 
 
   g.append("g")
       .attr("class", "axis axis-y")
       .call(d3.axisLeft(y).ticks(10).tickSize(8));

       g.selectAll(".bar")
       .data(data)
       .enter()
       .append("g")
         .attr("class", "bar")
         .attr("transform", d => `translate(${x(d.day)},0)`)
         .selectAll("rect")
    .data(d => keys.map(key => ({key: key, value: d[key]})))
    .enter().append("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", (d, i) => i === 0 ? 'slateblue' : '#71EEB8');
/* 
   g.selectAll(".bar")
     .data(data)
     .enter().append("rect")
       .attr("class", "bar")
       .attr("x", d => x(d.day))
       .attr("y", d => y(d.reports_submitted))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.reports_submitted));
 */
// Add a legend
const legendData = [
  { label: "Reports Submitted", color: 'slateblue' },
  { label: "Reports Not Working", color: '#71EEB8' },
];

const legend = svg
  .selectAll(".legend")
  .data(legendData)
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", function (_, i) {
    return "translate(0," + (i * 20) + ")";
  });

legend
  .append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", (d) => d.color);

legend
  .append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text((d) => d.label);

 })
 .catch(err => {
    svg.append("text")         
         .attr("y", 20)
         .attr("text-anchor", "left")  
         .style("font-size", "10px") 
         .style("font-weight", "bold")  
         .text(`Couldn't open the data file: "${err}".`);
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