"use strict";

function menu1() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 1 and menu is called by: "+ sCallerName);
}

function menu3() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 3 and menu is called by: "+ sCallerName);
}

function menu4() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 4 and menu is called by: "+ sCallerName);
}

function menu6() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 6 and menu is called by: "+ sCallerName);
}

function menu7() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 7 and menu is called by: "+ sCallerName);
}

function menu9() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 9 and menu is called by: "+ sCallerName);
}

function menu10() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 10 and menu is called by: "+ sCallerName);
}

function menu12() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 12 and menu is called by: "+ sCallerName);
}

function menu13() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 13 and menu is called by: "+ sCallerName);
}

function menu15() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 15 and menu is called by: "+ sCallerName);
}

function menu16() {
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let sCallerName = aRegexResult[1] || aRegexResult[2];
    alert("menu number is 16 and menu is called by: "+ sCallerName);
}

function trackLocation() {
    if (navigator.geolocation) {
        // test to see if there is an active tracking and clear it if so 
        // so that we don’t have multiple tracking going on
        try { (navigator.geolocation.clearWatch(geoLocationID));}
        catch (e){ console.log(e);}

        // clear any existing data from the map
        removeTracks();
        // need to tell the tracker what we will do with the coordinates – showPosition
        // also what we will do if there is an error – errorPosition
        // also set some parameters – e.g how often to renew, what timeout to set
        const options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000};

        geoLocationID = navigator.geolocation.watchPosition(showPosition, errorPosition, options);
    } 
    else {
        document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; 
    }
}


function removePositionPoints() {
    // disable the location tracking so that a new point won't be added while you are removing the old points 
    // use the geoLocationID to do this
    navigator.geolocation.clearWatch(geoLocationID);
    removeTracks();
    }
