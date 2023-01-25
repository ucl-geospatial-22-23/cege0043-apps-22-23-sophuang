"use strict";

let busstopsLayer;

function getBusstopData() { 
    let buslayerURL = document.location.origin + "/app/data/busstops.geojson";

    $.ajax({url: buslayerURL, crossDomain: true, success: function(result){ console.log(result);
        let testMarkerRed = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'red' });
        let testMarkerGray = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'gray' });
        let testMarkerPink = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'pink'
        });
        let testMarkerBlue = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'blue' });
        let testMarkerPurple = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'purple'
        });
        let testMarkerGreen = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'green' });
        let testMarkerBlack = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'black'
        });
        let testMarkerOrange = L.AwesomeMarkers.icon({ icon: 'play',
        markerColor: 'orange'
        });
        // load the geoJSON layer 
        busstopsLayer = L.geoJson(result,
        {
        // use point to layer to create the points 
        pointToLayer: function (feature, latlng){
        // look at the GeoJSON file - specifically at the properties - to see the busstops type 
        if (feature.properties.IIT_METHOD == '1') {
        return L.marker(latlng, {icon: testMarkerGray }).bindPopup("<b>"+feature.properties.IIT_METHOD +"</b>");
        }
        else if (feature.properties.IIT_METHOD =='2') {
        return L.marker(latlng, {icon:testMarkerOrange}).bindPopup("<b>"+ feature.properties.IIT_METHOD +"</b>");
        }
        else if (feature.properties.IIT_METHOD =='3') {
        return L.marker(latlng, {icon:testMarkerPurple}).bindPopup("<b>"+ feature.properties.IIT_METHOD +"</b>");
        }
        else if (feature.properties.IIT_METHOD == '4') {
        return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+ feature.properties.IIT_METHOD +"</b>");
        }
        else if (feature.properties.IIT_METHOD =='9') {
        return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("<b>"+ feature.properties.IIT_METHOD +"</b>");
        }
        else {
        return L.marker(latlng, {icon:testMarkerBlack}).bindPopup("<b>"+ feature.properties.IIT_METHOD +"</b>");
        }
        }, // end of point to layer
        }).addTo(mymap);
    } // end of the getbusstopseData function

    })
}

// removing on demand
function removeBusstopData() { 
    try {
        alert("Busstops data will be removed");
        mymap.removeLayer( busstopsLayer );
        console.log('test');
    } 
    catch (err) {
        alert("Layer doesn't exist :" + err);
        console.log('test2')
    }}
