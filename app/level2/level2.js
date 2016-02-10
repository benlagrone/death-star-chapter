var level2={};
level2.data;

level2.updateElement = function(){
    levels.moveRocket(document.getElementById("rocket"));
    levels.moveSaturn(document.getElementById("saturn").getElementsByTagName('object')[0]);
    document.getElementById('objects1').style.bottom = levels.click.setElementBottomPosition(document.getElementById('objects1'),1);
    document.getElementById('objects2').style.bottom = levels.click.setElementBottomPosition(document.getElementById('objects2'),1)
    level2.getMovingElements(function (theObject,increment){
        theObject.style.position = "relative";
        theObject.style.left = levels.click.setElementLeftPosition(theObject,increment);
    });
    var ScrollPosition = Math.round(100*window.pageYOffset/(document.body.scrollHeight-document.documentElement.clientHeight));
    for(i=0;i<level2.data.objectgroups.messages.objects.length;i++){
        var messageObject = level2.data.objectgroups.messages.objects[i];
        if(messageObject.position===ScrollPosition){
            levels.showMessage.show(level2.data.objectgroups.messages.objects[i])
        }
    }
};

level2.getMovingElements = function(callback){
    for(var h = 0;h<document.getElementsByClassName("row").length;h++){
        if((window.pageYOffset + (window.innerHeight))>document.getElementsByClassName("row")[h].offsetTop && (window.pageYOffset)<(document.getElementsByClassName("row")[h].offsetTop+(window.innerHeight/2*3))){
        if(document.getElementsByClassName("row")[h].getElementsByClassName("smallship").length>0){
            for(j=0;j<document.getElementsByClassName("row")[h].getElementsByClassName("smallship").length;j++){
                switch(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j].getAttribute('id')) {
                    case 'rocket2':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -4);
                        break;
                    case 'falcon':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -3);
                        break;
                    case 'x-wing':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], -2);
                        break;
                    case 'tie-fighter':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 2);
                        break;
                    case 'satellite1':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 7);
                        break;
                    case 'satellite2':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 3);
                        break;
                    case 'satellite3':
                        callback(document.getElementsByClassName("row")[h].getElementsByClassName("smallship")[j], 2);
                        break;
                    default:
                        ;
                    }
                }
            }else if(document.getElementsByClassName("row")[h].getElementsByClassName("deathStarAdd").length>0&&(document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length))>=.995){
            //console.log(document.getElementsByClassName("row")[h].getElementsByClassName("deathStarAdd"))
            //console.log(document.getElementsByClassName("row")[h].offsetTop)
            //console.log(window.innerHeight)
            //console.log(document.getElementById("rocket").getBoundingClientRect().bottom)
            //console.log(window.innerHeight*(document.getElementsByClassName("row").length))
            //console.log((window.innerHeight*(document.getElementsByClassName("row").length))/(document.getElementById("rocket").getBoundingClientRect().bottom))
            //console.log((document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)))
            //console.log((document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length))>=.99)
            console.log('explode')
        }
        }
    }
};

level2.request = function() {
    var url = 'app/level2/level2.json';
    services.getPage(url,'level2',level2.parseAjax,id);
};


level2.parseAjax = function (xhr,id) {
    level2.data = JSON.parse(xhr.responseText);

    //var level1SaturnHtml='<div id="saturnSpace"><i class="'+level2.data.objectgroups.objects.saturn.objects[0].idclass+' '+level2.data.objectgroups.objects.saturn.objects[0].colorclass+'"></i></div>';

    var level2SaturnHtml='<div id="'+level2.data.objectgroups.objects.saturn.objects[0].type+'" class="'+level2.data.objectgroups.objects.saturn.objects[0].idclass+' '+level2.data.objectgroups.objects.saturn.objects[0].sizeclass+' '+level2.data.objectgroups.objects.saturn.objects[0].colorclass+'">';
    level2SaturnHtml+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.saturn.objects[0].idclass+'.svg" >'+level2.data.objectgroups.objects.saturn.objects[0].type+'</object>';
    level2SaturnHtml+='</div>';

    document.getElementById('saturnObject').innerHTML=level2SaturnHtml;

    var level2StarsHtml = '<div id="stars">';
    for(i=0;i<level2.data.objectgroups.stars.objects.length;i++){
        level2StarsHtml+='<i class="'+level2.data.objectgroups.stars.objects[i].idclass+' '+level2.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level2StarsHtml += '</div>';
    document.getElementById('starsObject').innerHTML=level2StarsHtml;
    levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");

    var rocketObjectStart = '<div id="rocket"><span>';
    for (var key in level2.data.objectgroups.objects.rocket.objects){
        rocketObjectStart+='<i class="'+level2.data.objectgroups.objects.rocket.objects[key].idclass+' '+level2.data.objectgroups.objects.rocket.objects[key].sizeclass+' '+level2.data.objectgroups.objects.rocket.objects[key].colorclass+'"></i>';
    }
    rocketObjectStart+='</span></div>';
    document.getElementById('rocketObject').innerHTML=rocketObjectStart;

    var objects1HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships1.objects){
        objects1HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships1.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships1.objects[key].idclass+' '+level2.data.objectgroups.objects.starships1.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships1.objects[key].colorclass+'">';
        objects1HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships1.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships1.objects[key].type+'</object>';
        objects1HTMLStart+='</div>';
    }
    document.getElementById('objects1').innerHTML=objects1HTMLStart;
    levels.spreadObjects(document.getElementById("objects1").getElementsByClassName("smallship"),150,150,1,1,"relative","%");

    var objects2HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships2.objects){
        objects2HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships2.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships2.objects[key].idclass+' '+level2.data.objectgroups.objects.starships2.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships2.objects[key].colorclass+'">';
        objects2HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships2.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships2.objects[key].type+'</object>';
        objects2HTMLStart+='</div>';
    }
    document.getElementById('objects2').innerHTML=objects2HTMLStart;
    levels.spreadObjects(document.getElementById("objects2").getElementsByClassName("smallship"),150,150,1,1,"relative","%");

    var objects3HTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships3.objects){
        objects3HTMLStart+='<div id="'+level2.data.objectgroups.objects.starships3.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships3.objects[key].idclass+' '+level2.data.objectgroups.objects.starships3.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships3.objects[key].colorclass+'">';
        objects3HTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships3.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships3.objects[key].type+'</object>';
        objects3HTMLStart+='</div>';
    }
    document.getElementById('objects3').innerHTML=objects3HTMLStart;
    levels.spreadObjects(document.getElementById("objects3").getElementsByClassName("smallship"),150,150,1,1,"relative","%");

    var deathStarObject = '';
    for (var key in level2.data.objectgroups.objects.death_star.objects) {
        deathStarObject += '<div id="' + level2.data.objectgroups.objects.death_star.objects[key].type + '" class="' + level2.data.objectgroups.objects.death_star.objects[key].idclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].sizeclass + ' ' + level2.data.objectgroups.objects.death_star.objects[key].colorclass + '">';
        if(level2.data.objectgroups.objects.death_star.objects[key].type!='cloud'){
            deathStarObject += '<object type="image/svg+xml" data="lib/space-icons/' + level2.data.objectgroups.objects.death_star.objects[key].idclass + '.svg" >' + level2.data.objectgroups.objects.death_star.objects[key].type + '</object>';
        }

        deathStarObject += '</div>';
    }
    document.getElementById('deathstarObject').innerHTML=deathStarObject;

};

level2.click={};
level2.click.left = levels.click.left;
level2.click.right = levels.click.right;


if(id==='home'){

}else{
    level2.request();
    levels.load('level2.updateElement()');
}
