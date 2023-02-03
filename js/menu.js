"use strict";

function menu1() {
    alert("menu1 clicked");
}

function menu3() {
    alert("menu3");
}

function menu4() {
    alert("menu4");
}

function menu6() {
    alert("menu6");
}

function menu7() {
    alert("menu7");
}

function menu9() {
    alert("menu9");
}

function menu10() {
    alert("menu10");
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
