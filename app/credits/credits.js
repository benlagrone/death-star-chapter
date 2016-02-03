var credits = {};

credits.request = function() {
    var url = 'app/credits/credits.json';
    services.getPage(url,id,credits.parseAjax,id);
    document.getElementById('curtain').className = 'fade';
};

credits.load = function(){

};

credits.parseAjax = function (xhr,id){
    console.log('xhr')
    var data = JSON.parse(xhr.responseText);
    console.log(data.objectgroups.credits.objects)
    var creditsLength = id==='home'?3:data.objectgroups.credits.objects.length;
    var creditsHtml = '';
    console.log(creditsLength)
    for(i=0;i<creditsLength;i++){
        console.log(data.objectgroups.credits.objects[i])
        creditsHtml+='<li><span class="dark"><i class="fa fa-fighter-jet"></i>&nbsp;'+data.objectgroups.credits.objects[i].person+'</span>:&nbsp;' +'<span>' +data.objectgroups.credits.objects[i].credit+'</span></li>';
    }

    document.getElementById('credits-list').innerHTML=creditsHtml;
};

if(id==='home'){
    credits.request();
}else{
    credits.request();
    //credits.load();
}

