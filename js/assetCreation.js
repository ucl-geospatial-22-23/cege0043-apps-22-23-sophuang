"use strict";

let userId;

function fetchUserId() {
    return new Promise((resolve, reject) => {
      let serviceUrl = document.location.origin + "/api/userId";
  
      $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function (data) {
          if (data && data.length > 0) {
            let userId = data[0].user_id;
            resolve(userId);
          } else {
            reject("Error fetching user ID: empty response");
          }
        },
        error: function (errorThrown) {
          reject("Error fetching user ID: " + errorThrown);
        },
      });
    });
  }
  
  
 function fetchUserRanking(userId) {
    let serviceUrl = document.location.origin + "/api/userRanking/" + userId;
  
        $.ajax({
            url: serviceUrl,
            crossDomain: true,
            type: "GET",
            success: function(data) {
            // Extract the ranking from the response data and show an alert
            let ranking = data[0].array_to_json[0].rank;
            alert("Your ranking based on condition reports is: " + ranking);
            },
            error: function(err) {
            console.error("Error while fetching user ranking:", err);
            }
        });
 } 

  
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
    success: function(data){console.log(data); dataUploaded(data);},
    error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 400) {
          alert(jqXHR.responseText);
        } else {
          alert("Error submitting form: " + errorThrown);
        }
      }
    }); 

}
// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
    alert("Data has been uploaded:" + JSON.stringify(data));
}


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

function loadUserAssets_A(userId) {
    let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (data) {
        console.log(data);
        displayAssetsOnMap(data);
        setUpConditionClick(data);
      },
    });
  }

function loadUserAssets_C(userId) {
    let serviceUrl = document.location.origin + "/api/userAssets/" + userId;
  
    $.ajax({
      url: serviceUrl,
      crossDomain: true,
      type: "GET",
      success: function (data) {
        console.log(data);
        displayAssetsOnMap(data);
        setUpPointClick(data);
      },
    });
  }
  
  //setUpPointClick(assetData);
  function displayAssetsOnMap(assetData) {

    let assetPoints = L.geoJSON(assetData, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Asset Name: " + feature.properties.asset_name);
      }
    });
    assetPoints.addTo(mymap);
    
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

	

        if (pre_Condition==condition_description) {
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
    alert("Condition has been uploaded:"+ JSON.stringify(data));
    fetchUserId();
    let serviceUrl = document.location.origin + "/api/userConditionReports/600";
  
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


