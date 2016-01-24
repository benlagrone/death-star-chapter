var services = {};
services.getPage = function(url,id,callBack,hash){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callBack(xhttp,id,hash);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
};

services.routing = {};
services.routing.transition = function(){
    document.getElementById('curtain').className = '';

};
services.routing.register = function(path, callBack){
    var routeObject = {};
    routeObject.path = path;
    routeObject.callBack = callBack;
    routing.routesArray.push(routeObject);
};
services.routing.getLocationHash = function(){
    services.routing.transition();
    if(!window.location.hash)
        window.location.hash = '#home';
    services.routing.useArray(window.location.hash.split('#')[1])
};
services.routing.useArray = function(hash){
    for(i=0;i<routing.routesArray.length;i++){
        if(routing.routesArray[i].path===hash)
            routing.routesArray[i].callBack.call();
    }
    services.getPage(pageRoute.page,'content',services.routing.writeHTML,hash);
    services.getPage(pageRoute.script,'head',services.routing.writeScript,'hash');

};
services.routing.writeHTML = function(xhr,id){
    if(document.getElementById(id)!=null)
    document.getElementById(id).innerHTML = xhr.responseText;
};
services.routing.writeScript = function(xhr,id,hash){
    var newScript = document.createElement('script');
    newScript.text = 'var id= "'+hash+'";';
    newScript.text += xhr.responseText;
    document.getElementsByTagName(id).item(0).appendChild(newScript);
};
services.routing.writeJSON = function(xhr){
    var data = JSON.parse(xhr.responseText);
};





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

