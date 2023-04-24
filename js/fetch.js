/* ////////////////////////////////////////////////////////////////////////////////////////

This file stores functions that are used to fetch and load data from endpoints, 
and then store is as viarables such that they can be called in other functions, 
to use the endpoints data 

To allow other functions dependent on the AJAX call loading before it runs,
AJAX Promisify is required

The code to promisify Ajax call is adapted from:
https://www.taniarascia.com/how-to-promisify-an-ajax-call/

*/ ////////////////////////////////////////////////////////////////////////////////////////


"use strict";


// This function fetches the user_id from endpoint "/userId"
// And stores it as variable userId
// This function allows the user_id in other endpoints to be not hard-coded
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
            console.log("Fetched user_id:" + userId);
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


// This function fetches the the condition values and descriptions from endpoint "/conditionDetails"
// And stores the condition_option table as a dictionary
// This function allows the condtion_descriptions in the dashboard application to be not-hardcoded
// In the bootStrap, our main application, this function is not implemented
function fetchConditionMapping() {
    let serviceUrl = document.location.origin + "/api/conditionDetails";
    return fetch(serviceUrl)
      .then(response => response.json())
      .then(mapping => {
        const conditionMapping = {};
  
        mapping.forEach(condition => {
          conditionMapping[condition.condition_description] = condition.id;
        });
        
        
        return conditionMapping;
      });
  }





