/* ////////////////////////////////////////////////////////////////////////////////////////

This file defines two functions that create the popup HTML at asset point createion 
and Condition Assement reporting

The inner HTML string is transformed by the website:
http://pojo.sodhanalibrary.com/string.html

*/ ////////////////////////////////////////////////////////////////////////////////////////




//This the function of Condition Survey Form Creation HTML
//This function take asset_id,assetName,installationDate,lastCondition from the data returned by endpoint as input
//and return the condition form corresponding to different asset

function getPopupHTML(asset_id,assetName,installationDate,lastCondition){

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

//Asset Name andinstallation date are read only here
'<label for="asset_name">Asset name</label><input type="text" size="25" value="'+ assetName +'" id="asset_name" readonly/><br />'+
''+
'<label for="installation_date">Asset Installation Date</label><input type="date" id="installation_date" value="'+ installationDate +'" readonly/><br />'+
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
'<div id="previousConditionValue" style="display: none;">'+ lastCondition +'</div> '+
'<div id="asset_id" style="display: none;">'+ asset_id +'</div>'+
''+
''+
'<p>Click here to save condition</p>'+
'<button id="saveCondition" onclick="saveCondition()">Start condition Saving</button>'+
'<br />'+
'<br />'+
'<div id="conditionResult">The result of the upload goes here</div>'+
'<br />'+
'<br />'+
'<hr>'+
'<hr>'+
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


//This the function of Asset Creation Form HTML
//This function returns the asset creation form corresponding to the place where the user click
    
function basicFormHtml() {

var assetCreat = '<!DOCTYPE html>'+
'<head>'+
'<title>Asset Creation Form</title>'+
'</head>'+
'<body>'+
'<h1> Asset Creation Form </h1>'+
''+
'<div>'+
''+
''+
'    <label for="Asset Name">Asset Name</label><input type="text" size="25" id="asset_name"/><br />'+
'    <label for="Installation Date">Installation Date</label><input type="date" id="installation_date"/><br />'+
'    <br />'+
'    <br />'+

// Latitude and Longitude are get from the clicked Latitude and Longitude by the user click event
'    <label for="Latitude">Latitude</label><input type="text" size="25" value="'+ clickedLat +'" id="latitude"/><br />'+
'    <label for="Longitude">Longitude</label><input type="text" size="25" value="'+ clickedLng +'" id="longitude"/><br />'+
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
