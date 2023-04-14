"use strict";
////////////////////////////////////////////
//function for assetForm
////////////////////////////////////////////
function saveNewAsset() {
	alert ("start data upload");

	let asset_name = document.getElementById("asset_name").value;
	let date = document.getElementById("installation_date").value;
	let longitude = document.getElementById("longitude").value;
    let latitude = document.getElementById("latitude").value;
    let user = document.getElementById("user_id").innerHTML;

	//alert(asset_name + " "+ date + " "+module);
	
	let postString = "asset_name="+asset_name +"&installation_date="+date+"&latitude="+latitude+"&longitude="+longitude+ "&user_id=" + user;
	
	processData(postString);

}



function processData(postString) {
	//alert(postString);

	let serviceUrl = document.location.origin + "/api/insertAssetPoint";
    $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); dataUploaded(data);}
    }); 

}
// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
    alert("Data has been uploaded:" + JSON.stringify(data));
}


function deleteSingleAsset() {
	let deleteID = document.getElementById("deleteID").value;
	let deleteString = "id="+deleteID;
	let serviceUrl= document.location.origin + "/api/insertAssetPoint";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); 
            dataDeleted1(data);},
	    data: deleteString
});	
}

function dataDeleted1(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
    alert("Condition has been deleted:"+ JSON.stringify(data));

}





////////////////////////////////////////////
//function for conditionSurvey
////////////////////////////////////////////

function saveCondition() {
    alert ("start condition saving");

    // get ID of the asset
    let assetID = document.getElementById("asset_id").innerHTML;
    let assetName = document.getElementById("asset_name").value;
    let user = document.getElementById("user_id").innerHTML;
    let date = document.getElementById("installation_date").value;
    let postString="asset_id=" + assetID;
    let Condition = "";
    let condition_description = document.getElementById("condition_description").innerHTML;
    
    // now get the condition from radio button values
    
	if (document.getElementById("1").checked) {
        postString=postString+"&condition_id=1";
        Condition="1";
    }
    if (document.getElementById("2").checked) {
        postString=postString+"&condition_id=2";
        Condition="2";
    }
    if (document.getElementById("3").checked) {
        postString=postString+"&condition_id=3";
        Condition="3";
    }
    if (document.getElementById("4").checked) {
        postString=postString+"&condition_id=4";
        Condition="4";
    }
    if (document.getElementById("5").checked) {
        postString=postString+"&condition_id=5";
        Condition="5";
    }
    postString=postString+"&asset_name=" + assetName;
    postString=postString+ "&condition_description=" + condition_description;
	//postString=postString+ "&user_id=" + user;
    // get previous condition from hidden field
    let pre_Condition = document.getElementById("previousConditionValue").innerHTML;
    //postString =postString+"&previousConditionValue="+pre_Condition;
	
    if (pre_Condition==Condition) {
        alert("Previous condition is the same as your selected");
    }
    else{
        alert("Previous condition is different from your selected");
    }


    processCondition(postString);

}


function processCondition(postString) {
	//alert(postString);

	let serviceUrl = document.location.origin + "/api/insertConditionInformation";
    $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); ConditionUploaded(data);}
    }); 

}
// create the code to process the response from the data server
function ConditionUploaded(data) {
    // change the DIV to show the response
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
    alert("Condition has been deleted:"+ JSON.stringify(data));

}