var weather = {}

weather.request = function(){

    //http://openweathermap.org/api
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Houston,tx&APPID=e502ef3373e0f8ce33bf8aade934f8d4';
    var url2 = 'http://api.wunderground.com/api/2f6a955101b9b690/conditions/q/TX/Houston.json';
    //var pollenUrl = 'https://www.claritin.com/webservice/allergyforecast.php?zip=77030';
    var forecastURL = 'http://api.wunderground.com/api/2f6a955101b9b690/forecast/q/TX/Houston.json';
    services.getPage(url,'travel',weather.parseAjax,id);
    services.getPage(url2,'travel',weather.parseAjax2,id);
    services.getPage(forecastURL,'travel',weather.parseAjax3,id);
};
weather.parseAjax = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    document.getElementById('humidity').innerHTML=data.main.humidity+'%';
    document.getElementById('pressure').innerHTML=data.main.pressure;
    document.getElementById('today-high').innerHTML=Math.round((data.main.temp_max*9/5)-459.67);
    document.getElementById('today-low').innerHTML=Math.round((data.main.temp_min*9/5)-459.67);
    document.getElementById('wind').innerHTML=data.wind.speed;
    weather.setIcon('weather-icon',data.weather[0].main);

    var weatherHtml = '';
    document.getElementById('travel-list').innerHTML=weatherHtml;
};

weather.parseAjax2 = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    document.getElementById('precipitation').innerHTML=data.current_observation.precip_today_in;
};
weather.parseAjax3 = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    console.log(data.forecast.simpleforecast.forecastday);
    for(i=0;i<data.forecast.simpleforecast.forecastday.length;i++){
        document.getElementById("forecast-day-"+[i]).innerHTML = data.forecast.simpleforecast.forecastday[i].date.weekday_short;
        document.getElementById("forecast-day-temp-"+[i]).innerHTML = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;;
        weather.setIcon('weather-icon-'+i,data.forecast.simpleforecast.forecastday[i].icon)
    }
    var weatherHtml = '';
    document.getElementById('travel-list').innerHTML=weatherHtml;
};
weather.setIcon = function(id,weather){
    weather = weather.toUpperCase();
    switch(weather){
        case 'CLOUDS':
            document.getElementById(id).setAttribute('class','wi wi-day-cloudy-high');
            break;
        case 'CLEAR':
            document.getElementById(id).setAttribute('class','wi wi-day-sunny');
            break;
        case 'RAIN':
            document.getElementById(id).setAttribute('class','wi wi-day-rain');
            break;
        case 'CHANCERAIN':
            document.getElementById(id).setAttribute('class','wi wi-day-sprinkle');
            break;
        case 'PARTLYCLOUDY':
            document.getElementById(id).setAttribute('class','wi wi-day-cloudy');
            break;
        default:
            document.getElementById(id).setAttribute('class','wi wi-hot');
    }
};
weather.request();



