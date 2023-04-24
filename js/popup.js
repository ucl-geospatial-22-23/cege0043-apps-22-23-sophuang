function getPopupHTML(asset_id,assetName,installationDate,lastCondition){
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
