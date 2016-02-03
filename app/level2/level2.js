var level2={};
//console.log(id);

level2.data;


level2.updateElement = function(){
    console.log('scroll')
    levels.moveRocket(document.getElementById("rocket"));
};


level2.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
};

level2.getMovingElements = function(callback){};


level2.request = function() {
    var url = 'app/level2/level2.json';
    services.getPage(url,'level2',level2.parseAjax,id);
};


level2.parseAjax = function (xhr,id) {
    level2.data = JSON.parse(xhr.responseText);

    var rocketObjectStart = '<div id="rocket"><span>';
    for (var key in level2.data.objectgroups.objects.rocket.objects){
        rocketObjectStart+='<i class="'+level2.data.objectgroups.objects.rocket.objects[key].idclass+' '+level2.data.objectgroups.objects.rocket.objects[key].sizeclass+' '+level2.data.objectgroups.objects.rocket.objects[key].colorclass+'"></i>';
    }
    rocketObjectStart+='</span></div>';
    document.getElementById('rocketObject').innerHTML=rocketObjectStart;

    var objectsHTMLStart = '';
    for (var key in level2.data.objectgroups.objects.starships.objects){
        objectsHTMLStart+='<div id="'+level2.data.objectgroups.objects.starships.objects[key].type+'" class="'+level2.data.objectgroups.objects.starships.objects[key].idclass+' '+level2.data.objectgroups.objects.starships.objects[key].sizeclass+' '+level2.data.objectgroups.objects.starships.objects[key].colorclass+'">';
        objectsHTMLStart+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.starships.objects[key].idclass+'.svg" >'+level2.data.objectgroups.objects.starships.objects[key].type+'</object>';
        objectsHTMLStart+='</div>';
    }
    document.getElementById('objects').innerHTML=objectsHTMLStart;

    var deathStarObject = '';
    deathStarObject+='<div id="'+level2.data.objectgroups.objects.death_star.objects[0].type+'" class="'+level2.data.objectgroups.objects.death_star.objects[0].idclass+' '+level2.data.objectgroups.objects.starships.objects[0].sizeclass+' '+level2.data.objectgroups.objects.starships.objects[0].colorclass+'">';
    deathStarObject+='<object type="image/svg+xml" data="lib/space-icons/'+level2.data.objectgroups.objects.death_star.objects[0].idclass+'.svg" >'+level2.data.objectgroups.objects.death_star.objects[0].type+'</object>';
    deathStarObject+='</div>';
    document.getElementById('boss').innerHTML=deathStarObject;

};

level2.click={};
level2.click.left = levels.click.left;
level2.click.right = levels.click.right;


if(id==='home'){

}else{
    level2.request();
    levels.load('level2.updateElement()');
}
