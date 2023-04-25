/* ////////////////////////////////////////////////////////////////////////////////////////

This file defines functions for data uploading through the 
Asset creation form and ConditionSurvey form

*/ ////////////////////////////////////////////////////////////////////////////////////////

"use strict";

////////////////////////////////////////////
//        function for assetForm          //
////////////////////////////////////////////

// This function is called when the save on asset creation form is triggered
// And upload the asset to the database
function saveNewAsset() {
	alert ("start data upload");

	let asset_name = document.getElementById("asset_name").value;
	let date = document.getElementById("installation_date").value;
	let longitude = document.getElementById("longitude").value;
    let latitude = document.getElementById("latitude").value;
    let user = document.getElementById("user_id").innerHTML;

    // Check whether the user is given an asset_name
	if (asset_name.trim() === "") {
        // The user has not provided an asset_name
        alert("Error: Please enter a valid asset name!");
        console.error("Error: Please enter a valid asset name!");
      }

    // Check whether the user is given an installation_date
    else if (date === ""){
        // The user has not provided an installation_date
        alert("Error: Please choose a valid installation date!");
        console.error("Error: Please choose a valid installation date!");
    }
    else{
        let postString = "asset_name="+asset_name +"&installation_date="+date+"&latitude="+latitude+"&longitude="+longitude+ "&user_id=" + user;
	    processData(postString);
    }
}


// Process the response from the data server
function processData(postString) {
	let serviceUrl = document.location.origin + "/api/insertAssetPoint";
    $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); dataUploaded(data);},
    error: function (jqXHR, textStatus, errorThrown) {
        //This will alert the message if the user gives a asset_name that has been in the dataset
        if (jqXHR.status === 400) {
          alert(jqXHR.responseText);
        } else {
          alert("Error submitting form: " + errorThrown);
        }
      }
    }); 
}

// Store and show the upladed data in the responseDIV
function dataUploaded(data) {
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
    alert("Data has been uploaded:" + JSON.stringify(data));
}

/* Delete functions are not required in the app
function deleteSingleAsset() {
	let deleteID = document.getElementById("delete_id").value;
	let deleteString = "id="+deleteID;
	let serviceUrl= document.location.origin + "/api/deleteAsset";
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
*/


  
////////////////////////////////////////////
//function for conditionSurvey
////////////////////////////////////////////

// This function is called when the save button on Condition Survey form is triggered
// And upload the condition information to the database
function saveCondition() {
    alert ("start condition saving");

    let assetID = document.getElementById("asset_id").innerHTML;
    let assetName = document.getElementById("asset_name").value;
    let postString="asset_id=" + assetID;
    let Condition = "";
    let condition_description = document.getElementById("condition_description").innerHTML;
    
    // Get the condition from radio button values
    
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
	
    // get previous condition from hidden field
    let pre_Condition = document.getElementById("previousConditionValue").innerHTML;
	
    // Compare the previosu contion with selected condition
        if (pre_Condition==condition_description) {
            alert("Previous condition is the same as your selected");
        }
        else{
            alert("Previous condition is different from your selected");
        }
    
    processCondition(postString);

    // When a new condtion report is saved, the color of the asset point will be updated
    updateLayerColor(assetID, Condition);
}



// Process the response from the data server
function processCondition(postString) {

	let serviceUrl = document.location.origin + "/api/insertConditionInformation";
    $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); 
    // Fetch the userId using the fetchUserId function
  fetchUserId()
  .then((userId) => {
    // Call ConditionUploaded with the fetched userId
    ConditionUploaded(data,userId);
  })
  .catch((error) => {
    console.error("Error fetching user ID:", error);
  });}
    }); 

}



// Store and show the upladed data in the responseDIV
// And Alert the number of condition reports submited by the user
function ConditionUploaded(data,userId) {
    // change the DIV to show the response
    document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
    alert("Condition has been uploaded:"+ JSON.stringify(data));


    let serviceUrl = document.location.origin + "/api/userConditionReports/"+userId;
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function(data) {
            // Extract the count from the response data and show an alert
            let count = data[0].array_to_json[0].num_reports;
            alert("You have saved " + count + " condition reports.");
          },
        error: function(err) {
        console.error("Error fetching the count of condition reports:", err);
        }
    });
}

  



function deleteRecord() {
	let deleteID = document.getElementById("delete_id").value;
	let deleteString = "id="+deleteID;
	let serviceUrl= document.location.origin + "/api/deleteConditionReport";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); 
		dataDeleted(data);},
	    data: deleteString
});	
}
function dataDeleted(data){
    document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data);
	alert("Data has been deleted!")
}

