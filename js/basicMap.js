"use strict";
let mymap; // global variable to store the map
        
let popup = L.popup(); // create a custom popup as a global variable 



// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you


function onMapClick(e) {
    let formHTML = basicFormHtml();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML) 
        .openOn(mymap);
  }



function loadLeafletMap() {
    if(mymap) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([51.500149, -0.126240], 13); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(mymap);
                    console.log('load leaflet map');

                    // now add the click event detector to the map 
                    mymap.on('click', onMapClick);

                    console.log("check on map click");
    
    
} //end code to add the leaflet map


let width; // NB – keep this as a global variable
let mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized

function setMapClickEvent() { 
    // get the window width
    width = $(window).width();
    // we use the bootstrap Medium and Large options for the asset location capture 
    // and the small and XS options for the condition option
    // see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
    if (width < 768) {
        //the condition capture –
        //anything smaller than 992px is defined as 'medium' by bootstrap
        // remove the map point if it exists 
        if (mapPoint){
            mymap.removeLayer(mapPoint); 
        }
        // cancel the map onclick event using off .. 
        mymap.off('click',onMapClick)
        // set up a point with click functionality
        // so that anyone clicking will add asset condition information 
        setUpPointClick();
        //loadUserAssets();
        fetchUserId()
    .then((userId) => {
      loadUserAssets(userId);
    })
    .catch((error) => {
      console.error("Error fetching user ID:", error);
    });
    }


    else if(( width >=992 && width < 1200)) { // the asset creation page
            // remove the map point if it exists 
            if (mapPoint){
                mymap.removeLayer(mapPoint);
            }
        // the on click functionality of the MAP should pop up a blank asset creation form
        mymap.on('click', onMapClick); 
    }

    else{
        mymap.off('click',onMapClick)
    }
}


function setUpPointClick() {
    // create a geoJSON feature (in your assignment code this will be replaced
    // by an AJAX call to load the asset points on the map 
    
    let geojsonFeature = {
    "type": "Feature", 
    "properties": {
        "name": "London",
        "popupContent": "This is where UCL is based" 
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-0.13263, 51.522449]
    } 
    };

    // the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
    let popUpHTML = getPopupHTML(); 
    
    // and add it to the map and zoom to that location
    // use the mapPoint variable so that we can remove this point layer on 
    mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML); 
    //mymap.setView([51.522449,-0.13263], 12)

    console.log(popUpHTML);
    
    }




function updateDescription(id) {
        let description = '';
        let descriptionDiv = document.getElementById('condition_description');
      
        switch (id) {
          case '1':
            description = 'Element is in very good condition';
            break;
          case '2':
            description = 'Some aesthetic defects, needs minor repair';
            break;
          case '3':
            description = 'Functional degradation of some parts, needs maintenance';
            break;
          case '4':
            description = 'Not working and maintenance must be done as soon as reasonably possible';
            break;
          case '5':
            description = 'Not working and needs immediate, urgent maintenance';
            break;
          case '6':
            description = 'Unknown';
            break;
          default:
            description = '';
        }
      
        descriptionDiv.innerHTML = description;
}
  

function getPopupHTML(){
        // (in the final assignment, all the required values for the asset pop-up will be 
        //derived from feature.properties.xxx – see the Earthquakes code for how this is done)
        var conditionSurvey = '<!DOCTYPE html>'+
'<head>'+
'<title>Condition Survey Form Creation</title>'+
'</head>'+
'<body>'+
'<h1> Condition Survey Form Creation</h1>'+
''+
'<div>'+
''+
''+
'<label for="asset_name">Asset name</label><input type="text" size="25" id="asset_name"/><br />'+
''+
'<label for="installation_date">Asset Installation Date</label><input type="date" id="installation_date" value="1826-09-01" readonly/><br />'+
''+
''+
''+
'<p>What is the condition value?</p>'+
'	1: <input type="radio" name="amorpm" id="1" onclick="updateDescription(this.id)"/><br />'+
'	2: <input type="radio" name="amorpm" id ="2" onclick="updateDescription(this.id)"/><br />'+
'    3: <input type="radio" name="amorpm" id ="3" onclick="updateDescription(this.id)"/><br />'+
'    4: <input type="radio" name="amorpm" id ="4" onclick="updateDescription(this.id)"/><br />'+
'    5: <input type="radio" name="amorpm" id ="5" onclick="updateDescription(this.id)"/><br />'+
'    6: <input type="radio" name="amorpm" id ="6" onclick="updateDescription(this.id)"/><br />'+
''+
''+
'<div id="condition_description"></div>'+
'<div id="user_id" style="display: none;"> 1272 </div>'+
'<div id="previousConditionValue" style="display: none;">1</div> '+
'<div id="asset_id" style="display: none;">2</div>'+
''+
''+
'<p>Click here to save condition</p>'+
'<button id="saveCondition" onclick="saveCondition()">Start condition Saving</button>'+
'<br />'+
'<br />'+
'<div id="conditionResult">The result of the upload goes here</div>'+
'<br />'+
'<br />'+
''+
''+
''+
''+
''+
'<hr>'+
'<hr>'+
''+
''+
''+
'<label for="deleteID">Delete ID</label><input type="text" size="25" id="delete_id"/><br />'+
'<button id="startDelete" onclick="deleteRecord()">Delete Record</button>'+
'<div id="dataDeleteResult">The result of the upload goes here</div>'+
''+
''+
''+
'</div>'+
''+
''+
'</body>'+
' <script'+
'  src="https://code.jquery.com/jquery-3.4.1.min.js"'+
'  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="'+
'  crossorigin="anonymous"></script> '+
'<script src="js/assetCreation.js"> </script>';


    return conditionSurvey;

        
}
        
function basicFormHtml() {

    var assetCreat = '<!DOCTYPE html>'+
    '<head>'+
    '<title>Asset Form Creation</title>'+
    '</head>'+
    '<body>'+
    '<h1> Asset Form Creation</h1>'+
    ''+
    '<div>'+
    ''+
    ''+
    '    <label for="Asset Name">Asset Name</label><input type="text" size="25" id="asset_name"/><br />'+
    '    <label for="Installation Date">Installation Date</label><input type="date" id="installation_date"/><br />'+
    '    <br />'+
    '    <br />'+
    '    <label for="Latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
    '    <label for="Longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
    ''+
    ''+
    ''+
    ''+
    ''+
    ''+
    '    <p>Click here to save the data</p>'+
    '    <button id="saveAsset" onclick="saveNewAsset()">Save Asset Data</button>'+
    '    <br />'+
    '    <br />'+
    '    <div id="responseDIV">The result of AJAX request goes here</div>'+
    '    <br />'+
    '    <br />'+
    ''+
    '    <div id="user_id" hidden> 1272 </div>'+
    ''+
    ''+
    '    <hr>'+
    '    <hr>'+
    ''+
    ''+
    '    <label for="deleteID">Delete ID</label><input type="text" size="25" id="delete_id"/><br />'+
    '    <button id="deleteAsset" onclick="deleteSingleAsset()">Delete Single Asset Data</button>'+
    '    <div id="deleteAssetResponse">The result of the delete operation goes here</div>'+
    ''+
    ''+
    '</div>'+
    ''+
    ''+
    '</body>'+
    '<script'+
    'src="https://code.jquery.com/jquery-3.4.1.min.js"'+
    'integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="'+
    'crossorigin="anonymous"></script> '+
    '<script src="js/assetCreation.js"> </script>';
        
    
	

    return assetCreat;
        

}


