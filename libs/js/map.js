//set up new map
var mymap = L.map('mapid');

var userLat=0;
var userLng=0;
var geojson;
var cities_list;
var id;
var layerGroup = L.layerGroup();
var markers = L.markerClusterGroup();
var marker;
var capitalMarker = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: 'orange',
    prefix: 'fa',
    icon: 'fa-star',
    iconColor: '#fff',
    number: '',
    svg: false,
});
var normalMarker = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: 'cyan',
    prefix: 'fa',
    icon: 'fa-home',
    iconColor: '#fff',
    number: '',
    svg: false,
});

var country_list;

var wikihtml = '';

//function to return number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

    var year = a.getFullYear();
    var month = months[a.getMonth()].toUpperCase().substring(0, 3);
    var day = weekday[a.getDay()].toUpperCase();
    var date = a.getDate();
    var time = day + ' ' + date + ' ' + month + ' ' + year ;


    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
  
    return time;
 }

//set max bounds for the map
var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);


var bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
    mymap.panInsideBounds(bounds, { animate: false });
});

//add tiles to map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	minZoom: 2,
	id: 'mapbox/streets-v11',   
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'sk.eyJ1IjoiZ3JhZGlhbiIsImEiOiJja2cwaml3djgwODFrMnhxd3M3M3psMTdpIn0.h-bn_umNAtqMSoSdgEk8fQ'
}).addTo(mymap);

//set a toggle button to add markers or remove markers in the map
var toggle = L.easyButton({
    states: [{
        stateName: 'add-markers',
        icon: 'fa-map-marker',
        title: 'Show city',
        onClick: function(control) {
            mymap.addLayer(layerGroup);
            control.state('remove-markers');
        }
        
    }, {   
        stateName: 'remove-markers',
        icon: 'fa-map',
        title: 'Remove markers',
        onClick: function(control) {
            mymap.removeLayer(layerGroup);
            control.state('add-markers');
            }
    }]
  });

//set a toggle button to show weather or hide weather of a country
$('.box').hide();
var weather = L.easyButton({
    states: [{
        icon: 'fa-cloud-sun-rain',
        stateName: 'weather-forecast',
        onClick: function(control) {
            control.state('remove-weather');
            $('.view-box').hide();
            wiki.state('open-wiki');
            $('.info').hide();
            $('.box').show();
            },
        title: 'Show weather'
    }, {
        stateName: 'remove-weather',
        icon: 'fa-cloud-sun-rain',
        title: 'Hide weather',
        onClick: function(control) {
            control.state('weather-forecast');
            $('.info').show();
            $('.box').hide();
        }
    }]
});

//set a toggle button to show wiki info of a country
$('.view-box').hide();
var wiki = L.easyButton({
    states: [{
        icon: 'fa-info',
        stateName: 'open-wiki',
        onClick: function(control) {
            control.state('close-wiki');
            $('.info').hide();
            $('.box').hide();
            weather.state('weather-forecast'); 
            $('.view-box').show();
            },
        title: 'Show wiki'
    }, {
        stateName: 'close-wiki',
        icon: 'fa-info',
        title: 'Close wiki',
        onClick: function(control) {
            control.state('open-wiki');
            $('.view-box').hide();
            $('.info').show();
        }
    }]
});

//function to display weather of a country
function display(data) {
    var i;
    for (i = 1; i <= 5; i++) {
    
        var countryW = data.name.toUpperCase();
        var temp =
        Math.round(Math.round(data.temp[i]) -273.15) + 
        "&deg; C | " + data.temp[i] + "&deg; K";
        var d= timeConverter(data.date[i]);

        var font_color;
        var bg_color;
        if (Math.round(Math.round(data.temp[i]) -273.15) > 25) {
        font_color = "#d36326";
        bg_color = "#f3f5d2";
        } else {
        font_color = "#44c3de";
        bg_color = "#eff3f9";
        }
        //change the icon and color depend on weather condition
        if ((data.weather[i]).includes('Cloud')) {
            $("#"+ "weathercon" + i).html(
            "<i class='fas fa-cloud' style='color: #44c3de;'></i>"      
        );
        } else if ((data.weather[i]).includes('Rain')) {
            $("#"+ "weathercon" + i).html(
            "<i class='fas fa-cloud-rain' style='color: #6a7a7d;'></i>" 
        );
        } else if ((data.weather[i]).includes('Snow')) {
            $("#"+ "weathercon" + i).html(
            "<i class='fas fa-snowflake' style='color: #ffffff;'></i>" 
        );
        } else if ((data.weather[i]).includes('Thunder')) {
            $("#"+ "weathercon" + i).html(
            "<i class='fas fa-bolt' style='color: #f5f25b;'></i>" 
        );
        } else {
            $("#"+ "weathercon" + i).html(
                "<i class='fas fa-sun' style='color: #d36326;'></i>"
        );
        };
            
        $(".location").html(countryW);
        $("#"+ "temp" + i).html(temp);
        $("#"+ "date" + i).html(d);
        $("#"+ "detail" + i).html(data.weather[i]);
        $("#"+ "box" + i).css("background", bg_color);
        $("#"+ "location" + i).css("color", font_color);
        $("#"+ "temp" + i).css("color", font_color);
    }
};



//to make the map appear as full screen
$(window).on("resize", function() {
    $("#mapid").height($(window).height()).width($(window).width());
    mymap.invalidateSize();
}).trigger("resize");


//find user location
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;

        //place a marker on the users setLocation
        mymap.setView([51, 0], 5);
        showCountry(51, 0);

    })
 } else {
    mymap.setView([userLat, userLng], 5);
    showCountry(userLat, userLng);
 };
 



$(document).ready(function() {
    //generate drop down value for seachBox
        $.ajax({
            url: "libs/php/getCountryName.php",
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function(result) {
                result.sort((a, b) => a.name.localeCompare(b.name));
               var $dropdown = $("#searchBox");
                $.each(result, function() {
                    $dropdown.append($("<option />").val(this.code).text(this.name));
                });
                country_list = result;
                                   
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //error code
                alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
    
                $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown);
            }
        }); 
    //call function getdata when user select a country from searchBox
    mymap.setView([51.505, -0.09], 3);
    $('#searchBox').change(function(){
        if ($(this).val()=="NOT") {
            mymap.setView([51.505, -0.09], 2);
        } else {
            var selectedCountry= $(this).val();
            getData(selectedCountry);
        }
    });


});

//get data for country at clicked location by latitude and longtitude
function showCountry(_lat, _lon) {
    var countryName = getCountryName(_lat, _lon);
        //find country code from latitude and longtityde
    country_list.forEach(function (country) {
        if (country['name'].includes(countryName)) {
            id = country['code'];
        }
    });
    $('#searchBox').val(id);
    getData(id);
};

//style the boundary for each country
function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0
    };
}
//add summary info for the map
var info = L.control({position: 'bottomright'});

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Summary</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + '<hr style="margin:5px 0px">' + 'Capital: '+ props.capital + '<br />' + 'Population: '+ numberWithCommas(props.population) + '<br />' + 'Covid-19: '+ numberWithCommas(props.cases) +' cases'
        : 'Select a country');
};

info.addTo(mymap);



//function to zoom in and show marker for the selected country
function onEachFeature(feature, layer) {
    $('.box').hide();
    weather.state('weather-forecast'); 
    $('.view-box').hide();
    wiki.state('open-wiki');
    $('.info').show();
    mymap.fitBounds(layer.getBounds());
    info.update(layer.feature.properties);
    layerGroup.clearLayers();
    markers.clearLayers();
    toggle.addTo(mymap);
    weather.addTo(mymap);
    wiki.addTo(mymap);
    display(layer.feature.properties);
    $('#new').html('');
    cities_list = feature.properties.cities;
    //add info for marker pop up for each city
    cities_list.forEach(function (city) {
        let html = `
                <h3><strong>${city.name}  </strong></h3><br>
                <hr style="margin:5px 0px">
                <strong>Population :</strong> ${numberWithCommas(city.population)}<br>
                <strong>Latitude :</strong> ${city.lat}<br>
                <strong>Longtitude :</strong> ${city.lng}<br>
                <br style="clear:both">`;
        
        if (city['name']==feature.properties.capital) {
            marker = L.marker([city['lat'],city['lng']],{icon: capitalMarker});
            addMarkerPopup(html,marker);
            markers.addLayer(marker);
            
        } else {
            marker = L.marker([city['lat'],city['lng']],{icon: normalMarker});
            addMarkerPopup(html,marker);
            markers.addLayer(marker);
        }

    //fetch data for wiki info for each city in the country and add to viewbox
        var url = "https://en.wikipedia.org/w/api.php"; 

        var params = {
            action: "query",
            generator: "geosearch",
            prop: "coordinates|pageimages",
            ggscoord: city['lat'] + "|" + city['lng'],
            format: "json"
        };
    
        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
    
        fetch(url)
            .then(function(response){return response.json();})
            .then(function(response) {
                if (response.query) {
                    var pages = response.query.pages;
                };
                
                wikihtml='';
                var wikilist = [];
                for (var page in pages) {
                    if ((pages[page].thumbnail) && (!wikilist.includes(page))) {
                        wikilist.push(page);
                        wikihtml += `<li title="	" class="wiki-title">
                                            <a href="https://en.wikipedia.org/?curid=${page}" class="wiki-link" target="_blank">
                                                <div class="wiki-photo">
                                                    <img src="${pages[page].thumbnail.source}" width="50" height="50">
                                                </div>
                                                <h3 class="wiki-title">${pages[page].title}</h3>
                                                <div class="wiki-description"></div>
                                            </a>
                                        </li>
                                        <hr style="margin:5px 0px">
                                        `;
                    }
                };
                $('#new').append(wikihtml);
            })
            .catch(function(error){console.log(error);});
 
     });
     layerGroup.addLayer(markers);
   
}


//function to add popup to show detail info about countries to the marker when user clicks onto the marker
function addMarkerPopup(text, marker, open=false) {

    const options = {
        closeButton:false,
    };

    const popup = L.popup(options);

    const element = document.createElement('div');
    element.onclick = (event) => {
        this.closePopup();
    }

    element.innerHTML = text;

    popup.setContent(element);

    marker.bindPopup(popup);
    if(open) {
        marker.openPopup();
    }
};

//function to find country name from latitude and longtitude
function getCountryName(lat, lng) {
    var countryN;
	$.ajax({
		url: "libs/php/getCountryLatlng.php",
		type: 'POST',
		dataType: 'json',
		data: {
            lat: lat,
            lng: lng
        },
        async: false,
		success: function(result) {
            
             countryN = result.countryName;
															
		},
		error: function(jqXHR, textStatus, errorThrown) {
			//error code
			alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

			$('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
			console.log('jqXHR:');
			console.log(jqXHR);
			console.log('textStatus:');
			console.log(textStatus);
			console.log('errorThrown:');
			console.log(errorThrown);
		}
    }); 
    if (countryN != undefined && countryN != null) {
        return countryN;
    }  
}

   

//to find latitude and longtitude where user click on the map
mymap.on('click', function(e) {
    showCountry(e.latlng.lat,e.latlng.lng);
});


//to get data from php call for each country alpha 3 code
function getData(country) {
	$.ajax({
		url: "libs/php/getInfo.php",
		type: 'POST',
		dataType: 'json',
		data: {
			country: country
		},
		success: function(result) {
			
			$(".leaflet-interactive").remove();

			geojson = L.geoJson(result['feature'], {
				style: style,
				onEachFeature: onEachFeature
			}).addTo(mymap);

						
							
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			//error code
			alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

			$('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
			console.log('jqXHR:');
			console.log(jqXHR);
			console.log('textStatus:');
			console.log(textStatus);
			console.log('errorThrown:');
			console.log(errorThrown);
		}
	}); 		
}	


