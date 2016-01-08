var level1 = {};
console.log(id);
level1.load = function(){
    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    services.levels.spreadObjects(document.getElementById("ground").getElementsByClassName("fa-tree"),0,14,-(window.innerHeight/28),1,"relative","px");
    services.levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("small"),0,14,-(window.innerHeight/13),1,"relative","px");
    services.levels.spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("large"),0,14,-(window.innerHeight/15),1,"relative","px");

    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll","level1.updateElement()")
};



level1.updateElement = function() {
    level1.getMovingElements(function (theObject,increment){
        theObject.style.position = "relative";
        theObject.style.left = services.levels.click.setElementLeftPosition(theObject,increment);
    });
    level1.moveEarth(document.getElementById("earth"));
    level1.moveRocket(document.getElementById("rocket"));
    for (var i =0; i < document.getElementById("stars").getElementsByTagName("i").length; i++){
        document.getElementById("stars").getElementsByTagName("i")[i].style.opacity = (1-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length))) -.3);
    }
};

level1.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.transform = "rotate(" + (355 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("i")[2].style.transform = "rotate(" + (259 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
};

level1.moveEarth = function(earth){
    earth.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    earth.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*2)+"px";
    earth.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    earth.getElementsByTagName("i")[0].style.transform = "rotate(" + (15 + (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*4) + "deg)";
    earth.getElementsByTagName("i")[0].style.right = (window.pageYOffset/window.innerHeight*45) + '%';
    earth.getElementsByTagName("i")[0].style.bottom = (window.pageYOffset/window.innerHeight*200) + '%';
    earth.getElementsByTagName("i")[0].style.opacity = 1.3-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length)));
};

level1.cloudCall = function(clouds){
    for (var k=0;k<clouds.classList.length;k++){
        switch (clouds.classList[k]){
            case 'fa-2x':
                clouds.style.left = services.levels.click.setElementLeftPosition(clouds,1);
                break;
            case 'fa-3x':
                clouds.style.left = services.levels.click.setElementLeftPosition(clouds,2);
                break;
            case 'fa-4x':
                clouds.style.left = services.levels.click.setElementLeftPosition(clouds,3);
                break;
            case 'fa-5x':
                clouds.style.left = services.levels.click.setElementLeftPosition(clouds,4);
                break;
            default:
                clouds.style.left = services.levels.click.setElementLeftPosition(clouds,.5);
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
    var data = JSON.parse(xhr.responseText);
    var level1StarsHtml = '';
    for(i=0;i<data.objectgroups.stars.objects.length;i++){
        level1StarsHtml+='<i class="'+data.objectgroups.stars.objects[i].idclass+' '+data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    document.getElementById('stars').innerHTML=level1StarsHtml;
    services.levels.spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");

    var level1Cloudsp9Html = '<div class="clouds">';
    for(j=0;j<data.objectgroups.clouds.cloudgroups.p9.objects.length;j++){
        level1Cloudsp9Html+='<i class="'+data.objectgroups.clouds.cloudgroups.p9.objects[j].idclass+' '+data.objectgroups.clouds.cloudgroups.p9.objects[j].sizeclass+' '+data.objectgroups.clouds.cloudgroups.p9.objects[j].colorclass+'"></i>';
    }
    level1Cloudsp9Html += '</div>';
    document.getElementById('p9').innerHTML=level1Cloudsp9Html;

    var level1Cloudsp10Html = '<div class="clouds">';
    for(j=0;j<data.objectgroups.clouds.cloudgroups.p10.objects.length;j++){
        level1Cloudsp10Html+='<i class="'+data.objectgroups.clouds.cloudgroups.p10.objects[j].idclass+' '+data.objectgroups.clouds.cloudgroups.p11.objects[j].sizeclass+' '+data.objectgroups.clouds.cloudgroups.p10.objects[j].colorclass+'"></i>';
    }
    level1Cloudsp10Html += '</div>';
    document.getElementById('p10').innerHTML=level1Cloudsp10Html;

    var level1Cloudsp11Html = '<div class="clouds">';
    for(j=0;j<data.objectgroups.clouds.cloudgroups.p11.objects.length;j++){
        level1Cloudsp11Html+='<i class="'+data.objectgroups.clouds.cloudgroups.p11.objects[j].idclass+' '+data.objectgroups.clouds.cloudgroups.p11.objects[j].sizeclass+' '+data.objectgroups.clouds.cloudgroups.p11.objects[j].colorclass+'"></i>';
    }
    level1Cloudsp11Html += '</div>';
    document.getElementById('p11').innerHTML=level1Cloudsp9Html;

    var level1Cloudsp12Html = '<div class="clouds">';
    for(j=0;j<data.objectgroups.clouds.cloudgroups.p12.objects.length;j++){
        level1Cloudsp12Html+='<i class="'+data.objectgroups.clouds.cloudgroups.p12.objects[j].idclass+' '+data.objectgroups.clouds.cloudgroups.p12.objects[j].sizeclass+' '+data.objectgroups.clouds.cloudgroups.p12.objects[j].colorclass+'"></i>';
    }
    level1Cloudsp12Html += '</div>';
    document.getElementById('p12').innerHTML=level1Cloudsp9Html;

    var level1Cloudsp13Html = '<div class="clouds">';
    for(j=0;j<data.objectgroups.clouds.cloudgroups.p13.objects.length;j++){
        level1Cloudsp13Html+='<i class="'+data.objectgroups.clouds.cloudgroups.p13.objects[j].idclass+' '+data.objectgroups.clouds.cloudgroups.p13.objects[j].sizeclass+' '+data.objectgroups.clouds.cloudgroups.p13.objects[j].colorclass+'"></i>';
    }
    level1Cloudsp13Html += '</div>';
    document.getElementById('p13').innerHTML=level1Cloudsp13Html;

    for (var i = 0; i < document.getElementsByClassName("clouds").length; i++){
        services.levels.spreadObjects(document.getElementsByClassName("clouds")[i].getElementsByTagName("i"),window.innerHeight*.75,window.innerWidth*.75,1,1-(window.innerWidth/2),"relative","px");
    }
};

level1.click={};
level1.click.left = services.levels.click.left;
level1.click.right = services.levels.click.right;

if(id=='home'){
console.log('home home')
}else{
    level1.request();
    level1.load();
}