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
    if (width < 992) {
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
    }


    else { // the asset creation page
            // remove the map point if it exists 
            if (mapPoint){
                mymap.removeLayer(mapPoint);
            }
        // the on click functionality of the MAP should pop up a blank asset creation form
        mymap.on('click', onMapClick); 
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
    mymap.setView([51.522449,-0.13263], 12)

    console.log(popUpHTML);
    
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
        '<label for="installation_date">Installation Date</label><input type="text" size="25" id="installation_date"/><br />'+
        '<label for="user_id">Module</label><input type="text" size="25" id="module"/><br />'+
        ''+
        ''+
        '<p>What is the condition value?</p>'+
        '	1: <input type="radio" name="amorpm" id="1" /><br />'+
        '	2: <input type="radio" name="amorpm" id ="2"/><br />'+
        '    3: <input type="radio" name="amorpm" id ="3"/><br />'+
        '    4: <input type="radio" name="amorpm" id ="4"/><br />'+
        '    5: <input type="radio" name="amorpm" id ="5"/><br />'+
        ''+
        ''+
        ''+
        '<div id="previousConditionValue" style="display: none;">1</div> '+
        '<div id="assetID" style="display: none;">2</div>'+
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
        '<hr>'+
        '<hr>'+
        ''+
        ''+
        ''+
        '<label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
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
        '<script src="js/uploadData.js"> </script>';
            

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
            '    <label for="name">Name</label><input type="text" size="25" id="name"/><br />'+
            '    <label for="surname">Surname</label><input type="text" size="25" id="surname"/><br />'+
            '    <label for="module">Module</label><input type="text" size="25" id="module"/><br />'+
            ''+
            ''+
            '    <p>Would you like lectures in the morning or afternoon?</p>'+
            '        Morning: <input type="radio" name="amorpm" id="morning" /><br />'+
            '        Afternoon: <input type="radio" name="amorpm" id ="afternoon"/><br />'+
            ''+
            ''+
            ''+
            '    <p>Which modules are you taking?</p>'+
            '        CEGEG077: <input type="checkbox" name="modules" id = check1 value="CEGEG077" checked="yes" /><br />'+
            '        CEGEG129: <input type="checkbox" name="modules" id = check2 value="CEGEG129" /><br />'+
            '        CEGEG082: <input type="checkbox" name="modules" id = check3 value="CEGEG082" /><br />'+
            '        CEGEG034: <input type="checkbox" name="modules" id = check4 value="CEGEG034"  /><br />'+
            ''+
            '    <p>What is your first language?</p>'+
            '    <select name="languageselectbox" id="languageselectbox">'+
            '        <option >English </option>'+
            '        <option>Mandarin</option>'+
            '        <option>Greek</option>'+
            '        <option>Italian</option>'+
            '        <option>Spanish</option>'+
            '        <option>Other</option>'+
            ''+
            '    </select>'+
            '    <br />'+
            '    <br />'+
            '    <label for="latitude">Latitude</label><input type="text" size="25" id="latitude"/><br />'+
            '    <label for="longitude">Longitude</label><input type="text" size="25" id="longitude"/><br />'+
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
            ''+
            '    <hr>'+
            '    <hr>'+
            ''+
            ''+
            '    <label for="deleteID">Delete ID</label><input type="text" size="25" id="deleteID"/><br />'+
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



