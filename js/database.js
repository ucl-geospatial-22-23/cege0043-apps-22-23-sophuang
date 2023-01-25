"use strict";
let BusStationlayer;
let WaitingRoomlayer;
let Sensorslayer;


function getBusStationData() { 
    let StationlayerURL = document.location.origin + "/app/data/busstations.geojson";

        $.ajax({
            url: StationlayerURL, dataType: 'json', success: function(result){ 
            console.log(result); // check that the data is correct
            // add the JSON layer onto the map - it will appear using the default icons 
            
            let testMarkerGreen = L.AwesomeMarkers.icon({ icon: 'play',markerColor: 'green' });

            // load the geoJSON layer 
            BusStationlayer = L.geoJson(result, {
            // use point to layer to create the points 
            pointToLayer: function (feature, latlng){
                // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
                // also include a pop-up that shows the place value of the earthquakes 
                
                return L.polygon(latlng, {icon:testMarkerGreen});
                
                }, // end of point to layer
                }).addTo(mymap).bindPopup("<b>"+"I am a Bus Station" +"</b>");






                
            // change the map zoom so that all the data is shown 
            mymap.fitBounds(BusStationlayer.getBounds());
        } // end of the inner function

    }); // end of the ajax request
} // end of the getBusStationData function


function getWaitingRoomData() { 
    let RoomslayerURL = document.location.origin + "/app/data/waitingrooms.geojson";

        $.ajax({
            url: RoomslayerURL, dataType: 'json', success: function(result){ 
            console.log(result); // check that the data is correct
            // add the JSON layer onto the map - it will appear using the default icons 
            
            let testMarkerGreen = L.AwesomeMarkers.icon({ icon: 'play',markerColor: 'green' });

            // load the geoJSON layer 
            WaitingRoomlayer = L.geoJson(result, {
            // use point to layer to create the points 
            pointToLayer: function (feature, latlng){
                // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
                // also include a pop-up that shows the place value of the earthquakes 
                return L.polygon(latlng, {icon:testMarkerGreen});
    
                }, // end of point to layer
                }).addTo(mymap).bindPopup("<b>"+"I am a Waiting Room"+"</b>");

            // change the map zoom so that all the data is shown 
            mymap.fitBounds(WaitingRoomlayer.getBounds());
        } // end of the inner function

    }); // end of the ajax request
} // end of the getBusStationData function


function getSensorData() { 
    let SensorslayerURL = document.location.origin + "/app/data/sensors.geojson";

        $.ajax({
            url: SensorslayerURL, dataType: 'json', success: function(result){ 
            console.log(result); // check that the data is correct
            // add the JSON layer onto the map - it will appear using the default icons 
            
            let testMarkerGreen = L.AwesomeMarkers.icon({ icon: 'play',markerColor: 'green' });

            // load the geoJSON layer 
            Sensorslayer = L.geoJson(result, {
            // use point to layer to create the points 
            pointToLayer: function (feature, latlng){
                // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
                // also include a pop-up that shows the place value of the earthquakes 
                return L.marker(latlng, {icon:testMarkerGreen}).bindPopup("<b>"+"I am sensor No."+feature.properties.sensor_id +"</b>");
                
                }, // end of point to layer
                }).addTo(mymap);

            // change the map zoom so that all the data is shown 
            mymap.fitBounds(Sensorslayer.getBounds());
        } // end of the inner function

    }); // end of the ajax request
} // end of the getBusStationData function