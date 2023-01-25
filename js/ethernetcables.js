"use strict";
let ethernetCables;


function getEthernetCables() {

    let CablayerURL = document.location.origin + "/app/data/ethernet.geojson";

    $.ajax({url: CablayerURL, dataType: 'json', success: function(result){ console.log(result);
        let style1 = { 
            "color": "#ea3008", "weight": 10, "opacity": 0.65
         };
        let style2 = {
            "color": "#08EA3E", "weight": 10, "opacity": 0.65
        };
        let style3 = {
            "color": "#0811EA", "weight": 10, "opacity": 0.65
        };

        // load the geoJSON layer
        ethernetCables = L.geoJSON().addTo(mymap); 
        ethernetCables.addData(result);
        // iterate over the lines and set style depending on district 
        ethernetCables.eachLayer(function(layer) {
        console.log(layer);
        switch (layer.feature.properties.criticality) { 
            case 2: layer.setStyle(style1);
            break; 
            case 3: layer.setStyle(style2);
            break; 
            default: layer.setStyle(style2);
            } 
        });
    // change the map zoom so that all the data is shown
    mymap.fitBounds(ethernetCables.getBounds());
            } // end of the inner function 
        }); // end of the ajax request
    } // end of the function

// removing on demand
function removeEthernetCables() { 
    try {
        alert("EthernetCables data will be removed");
        mymap.removeLayer( ethernetCables );
        console.log('test');
    } 
    catch (err) {
        alert("Layer doesn't exist :" + err);
        console.log('test2')
    }}