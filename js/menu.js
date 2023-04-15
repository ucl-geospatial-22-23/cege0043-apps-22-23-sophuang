"use strict";

function AssetBest() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu AssetBest is called by: "+ sCallerName);
}

function RatesGraph() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu RatesGraph is called by: "+ sCallerName);
}

function help() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu help is called by: "+ sCallerName);
}

function UserRanking() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu UserRanking is called by: "+ sCallerName);
    let serviceUrl = document.location.origin + "/api/userRanking/600";
  
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

function Add5assets() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add5assets is called by: "+ sCallerName);
}

function Remove5assets() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove5assets is called by: "+ sCallerName);
}

function Add5reports() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add5reports is called by: "+ sCallerName);
}

function Remove5reports() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove5reports is called by: "+ sCallerName);
}

function Add3rated() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Add3rated is called by: "+ sCallerName);
}

function Remove3rated() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu Remove3rated is called by: "+ sCallerName);
}

