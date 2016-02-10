var level1 = {};

level1.data;

level1.updateElement = function() {
    if(Math.round(100*window.pageYOffset/(document.body.scrollHeight-document.documentElement.clientHeight))===0){
        window.location.hash = '#home';
        return;
    }
    var ScrollPosition = Math.round(100*window.pageYOffset/(document.body.scrollHeight-document.documentElement.clientHeight));
    for(i=0;i<level1.data.objectgroups.messages.objects.length;i++){
            var messageObject = level1.data.objectgroups.messages.objects[i];
            if(messageObject.position===ScrollPosition){
                levels.showMessage.show(level1.data.objectgroups.messages.objects[i])
            }
    }

    if(document.body.scrollHeight-window.pageYOffset===document.documentElement.clientHeight)
        document.getElementById('curtain').className = 'fade';

    level1.getMovingElements(function (theObject,increment){
        theObject.style.position = "relative";
        theObject.style.left = levels.click.setElementLeftPosition(theObject,increment);
    });
    levels.moveEarth(document.getElementById("earth"));
    levels.moveRocket(document.getElementById("rocket"));
    for (var i =0; i < document.getElementById("stars").getElementsByTagName("i").length; i++){
        document.getElementById("stars").getElementsByTagName("i")[i].style.opacity = (1-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length))) -.3);
    }
};

level1.cloudCall = function(clouds){
    for (var k=0;k<clouds.classList.length;k++){
        switch (clouds.classList[k]){
            case 'fa-2x':
                clouds.style.left = levels.click.setElementLeftPosition(clouds,1);
                break;
            case 'fa-3x':
                clouds.style.left = levels.click.setElementLeftPosition(clouds,2);
                break;
            case 'fa-4x':
                clouds.style.left = levels.click.setElementLeftPosition(clouds,3);
                break;
            case 'fa-5x':
                clouds.style.left = levels.click.setElementLeftPosition(clouds,4);
                break;
            default:
                clouds.style.left = levels.click.setElementLeftPosition(clouds,.5);
                ;
        }
    }
};

level1.getMovingElements = function(callback){
    for(var i = 0;i<document.getElementsByClassName("row").length;i++){
        if((window.pageYOffset + (window.innerHeight))>document.getElementsByClassName("row")[i].offsetTop && (window.pageYOffset)<(document.getElementsByClassName("row")[i].offsetTop+(window.innerHeight/2*3))){
            for(j=0;j<document.getElementsByClassName("row")[i].getElementsByTagName("i").length;j++){
                for(k=0;k<document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList.length;k++){
                    switch(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList[k]){
                        case 'fa-cloud':
                            level1.cloudCall(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j]);
                            break;
                        case 'fa-plane':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],3);
                            break;
                        case 'fa-moon-o':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],6);
                            break;
                        case 'fa-twitter':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],2)
                            break;
                        default:
                            ;
                    }
                }
            }
        }
    }
};

level1.request = function() {
    var url = 'app/level1/level1.json';
    services.getPage(url,'level1',level1.parseAjax,id);
};


level1.parseAjax = function (xhr,id){
    level1.data = JSON.parse(xhr.responseText);

    var level1MoonHTML = '<i class="'+level1.data.objectgroups.moon.objects[0].idclass+' '+level1.data.objectgroups.moon.objects[0].sizeclass+' '+level1.data.objectgroups.moon.objects[0].colorclass+'"></i>';
    document.getElementById('p0').innerHTML=level1MoonHTML;

    var level1StarsHtml = '<div id="stars">';
    for(i=0;i<level1.data.objectgroups.stars.objects.length;i++){
        level1StarsHtml+='<i class="'+level1.data.objectgroups.stars.objects[i].idclass+' '+level1.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level1StarsHtml += '</div>';
    document.getElementById('p1').innerHTML=level1StarsHtml;
    levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");

    for (var key in level1.data.objectgroups.clouds){
        var HTMLStart = '<div class="clouds">';
        for(var key0 in level1.data.objectgroups.clouds[key].objects){
            HTMLStart+='<i class="'+level1.data.objectgroups.clouds[key].objects[key0].idclass+' '+level1.data.objectgroups.clouds[key].objects[key0].sizeclass+' '+level1.data.objectgroups.clouds[key].objects[key0].colorclass+'"></i>';
        }
        HTMLStart+= '</div>';
        document.getElementById(key).innerHTML=HTMLStart;
    }
    for (var i = 0; i < document.getElementsByClassName("clouds").length; i++){
        levels.spreadObjects(document.getElementsByClassName("clouds")[i].getElementsByTagName("i"),window.innerHeight*.75,window.innerWidth*.75,1,1-(window.innerWidth/2),"relative","px");
    }

    var objectsHTMLStart = '';
    for (var key in level1.data.objectgroups.objects){
        objectsHTMLStart+='<div id="'+key+'">';
        if(key==='rocket')
            objectsHTMLStart+='<span>';
        for(var key0 in level1.data.objectgroups.objects[key].objects){
            objectsHTMLStart+='<i class="'+level1.data.objectgroups.objects[key].objects[key0].idclass+' '+level1.data.objectgroups.objects[key].objects[key0].sizeclass+' '+level1.data.objectgroups.objects[key].objects[key0].colorclass+'"></i>';
        }
        if(key==='rocket')
            objectsHTMLStart+='</span>';
        objectsHTMLStart+='</div>';
    }
    document.getElementById('objects').innerHTML=objectsHTMLStart;

    var terraHTMLStart = '<div id="ground">';
    for (var key in level1.data.objectgroups.terra){
        terraHTMLStart+='<div class="'+key+'">';
        for(var key0 in level1.data.objectgroups.terra[key].objects){
            terraHTMLStart+='<i class="'+level1.data.objectgroups.terra[key].objects[key0].idclass+' '+level1.data.objectgroups.terra[key].objects[key0].sizeclass+' '+level1.data.objectgroups.terra[key].objects[key0].colorclass+'"></i>';
        }
        terraHTMLStart+='</div>';
    }
    terraHTMLStart+='</div>';
    document.getElementById('terra').innerHTML=terraHTMLStart;

    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("fa-tree"),0,14,-(window.innerHeight/28),1,"relative","px");
    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("small"),0,14,-(window.innerHeight/13),1,"relative","px");
    levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("large"),0,14,-(window.innerHeight/15),1,"relative","px");

};

level1.click={};
level1.click.left = levels.click.left;
level1.click.right = levels.click.right;


if(id==='home'){

}else{

    level1.request();
    levels.load('level1.updateElement()');
}
