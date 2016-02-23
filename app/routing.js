//var pageRoute
var routing = {};
routing.routesArray = [];

services.routing.register('home',function(){
    pageRoute = {
        page:"./app/home/home.html",
        partial:"./app/home/home-home.html",
        script:"./app/home/home.js"
    };
    //console.log('home')
});
services.routing.register('level1',function(){
    pageRoute = {
        page:"./app/level1/level1.html",
        partial:"./app/level1/home-level1.html",
        script:"./app/level1/level1.js",
        data:"./app/level1/level1.json"
    };
    //console.log('level1')
});
services.routing.register('level2',function(){
    pageRoute = {
        page:"./app/level2/level2.html",
        partial:"./app/level2/home-level2.html",
        script:"./app/level2/level2.js"
    };
    //console.log('level1')
});
services.routing.register('leaderboard',function(){
    pageRoute = {
        page:"./app/leaderboard/leaderboard.html",
        partial:"./app/leaderboard/home-leaderboard.html",
        script:"./app/leaderboard/leaderboard.js",
        data:"./app/leaderboard/leaderboard.json"
    };
    //console.log('leaderboard')
});

services.routing.register('credits',function(){
    pageRoute = {
        page:"./app/credits/credits.html",
        partial:"./app/credits/home-credits.html",
        script:"./app/credits/credits.js",
        data:"./app/credits/credits.json"
    };
    //console.log('level1')
});



window.onhashchange = services.routing.getLocationHash;
window.onload = services.routing.getLocationHash;