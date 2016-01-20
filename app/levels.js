levels = {};
levels.spreadObjects = function(x,vm,hm,va,ha,p,e){
    for (var i=0;i<x.length;i++){
        x[i].style.position = p;
        x[i].style.top = Math.floor((Math.random()*vm)+va)+e;
        x[i].style.left = Math.floor((Math.random()*hm)+ha)+e;
    }
};

levels.click = {};

levels.click.controlsAdjust = function(click){
    var sprite = document.getElementById("rocket").getElementsByTagName("span")[0];
    smoothScrollTo(window.pageYOffset-500);
    switch (click){
        case 'rightClick':
            //move right
            sprite.style.left = levels.click.setElementLeftPosition(sprite,2);

            break;
        case 'leftClick':
            //move left
            sprite.style.left = levels.click.setElementLeftPosition(sprite,-2)
            break;
    }
    document.getElementById(click).classList.add('small');
    setTimeout(function(){
        document.getElementById(click).classList.remove('small')
    }, 200);
};

levels.click.checkKey = function(e){
    e = e || window.event;
    if (e.keyCode == '37') {
        levels.click.controlsAdjust('leftClick')
    }
    else if (e.keyCode == '39') {
        levels.click.controlsAdjust('rightClick')
    }
};

levels.click.intervalMove = function(action,direction) {
    switch (action){
        case 'go':
            myTimer();
            break;
        case 'stop':
            myStopFunction();
            break;
    }
    function myStopFunction() {
        clearInterval(theTimer);
        return false;
    }
    function myTimer() {
        theTimer = setInterval(function(){
            levels.click.controlsAdjust(direction)
        }, 50);
        return false;
    }

};

levels.click.setElementLeftPosition = function(element,increment){
    if(isNaN(parseInt(element.style.left.split("p")[0]))){
        return ((element.getBoundingClientRect().left)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.left.split("p")[0]))) + increment)+"px";
    }
};

levels.click.setElementBottomPosition = function(element,increment){
    if(isNaN(parseInt(element.style.bottom.split("p")[0]))){
        return ((element.getBoundingClientRect().bottom)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.bottom.split("p")[0]))) + increment)+"px";
    }
};

document.onkeydown = levels.click.checkKey;
