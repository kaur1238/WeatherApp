$(document).ready(function(){
    
    //api call to get current weather
   $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+substringCityName+",ca&units="+degree+"&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:currentWeather
    });
    
    //api call to get next 24 hour weather
    $.ajax({		
        url: "http://api.openweathermap.org/data/2.5/forecast?q="+substringCityName+",ca&units="+degree+"&cnt=50&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:hourlyWeatherData
    });
    
    //api call to get next 7 day weather
    $.ajax({		
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+substringCityName+",ca&units="+degree+"&cnt=7&appid=467d44d09553cde3d0567741e806f6a2", //api end point
        dataType:"json",
        success:weather16Data
    });
    
    //search button on click
    $('#searchBtn').click(function(){
        var Selectedinput = document.getElementById('userInput').value;
        var degree = $('#searchMenu input[type=radio]').val();
        console.log($('#searchMenu input[type=radio]').val());
    
        var substringCityName = Selectedinput.substring(0,Selectedinput.indexOf(','));
        console.log(substringCityName);
    });
    
});

