var leaderboard = {};

leaderboard.request = function() {
    var url = 'app/leaderboard/leaderboard.json';
    services.getPage(url,id,leaderboard.parseAjax,id);
    document.getElementById('curtain').className = 'fade';
};

leaderboard.load = function(){

};

leaderboard.parseAjax = function (xhr,id){

    var data = JSON.parse(xhr.responseText);

    var leaderboardLength = id==='home'?3:data.objectgroups.leaders.objects.length;

    var leaderboardHtml = '';
    for(i=0;i<leaderboardLength;i++){

        leaderboardHtml+='<li><span class="dark"><i class="fa fa-fort-awesome"></i>&nbsp;'+data.objectgroups.leaders.objects[i].person+'</span>&nbsp;' +'<span>' +data.objectgroups.leaders.objects[i].score+'</span></li>';
    }

    document.getElementById('leaderboard-list').innerHTML=leaderboardHtml;
};

if(id==='home'){
    leaderboard.request();
}else{
    leaderboard.request();
    //leaderboard.load();
}

