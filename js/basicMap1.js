"use strict";


let mymap; // global variable to store the map
        
let popup = L.popup(); // create a custom popup as a global variable 

// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you

function onMapClick(e) { 
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                        }




function loadLeafletMap() {
    mymap = L.map('mapid').setView([51.500149, -0.126240], 13); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(mymap);
                    console.log('load leaflet map');

                    // now add the click event detector to the map 
                    mymap.on('click', onMapClick);

                    console.log("check on map click")

                    // now call the code to add the markers 
                    addBasicMarkers();

                    // add a circle
   // L.circle([51.500149, -0.126240], 5000, {
    //color: 'green',
    //fillColor: '#f03',
    //fillOpacity: 0.8 }).addTo(mymap).bindPopup("I am a circle.");
    //console.log("added a circle");
    
    
    // add a polygon
    ///let myPolygon = L.polygon([
    //[51.709, -0.10], 
    //[51.703, 0.07], 
   // [51.22, 0.07], 
   // [51.22, -0.057] ],
    //{color: 'orange', fillColor: '#f03', fillOpacity: 0.5}).addTo(mymap).bindPopup("I am a polygon in 2022.");
    
} //end code to add the leaflet map




    

function addBasicMarkers() {
                    console.log('add basic markers');

                    let testMarkerPink = L.AwesomeMarkers.icon({
                                    icon:'play',
                                    markerColor:'pink'});

                    

                    // create a geoJSON feature - 
                    let geojsonFeature = {
                        "type": "Feature", 
                        "properties": {
                            "name": "London",
                            "popupContent": "This is where UCL is based. We have on campus and off campus activity." 
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-0.126240,51.500149]
                        } };

                    // and add it to the map
                    L.geoJSON(geojsonFeature, {
        pointToLayer:function(feature, latlng){
            return L.marker(latlng, {icon:testMarkerPink});
        }
    }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>");
} // end code to add the basic markers





