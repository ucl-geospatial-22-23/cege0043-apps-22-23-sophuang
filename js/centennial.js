"use strict";
// create an empty array
// this needs to be a global variable so that it can be accessed by
// all the functions below

//let listOfThings = []
let Buildingslayer;
let Cableslayer;
let Roomslayer;
let Sensorslayer;
let Universitylayer;
let listOfUniversity = [];
let listOfBuildings = [];
let listOfCables = [];
let listOfRooms = [];
let listOfSensors = [];


//Functions for Buildings start from here:
function loadUniversity(university){
  // first check if the thing is loaded already
  for (let i=0;i<listOfUniversity.length ;i++){
      if (listOfUniversity[i].university == university){
          console.log("equal");
          alert("University already loaded");
          return;
}}

  let UniversityURL = document.location.origin + "/api/geojson/ucfscde/university/university_id/location";

  $.ajax({url: UniversityURL, crossDomain: true,success: function(result){
      console.log(result); // check that the data is correct
      let newUniversity = result;
      listOfUniversity.push(newUniversity);

      let styleB = { 
          "color": "#0C1F6E", "weight": 10, "opacity": 0.5
       };

  // load the geoJSON layer 
  Universitylayer = L.geoJson(result, {
      // use point to layer to create the points 
      pointToLayer: function (feature, latlng){
      // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
      // also include a pop-up that shows the place value of the earthquakes 

      return L.polygon(latlng);

      }, // end of point to layer
  }).addTo(mymap).bindPopup("<b>"+ "I am centennial university! "+ "</b>");
  Universitylayer.setStyle(styleB);
  // change the map zoom so that all the data is shown 
  mymap.fitBounds(Universitylayer.getBounds());


      


  } // end of the inner function
  }); // end of the ajax request
}


function listAllUniversity() {
  console.log("*********************************");
  console.log("********Current Things *********");
  for (let i=0;i<listOfUniversity.length;i++){
    console.log(listOfUniversity[i].university);
  }
  console.log("*********************************");
}


function removeUniversity(university){
  for (let i=0;i<listOfUniversity.length ;i++){
      if (listOfUniversity[i].university == university){
          console.log("equal");
          listOfUniversity.splice(i,1);
      // don't continue the loop as we now have 1 less element in the array which means
      // that when we try to get the last element it won't be there any more
      break;
}}
try {
  alert("University data will be removed");
  mymap.removeLayer( Universitylayer );
} 
catch (err) {
  alert("Layer doesn't exist :" + err);
}
}






//Functions for Buildings start from here:
function loadBuildings(buildings){
    // first check if the thing is loaded already
    for (let i=0;i<listOfBuildings.length ;i++){
        if (listOfBuildings[i].buildings == buildings){
            console.log("equal");
            alert("Building already loaded");
            return;
  }}

    let BuildingsURL = document.location.origin + "/api/geojson/ucfscde/buildings/building_id/location";

    $.ajax({url: BuildingsURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct
        let newBuildings = result;
        listOfBuildings.push(newBuildings);

        let styleB = { 
            "color": "#0C1F6E", "weight": 10, "opacity": 0.5
         };

    // load the geoJSON layer 
    Buildingslayer = L.geoJson(result, {
        // use point to layer to create the points 
        pointToLayer: function (feature, latlng){
        // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
        // also include a pop-up that shows the place value of the earthquakes 

        return L.polygon(latlng);

        }, // end of point to layer
    }).addTo(mymap).bindPopup("<b>"+ "I am a building! "+ "</b>");
    Buildingslayer.setStyle(styleB);
    // change the map zoom so that all the data is shown 
    mymap.fitBounds(Buildingslayer.getBounds());


        


    } // end of the inner function
    }); // end of the ajax request
}


function listAllBuildings() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (let i=0;i<listOfBuildings.length;i++){
      console.log(listOfBuildings[i].buildings);
    }
    console.log("*********************************");
  }


function removeBuildings(buildings){
    for (let i=0;i<listOfBuildings.length ;i++){
        if (listOfBuildings[i].buildings == buildings){
            console.log("equal");
            listOfBuildings.splice(i,1);
        // don't continue the loop as we now have 1 less element in the array which means
        // that when we try to get the last element it won't be there any more
        break;
  }}
  try {
    alert("Building data will be removed");
    mymap.removeLayer( Buildingslayer );
} 
catch (err) {
    alert("Layer doesn't exist :" + err);
}
  }





//Functions for Ethernet Cables start from here:
function loadCables(ethernet_cables){


    // first check if the thing is loaded already
    for (let i=0;i<listOfCables.length ;i++){
        if (listOfCables[i].ethernet_cables == ethernet_cables){
            console.log("equal");
            alert("Cables already loaded");
            return;
  }}

    let CablesURL = document.location.origin + "/api/geojson/ucfscde/ethernet_cables/ethernet_id/location";

    $.ajax({url: CablesURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct
        let newCables = result;
        listOfCables.push(newCables);

        let styleC = { 
            "color": "#ea3008", "weight": 10, "opacity": 0.65
         };

    // load the geoJSON layer 
    Cableslayer = L.geoJson(result, {
        // use point to layer to create the points 
        pointToLayer: function (feature, latlng){
        // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
        // also include a pop-up that shows the place value of the earthquakes 
        return L.marker(latlng);   
        }, // end of point to layer
    }).addTo(mymap).bindPopup("<b>" + " I am ethernet cable!"+" </b>");
    
    Cableslayer.setStyle(styleC);

    // change the map zoom so that all the data is shown 
    mymap.fitBounds(Cableslayer.getBounds());


    } // end of the inner function
    }); // end of the ajax request

    
}


function listAllCables() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (let i=0;i<listOfCables.length;i++){
      console.log(listOfCables[i].ethernet_cables);
    }
    console.log("*********************************");
  }


function removeCables(ethernet_cables){
    for (let i=0;i<listOfCables.length ;i++){
        if (listOfCables[i].ethernet_cables == ethernet_cables){
            console.log("equal");
            listOfCables.splice(i,1);
        // don't continue the loop as we now have 1 less element in the array which means
        // that when we try to get the last element it won't be there any more
        break;
  }}
  try {
    alert("Cable data will be removed");
    mymap.removeLayer( Cableslayer );
} 
catch (err) {
    alert("Layer doesn't exist :" + err);
}
  }




//Functions for Rooms start from here:
function loadRooms(rooms){
    // first check if the thing is loaded already
    for (let i=0;i<listOfRooms.length ;i++){
        if (listOfRooms[i].rooms == rooms){
            console.log("equal");
            alert("Room already loaded");
            return;
  }}

    let RoomsURL = document.location.origin + "/api/geojson/ucfscde/rooms/room_id/location";

    $.ajax({url: RoomsURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct
        let newRooms = result;
        listOfRooms.push(newRooms);

        let styleR = { 
            "color": "#FFC659", "weight": 10, "opacity": 0.75
         };
        // load the geoJSON layer 
        Roomslayer = L.geoJson(result, {
            // use point to layer to create the points 
            pointToLayer: function (feature, latlng){
            // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
            // also include a pop-up that shows the place value of the earthquakes 
            return L.marker(latlng);   
            }, // end of point to layer
        }).addTo(mymap).bindPopup("<b>"+" I am a room!"+"</b>");

        Roomslayer.setStyle(styleR);
            
        // change the map zoom so that all the data is shown 
        mymap.fitBounds(Roomslayer.getBounds());




    } // end of the inner function
    }); // end of the ajax request
}


function listAllRooms() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (let i=0;i<listOfRooms.length;i++){
      console.log(listOfRooms[i].rooms);
    }
    console.log("*********************************");
  }


function removeRooms(rooms){
    for (let i=0;i<listOfRooms.length ;i++){
        if (listOfRooms[i].rooms == rooms){
            console.log("equal");
            listOfRooms.splice(i,1);
        // don't continue the loop as we now have 1 less element in the array which means
        // that when we try to get the last element it won't be there any more
        break;
  }}

  try {
    alert("Room data will be removed");
    mymap.removeLayer( Roomslayer );
} 
catch (err) {
    alert("Layer doesn't exist :" + err);
}

  }




//Functions for temperature_sensors start from here:
function loadSensors(temperature_sensors){
    // first check if the thing is loaded already
    for (let i=0;i<listOfSensors.length ;i++){
        if (listOfSensors[i].temperature_sensors == temperature_sensors){
            console.log("equal");
            alert("Sensors already loaded");
            return;
  }}

    let SensorsURL = document.location.origin + "/api/geojson/ucfscde/temperature_sensors/sensor_id/location";

    $.ajax({url: SensorsURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct
        let newSensors = result;
        listOfSensors.push(newSensors);

        // load the geoJSON layer 
        Sensorslayer = L.geoJson(result, {
            // use point to layer to create the points 
            pointToLayer: function (feature, latlng){
            // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
            // also include a pop-up that shows the place value of the earthquakes 
            return L.marker(latlng).bindPopup("<b> I am Sensor No."+feature.properties.sensor_id+"</b>");   
            }, // end of point to layer
        }).addTo(mymap);

        // change the map zoom so that all the data is shown 
        mymap.fitBounds(Sensorslayer.getBounds());

    } // end of the inner function
    }); // end of the ajax request
}




function listAllSensors() {
    console.log("*********************************");
    console.log("********Current Things *********");
    for (let i=0;i<listOfSensors.length;i++){
      console.log(listOfSensors[i].temperature_sensors);
    }
    console.log("*********************************");
  }


function removeSensors(temperature_sensors){
    for (let i=0;i<listOfSensors.length ;i++){
        if (listOfSensors[i].temperature_sensors == temperature_sensors){
            console.log("equal");
            listOfSensors.splice(i,1);
        // don't continue the loop as we now have 1 less element in the array which means
        // that when we try to get the last element it won't be there any more
        break;
  }}

    try {
        alert("Sensor data will be removed");
        mymap.removeLayer( Sensorslayer );
    } 
    catch (err) {
        alert("Layer doesn't exist :" + err);
    }
  }


