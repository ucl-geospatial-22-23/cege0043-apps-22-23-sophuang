"use strict";
////////////////////////////////////////////
//function for assetForm
////////////////////////////////////////////
function saveNewAsset() {
	alert ("start data upload");

	let name = document.getElementById("name").value;
	let surname = document.getElementById("surname").value;
	let module = document.getElementById("module").value;

	alert(name + " "+ surname + " "+module);
	
	let postString = "name="+name +"&surname="+surname+"&module="+module;
	
		// now get the checkbox values - separate them with a | so that they can be // split later on if necessary
	let checkString = "";
	for (let i = 1;i< 5;i++){
		if (document.getElementById("check"+i).checked === true) {
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}

	}
		// now get the select box values
	let language = document.getElementById("languageselectbox").value;
	postString = postString + "&language="+language;

	// now get the geometry values
	let latitude = document.getElementById("latitude").value;
	let longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;

	postString = postString + "&modulelist="+checkString;


// now get the radio button values
	if (document.getElementById("morning").checked) {
 		 postString=postString+"&lecturetime=morning";
	}
	if (document.getElementById("afternoon").checked) {
 		 postString=postString+"&lecturetime=afternoon";
	}

	
	processData(postString);

}



function processData(postString) {
	alert(postString);

	let serviceUrl = document.location.origin + "/api/testCRUD";
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
}


function deleteSingleAsset() {
	let deleteID = document.getElementById("deleteID").value;
	let deleteString = "id="+deleteID;
	let serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); dataDeleted(data);},
	    data: deleteString
});	
}

function dataDeleted(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
}





////////////////////////////////////////////
//function for conditionSurvey
////////////////////////////////////////////

function saveCondition() {
    alert ("start condition saving");

    // get ID of the asset
    let assetID = document.getElementById("assetID").value;
    let postString = "assetID="+assetID;
    let Condition = "";

    // now get the condition from radio button values
	if (document.getElementById("1").checked) {
        postString=postString+"&ConditionValue=1";
        Condition="1";
    }
    if (document.getElementById("2").checked) {
        postString=postString+"&ConditionValue=2";
        Condition="2";
    }
    if (document.getElementById("3").checked) {
        postString=postString+"&ConditionValue=3";
        Condition="3";
    }
    if (document.getElementById("4").checked) {
        postString=postString+"&ConditionValue=4";
        Condition="4";
    }
    if (document.getElementById("5").checked) {
        postString=postString+"&ConditionValue=5";
        Condition="5";
    }
	
    // get previous condition from hidden field
    let pre_Condition = document.getElementById("previousConditionValue").value;
    postString =postString+"&previousConditionValue="+pre_Condition;
	
    if (pre_Condition==Condition) {
        alert("Previous condition is the same as your selected");
    }
    else{
        alert("Previous condition is different from your selected");
    }


    processCondition(postString);

}


function processCondition(postString) {
	alert(postString);

	let serviceUrl = document.location.origin + "/api/testCRUD";
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
}