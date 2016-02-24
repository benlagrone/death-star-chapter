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
        //console.log(((element.getBoundingClientRect())))
        return ((element.getBoundingClientRect().bottom)+increment)+"px"
    } else {
        //console.log(((Math.abs(parseInt(element.style.bottom.split("p")[0]))) + increment)+"px")
        return ((Math.abs(parseInt(element.style.bottom.split("p")[0]))))+"px";
    }
};
levels.move = {};
levels.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
};

levels.moveEarth = function(orb){
    earth.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    earth.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*2)+"px";
    earth.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    earth.getElementsByTagName("i")[0].style.transform = "rotate(" + (15 + (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*4) + "deg)";
    earth.getElementsByTagName("i")[0].style.right = (window.pageYOffset/window.innerHeight*45) + '%';
    earth.getElementsByTagName("i")[0].style.bottom = (window.pageYOffset/window.innerHeight*200) + '%';
    earth.getElementsByTagName("i")[0].style.opacity = 1.3-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length)));
};
levels.moveSaturn = function(orb){
    //orb.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    orb.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*-6)+"px";
    orb.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    orb.style.bottom = (100-(window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight-15) + '%';
};

levels.showMessage = {};
levels.showMessage.show = function(messageObject){
    //console.log(messageObject)
    document.getElementById('rocket').getElementsByClassName('fa-comment')[0].style.display = "inline";
    document.getElementById('rocket').getElementsByClassName('fa-comment')[0].innerHTML='<span>'+messageObject.text+'</span>';
    setTimeout(function(){
        document.getElementById('rocket').getElementsByClassName('fa-comment')[0].style.display = "none";
    }, messageObject.time);
};

levels.load = function(level){
    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll",level+'.updateElement()');
    document.getElementById('curtain').className = 'fade';
};

document.onkeydown = levels.click.checkKey;



window.smoothScrollTo = (function () {
    var timer, start, factor;

    return function (target, duration) {
        var offset = window.pageYOffset,
            delta  = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if( timer ) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            var y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if( factor >= 1 ) {
                clearInterval(timer); // stop animation
                factor = 1;           // clip to max 1.0
            }
            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step,10);

        return timer;
    };
}());