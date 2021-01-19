//initialise globals
var templates = {};
var controllers = {};
var views = {};

window.onload = function(){
    console.log('Application loaded at ' + Date.now());
    
    //register router
    window.addEventListener(
        "hashchange", 
        function(){utils.router()}
    );

    utils.router();
};