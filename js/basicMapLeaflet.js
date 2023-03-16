"use strict";

let mymap; //global variable to store the map
// create a custom popup as a global variable
let popup = L.popup();


// create an event detector to wait for the user's click event and then use the popup to show them where they clicked

/*
function onMapClick(e) {
                    popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(mymap);
                    }
*/

// step 4 - setting up the form to add new assets to the database
// 1.write the function that sets up the click behaviour for the map
function onMapClick(e){
    let formHTML = basicFormHtml();
    popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at" + e.latlng.toString() + "<br>" + formHTML)
    .openOn(mymap);
}



// function loading leafletmap
console.log("initializing the map");
function loadLeafletMap(){
    //call the code to add the markers
    addBasicMarkers();
    // add the click event detector to the map
    mymap.on('click', onMapClick);
}//end code to add the leaflet map
console.log("map created");



// function adding basic markers
console.log("starting to add basic markers");
function addBasicMarkers(){
        mymap = L.map('mapid').setView([51.524766, -0.133583], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a >'
        }).addTo(mymap);      
    }

console.log("basic markers added");


// the following for leaflet map behaviour

let width;
let mapPoint;

function setMapClickEvent(){
  // get the window width
  width = $(window).width();
}

// use the bs medium and large options for the asset location capture
// and the samll and xs options for the condition option
// references:  https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
if(width<992){
    // the condition captures anything smaller than 992px is defined as 'medium' by bootstrap
    // remove the map point if exists any
    if(mapPoint){
        mymap.removeLayer(mapPoint);
    }
    // cancel the map onclick event using off
    mymap.off('click', onMapClick)
    // set up a point with click functionality
    // so that anyone clicking will add asset condition info
    setUpPointClick();
}

else{
    // the asset creation page
    // remove the map point if exists any
    if(mapPoint){
        mymap.removeLayer(mapPoint);
    }
    // the on click functionality of the MAP should pop up a blank asset creation form
    mymap.on('click', onMapClick);
    
}



// setting up the form pop-up to collect condition reports
function setUpPointClick(){
    // create a geoJSON feature (in the assignment this will be replaced)
    // by an AJAX call to load the asset points on the map
    let geojsonFeature = {
        "type":"Feature",
        "properties":{
            "name":"London",
            "popupContent":"This is where UCL is based"
        },
        "geometry":{
            "type":"Point",
            "coordinates":[-0.13263, 51.522449]
        }
    };
    // and add it to the map and zoom to that location
    // use the mapPoint variable so that we can remove this point layer on
    let popUpHTML = getPopupHTML();
    mapPoint = L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
    mymap.setView([51.522449,-0.13263],12)

    // the on click functionality of the POINT should pop up partially populated condition form 
    // so that the user can select the condition they require
    // line 112 was originally here: let popUpHTML = getPopupHTML();
    console.log(popUpHTML);
}


// function to pop up a condition form on the point(when the screen width is narrow)
function getPopupHTML(){
    // all the required values for the asset pop-up will be
    // derived from feature.properties.xxx - 
    // see the Earthquakes code for how this is done

    let id="1272"; // this will be the asset ID
    let surname = "XXX";
    let name = "YYY";
    let module = "CEGE0043";
    let language = "English";
    let lecturetime = "6am";
    let previousCondition = 3;

    let htmlString = "<DIV id='popup'"+id+"><h2>" + name + "</h2><br>";
    htmlString = htmlString + "<h3>" + surname + "</h3><br>";
    htmlString = htmlString + "<input type = 'radio' name = 'answer' id = '"+id+"_2'/>" +language + "<br>";
    htmlString = htmlString + "<input type = 'radio' name = 'answer' id = '"+id+"_3'/>" + lecturetime + "<br>";
    htmlString = htmlString + "<button onclick = 'checkCondition("+id+"); return false;'>Submit Contion</button>";

    // now include a hidden element with the previous condition value
    htmlString = htmlString + "<div id=previousCondition_" + id + "hidden>" + previousCondition + "<div>";
    // and a hidden element with the ID of the asset so that we can insert the condition with the correct asset later
    htmlString = htmlString + "<div id = asset_ "+ id + "hidden>" +id+ "</div>";
    htmlString = htmlString + "</div>";

    return htmlString;
}







// 2.use a similar approach (but without the data values)

function basicFormHtml() {
let mylet = '<label for="name">Name</label><input type="text" size="25" id="name"/><br />'+
'<label for="surname">Surname</label><input type="text" size="25" id="surname"/><br />'+
'<label for="module">Module</label><input type="text" size="25" id="module"/><br />'+
''+
''+
'<p>Would you like lectures in the morning or afternoon?</p>'+
' Morning: <input type="radio" name="amorpm" id="morning" /><br />'+
' Afternoon: <input type="radio" name="amorpm" id ="afternoon"/><br />'+
''+
''+
''+
'<p>Which modules are you taking?</p>'+
' CEGEG077: <input type="checkbox" name="modules" id = check1 value="CEGEG077" checked="yes" /><br />'+
' CEGEG129: <input type="checkbox" name="modules" id = check2 value="CEGEG129" /><br />'+
' CEGEG082: <input type="checkbox" name="modules" id = check3 value="CEGEG082" /><br />'+
' CEGEG034: <input type="checkbox" name="modules" id = check4 value="CEGEG034" /><br />'+
''+
'<p>What is your first language?</p>'+
'<select name="languageselectbox" id="languageselectbox">'+
' <option >English </option>'+
' <option>Mandarin</option>'+
' <option>Greek</option>'+
' <option>Italian</option>'+
' <option>Spanish</option>'+
' <option>Other</option>'+
''+
'</select>'+
'<br />'+
'<br />'+
'<label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
'<label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
''+
''+
'<p>Click here to upload the data</p>'+
'<button id="startUpload" onclick="startDataUpload()">Start Data Upload</button>'+
'<br />'+
'<br />'+
'<div id="dataUploadResult">The result of the upload goes here</div>'+
'<br />'+
'<br />'+
''+
'<hr>'+
'<hr>'+
''+
'<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
'<button id="startDelete" onclick="deleteRecord()">Delete Record</button>'+
'<div id="dataDeleteResult">The result of the upload goes here</div>';
 
return mylet;
}



















