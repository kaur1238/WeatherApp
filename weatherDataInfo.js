$(document).on('click','#searchBtn',function(){
    var Selectedinput = document.getElementById('userInput').value;
    var degree = $('#searchMenu input[type=radio]').val();
    
    var substringCityName = Selectedinput.substring(0,Selectedinput.indexOf(','));
    
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+substringCityName+",ca&units="+degree+"&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:currentWeather
    });
    
    $.ajax({		
        url: "http://api.openweathermap.org/data/2.5/forecast?q="+substringCityName+",ca&units="+degree+"&cnt=50&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:hourlyWeatherData
    });
    
    $.ajax({		
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+substringCityName+",ca&units="+degree+"&cnt=7&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:weather16Data
    });
});

function currentWeather(currData){
    //var currData = JSON.parse(data);
    var weatherData=currData.weather[0];
    var mainData=currData.main; 
    var windData=currData.wind;
    var geoData=currData.sys;
    var cityData=currData.name;
    var pressure=mainData.pressure* 0.02961339710085;// barometric pressure (converting hPa to inches)
    pressure=pressure.toFixed(2);
    var windDeg=windData.deg;
    var compass=Math.round((windDeg-11.25) / 22.5);
    var windNames = new Array("North","North Northeast","Northeast","East Northeast","East","East Southeast", "Southeast", 
    "South Southeast","South","South Southwest","Southwest","West Southwest","West","West Northwest","Northwest","North Northwest");
//    var windShortNames = new Array("N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW");      
    var directionOfWind=windNames[compass];
    $('#CurrentWeather').html("");
    $('#CurrentWeather').append("<h3 class='city&date'>"+cityData+' ,'+geoData.country+
            "</h3><table data-role='table' class='ui-responsive'><tbody><tr><td><h1>"+mainData.temp+
            "&#176C</h1></td><td><img src='http://openweathermap.org/img/w/"+weatherData.icon+
            ".png'></td><td><h3 id='discriptionPara'>"+weatherData.description.toUpperCase()+
            "</h3></td></tr></tbody></table><hr class='hrStyle'><table data-role='table' class='ui-responsive'>\n\
            <tbody><tr><td><h3 >Min Temp :&nbsp"+mainData.temp_min+"&#176C<br>Max Temp :&nbsp"+mainData.temp_max+
            "&#176C</h3></td></tr><tr><td><h3 >ATM Pressure :&nbsp"+pressure+"&nbspInc</h3></td></tr> \n\
            <tr><td><h3>Wind Speed :&nbsp"+windData.speed+"&nbspkm/hr<br>Wind Direction :&nbsp"+directionOfWind+
            "</h3></td></tr> <tr><td><h3 >Humidity :&nbsp"+Math.round(mainData.humidity)+"%</h3></td></tr> </tbody></table>");
};

function hourlyWeatherData(resp){
   var data=resp.list[0];
   var temp=data.main.temp;
   var n=1;
   $.each(resp.list, function( index, value ){
       var wind=resp.list[index].wind.deg;

       $("#TList").append("<li id=Tdetail"+n+" ><a href='#' > <img src='http://openweathermap.org/img/w/"
               +resp.list[index].weather[0].icon+".png'><h2>"+resp.list[index].main.temp+"&#176C</h2><p>"
               +resp.list[index].weather[0].description+"`</p><p>"
               +new Date(resp.list[index].dt_txt.replace('-','/').replace('-','/')).toLocaleString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
               +"</p></a></li><div id=d"+n+"  ><table data-role='table' class='ui-responsive' ><tbody><tr><td>Max Temprature : "
               +resp.list[index].main.temp_max+"&#176C</td></tr><tr><td>Minimum Temprature : "+resp.list[index].main.temp_min+"&#176C </td></tr><tr><td>Humidity :  "
               +Math.round(resp.list[index].main.humidity)+"%</td></tr>  <tr><td>Cloud : "+resp.list[index].clouds.all+"</td></tr> \n\
               <tr><td>pressure : &nbsp "+((resp.list[index].main.pressure)*0.02961339710085).toFixed(2)+"&nbspinches</td></tr>\n\
               <tr><td>wind speed :  "+resp.list[index].wind.speed+"&nbspkm/hr</td></tr>  <tr><td>wind direction :  "+windDirection(wind)+
               "</td></tr></tbody></table><div>");
       $("#d"+n).hide();
       checkDisplay(n)
        n++;
     });
    $('#TList').listview().listview('refresh');
};
function windDirection(windDeg){
    var compass=Math.round((windDeg-11.25) / 22.5);
    var windNames = new Array("North","North Northeast","Northeast","East Northeast","East","East Southeast", "Southeast", "South Southeast",
    "South","South Southwest","Southwest","West Southwest","West","West Northwest","Northwest","North Northwest");
    // array of abbreviated (compass) names
    var windShortNames = new Array("N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW");
    var directionOfWind=windNames[compass];
    return directionOfWind;
    console.log(windDig);
};

function checkDisplay(n){
    $("#Tdetail"+n).click(function(){
    $("#d"+n).toggle("slow");
    });
};

function weather16Data(resp){   
    var n=1;
    $.each(resp.list, function( index, value ){

        $("#DList").append("<li id=Ddetail"+n+" ><a href='#'> <img src='http://openweathermap.org/img/w/"+resp.list[index].weather[0].icon
            +".png'><h1>"+new Date(resp.list[index].dt*1000).toLocaleDateString('en-GB', {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join('-')+"</h1><p>"+resp.list[index].weather[0].description+"</p></a></li><div id=futureD"+n+
                "><table data-role='table' class='ui-responsive' ><tbody><tr><td>Whole day Temprature : "+resp.list[index].temp.day+
                "&#176C</td></tr><tr><td>Evening Temprature : "+resp.list[index].temp.eve+"&#176C </td></tr>\n\
                <tr><td>Night Temprature : "+resp.list[index].temp.night+"&#176C </td></tr><tr><td>Morning Temprature : "
                +resp.list[index].temp.morn+"&#176C </td></tr></tbody></table><div>");
       $("#futureD"+n).hide();
       DdetailcheckDisplay(n)
       n++;
    });
    $("#DList").listview("refresh");     
};
function DdetailcheckDisplay(n){
    $("#Ddetail"+n).click(function(){
    $("#futureD"+n).toggle("slow");
    });
};
$(document).ready(function(){    
    $("#weather-Map").hide();    
    //$("#map").hide();
    $("#searchBtn").click(function(){         
        $("#weather-Map").show();
//        $("#map").show();
//        $("#weather").show();
        $("#sevenDayWeather,#next24Hour").hide();
        $(".weather").click(function(){
            $(".weatherOptions").hide();
            $(".weatherOptions"+$(this).attr('href')).show();
        });
    });    
    initialize();
});
var input='';
var autocomplete='';
function initialize() {
    var Selectedinput = document.getElementById('userInput').value;
    console.log(Selectedinput);
    var map;
    var cityName = Selectedinput.substring(0,Selectedinput.indexOf(','));
    console.log(cityName);
    var mapProp = { 
                center: new google.maps.LatLng( 0, 0), 
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    var geocoder =  new google.maps.Geocoder();
    var latValue;
    var lngValue;
    geocoder.geocode( { address: cityName}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latValue = results[0].geometry.location.lat();
            lngValue = results[0].geometry.location.lng();
            console.log("lat val " + latValue);
            console.log("long val " + lngValue);
            map.setCenter(new google.maps.LatLng(latValue, lngValue ));
            map.setZoom(7);
        } else {
            console.log(cityName + "is not ok");
        }
        });
    
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "CA"}
    };
    input = document.getElementById('userInput');
    autocomplete = new google.maps.places.Autocomplete(input, options);
    map = new google.maps.Map(document.getElementById("map"), mapProp);
    autocomplete.bindTo('bounds', map);
                
//    autocomplete.addListener('place_changed', function() {//when user changes the place
//    var place = autocomplete.getPlace();
//        if (!place.geometry) { //checks for validity of place entered
//          window.alert("Autocomplete's returned place contains no geometry");
//          return;
//        }
//        if (place.geometry.viewport) {//checks whether map shows same place as user entered
//          map.fitBounds(place.geometry.viewport);
//        } else {
//          map.setCenter(place.geometry.location);
//          map.setZoom(18); 
//        }
//    });
};


