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

var country_list = [{"name":"Afghanistan","code":"AFG","id":"004"},{"name":"Albania","code":"ALB","id":"008"},{"name":"Algeria","code":"DZA","id":"012"},{"name":"Andorra","code":"AND","id":"020"},{"name":"Angola","code":"AGO","id":"024"},{"name":"Antarctica","code":"ATA","id":"010"},{"name":"Argentina","code":"ARG","id":"032"},{"name":"Armenia","code":"ARM","id":"051"},{"name":"Australia","code":"AUS","id":"036"},{"name":"Austria","code":"AUT","id":"040"},{"name":"Azerbaijan","code":"AZE","id":"031"},{"name":"Bahamas","code":"BHS","id":"044"},{"name":"Bahrain","code":"BHR","id":"048"},{"name":"Bangladesh","code":"BGD","id":"050"},{"name":"Barbados","code":"BRB","id":"052"},{"name":"Belarus","code":"BLR","id":"112"},{"name":"Belgium","code":"BEL","id":"056"},{"name":"Belize","code":"BLZ","id":"084"},{"name":"Benin","code":"BEN","id":"204"},{"name":"Bermuda","code":"BMU","id":"060"},{"name":"Bhutan","code":"BTN","id":"064"},{"name":"Bolivia (Plurinational State of)","code":"BOL","id":"068"},{"name":"Bosnia and Herzegovina","code":"BIH","id":"070"},{"name":"Botswana","code":"BWA","id":"072"},{"name":"Brazil","code":"BRA","id":"076"},{"name":"Brunei Darussalam","code":"BRN","id":"096"},{"name":"Bulgaria","code":"BGR","id":"100"},{"name":"Burkina Faso","code":"BFA","id":"854"},{"name":"Burundi","code":"BDI","id":"108"},{"name":"Cambodia","code":"KHM","id":"116"},{"name":"Cameroon","code":"CMR","id":"120"},{"name":"Canada","code":"CAN","id":"124"},{"name":"Central African Republic","code":"CAF","id":"140"},{"name":"Chad","code":"TCD","id":"148"},{"name":"Chile","code":"CHL","id":"152"},{"name":"China","code":"CHN","id":"156"},{"name":"Colombia","code":"COL","id":"170"},{"name":"Congo","code":"COG","id":"178"},{"name":"Congo, Democratic Republic of the","code":"COD","id":"180"},{"name":"Costa Rica","code":"CRI","id":"188"},{"name":"Côte d'Ivoire","code":"CIV","id":"384"},{"name":"Croatia","code":"HRV","id":"191"},{"name":"Cuba","code":"CUB","id":"192"},{"name":"Cyprus","code":"CYP","id":"196"},{"name":"Czechia","code":"CZE","id":"203"},{"name":"Denmark","code":"DNK","id":"208"},{"name":"Djibouti","code":"DJI","id":"262"},{"name":"Dominica","code":"DMA","id":"212"},{"name":"Dominican Republic","code":"DOM","id":"214"},{"name":"Ecuador","code":"ECU","id":"218"},{"name":"Egypt","code":"EGY","id":"818"},{"name":"El Salvador","code":"SLV","id":"222"},{"name":"Equatorial Guinea","code":"GNQ","id":"226"},{"name":"Eritrea","code":"ERI","id":"232"},{"name":"Estonia","code":"EST","id":"233"},{"name":"Eswatini","code":"SWZ","id":"748"},{"name":"Ethiopia","code":"ETH","id":"231"},{"name":"Falkland Islands (Malvinas)","code":"FLK","id":"238"},{"name":"Fiji","code":"FJI","id":"242"},{"name":"Finland","code":"FIN","id":"246"},{"name":"France","code":"FRA","id":"250"},{"name":"French Guiana","code":"GUF","id":"254"},{"name":"French Southern Territories","code":"ATF","id":"260"},{"name":"Gabon","code":"GAB","id":"266"},{"name":"Gambia","code":"GMB","id":"270"},{"name":"Georgia","code":"GEO","id":"268"},{"name":"Germany","code":"DEU","id":"276"},{"name":"Ghana","code":"GHA","id":"288"},{"name":"Greece","code":"GRC","id":"300"},{"name":"Greenland","code":"GRL","id":"304"},{"name":"Guatemala","code":"GTM","id":"320"},{"name":"Guinea","code":"GIN","id":"324"},{"name":"Guinea-Bissau","code":"GNB","id":"624"},{"name":"Guyana","code":"GUY","id":"328"},{"name":"Haiti","code":"HTI","id":"332"},{"name":"Honduras","code":"HND","id":"340"},{"name":"Hungary","code":"HUN","id":"348"},{"name":"Iceland","code":"ISL","id":"352"},{"name":"India","code":"IND","id":"356"},{"name":"Indonesia","code":"IDN","id":"360"},{"name":"Iran (Islamic Republic of)","code":"IRN","id":"364"},{"name":"Iraq","code":"IRQ","id":"368"},{"name":"Ireland","code":"IRL","id":"372"},{"name":"Israel","code":"ISR","id":"376"},{"name":"Italy","code":"ITA","id":"380"},{"name":"Jamaica","code":"JAM","id":"388"},{"name":"Japan","code":"JPN","id":"392"},{"name":"Jordan","code":"JOR","id":"400"},{"name":"Kazakhstan","code":"KAZ","id":"398"},{"name":"Kenya","code":"KEN","id":"404"},{"name":"Korea (Democratic People's Republic of)","code":"PRK","id":"408"},{"name":"Korea, Republic of","code":"KOR","id":"410"},{"name":"Kuwait","code":"KWT","id":"414"},{"name":"Kyrgyzstan","code":"KGZ","id":"417"},{"name":"Laos People's Democratic Republic","code":"LAO","id":"418"},{"name":"Latvia","code":"LVA","id":"428"},{"name":"Lebanon","code":"LBN","id":"422"},{"name":"Lesotho","code":"LSO","id":"426"},{"name":"Liberia","code":"LBR","id":"430"},{"name":"Libya","code":"LBY","id":"434"},{"name":"Lithuania","code":"LTU","id":"440"},{"name":"Luxembourg","code":"LUX","id":"442"},{"name":"Madagascar","code":"MDG","id":"450"},{"name":"Malawi","code":"MWI","id":"454"},{"name":"Malaysia","code":"MYS","id":"458"},{"name":"Maldives","code":"MDV","id":"462"},{"name":"Mali","code":"MLI","id":"466"},{"name":"Malta","code":"MLT","id":"470"},{"name":"Mauritania","code":"MRT","id":"478"},{"name":"Mexico","code":"MEX","id":"484"},{"name":"Moldova, Republic of","code":"MDA","id":"498"},{"name":"Monaco","code":"MCO","id":"492"},{"name":"Mongolia","code":"MNG","id":"496"},{"name":"Montenegro","code":"MNE","id":"499"},{"name":"Montserrat","code":"MSR","id":"500"},{"name":"Morocco","code":"MAR","id":"504"},{"name":"Mozambique","code":"MOZ","id":"508"},{"name":"Myanmar","code":"MMR","id":"104"},{"name":"Namibia","code":"NAM","id":"516"},{"name":"Nauru","code":"NRU","id":"520"},{"name":"Nepal","code":"NPL","id":"524"},{"name":"Netherlands","code":"NLD","id":"528"},{"name":"New Caledonia","code":"NCL","id":"540"},{"name":"New Zealand","code":"NZL","id":"554"},{"name":"Nicaragua","code":"NIC","id":"558"},{"name":"Niger","code":"NER","id":"562"},{"name":"Nigeria","code":"NGA","id":"566"},{"name":"Niue","code":"NIU","id":"570"},{"name":"North Macedonia","code":"MKD","id":"807"},{"name":"Norway","code":"NOR","id":"578"},{"name":"Oman","code":"OMN","id":"512"},
{"name":"Pakistan","code":"PAK","id":"586"},{"name":"Palestine, State of","code":"PSE","id":"275"},{"name":"Panama","code":"PAN","id":"591"},{"name":"Papua New Guinea","code":"PNG","id":"598"},{"name":"Paraguay","code":"PRY","id":"600"},{"name":"Peru","code":"PER","id":"604"},{"name":"Philippines","code":"PHL","id":"608"},{"name":"Poland","code":"POL","id":"616"},{"name":"Portugal","code":"PRT","id":"620"},{"name":"Puerto Rico","code":"PRI","id":"630"},{"name":"Qatar","code":"QAT","id":"634"},{"name":"Réunion","code":"REU","id":"638"},{"name":"Romania","code":"ROU","id":"642"},{"name":"Russian Federation","code":"RUS","id":"643"},{"name":"Rwanda","code":"RWA","id":"646"},{"name":"Samoa","code":"WSM","id":"882"},{"name":"San Marino","code":"SMR","id":"674"},{"name":"Saudi Arabia","code":"SAU","id":"682"},{"name":"Senegal","code":"SEN","id":"686"},{"name":"Serbia","code":"SRB","id":"688"},{"name":"Sierra Leone","code":"SLE","id":"694"},{"name":"Singapore","code":"SGP","id":"702"},{"name":"Slovakia","code":"SVK","id":"703"},{"name":"Slovenia","code":"SVN","id":"705"},{"name":"Solomon Islands","code":"SLB","id":"090"},{"name":"Somalia","code":"SOM","id":"706"},{"name":"South Africa","code":"ZAF","id":"710"},{"name":"South Sudan","code":"SSD","id":"728"},{"name":"Spain","code":"ESP","id":"724"},{"name":"Sri Lanka","code":"LKA","id":"144"},{"name":"Sudan","code":"SDN","id":"729"},{"name":"Suriname","code":"SUR","id":"740"},{"name":"Sweden","code":"SWE","id":"752"},{"name":"Switzerland","code":"CHE","id":"756"},{"name":"Syrian Arab Republic","code":"SYR","id":"760"},{"name":"Taiwan","code":"TWN","id":"158"},{"name":"Tajikistan","code":"TJK","id":"762"},{"name":"Tanzania, United Republic of","code":"TZA","id":"834"},{"name":"Thailand","code":"THA","id":"764"},{"name":"Timor-Leste","code":"TLS","id":"626"},{"name":"Togo","code":"TGO","id":"768"},{"name":"Tonga","code":"TON","id":"776"},{"name":"Trinidad and Tobago","code":"TTO","id":"780"},{"name":"Tunisia","code":"TUN","id":"788"},{"name":"Turkey","code":"TUR","id":"792"},{"name":"Turkmenistan","code":"TKM","id":"795"},{"name":"Uganda","code":"UGA","id":"800"},{"name":"Ukraine","code":"UKR","id":"804"},{"name":"United Arab Emirates","code":"ARE","id":"784"},{"name":"United Kingdom","code":"GBR","id":"826"},{"name":"United States of America","code":"USA","id":"840"},{"name":"Uruguay","code":"URY","id":"858"},{"name":"Uzbekistan","code":"UZB","id":"860"},{"name":"Vanuatu","code":"VUT","id":"548"},{"name":"Venezuela (Bolivarian Republic of)","code":"VEN","id":"862"},{"name":"Vietnam","code":"VNM","id":"704"},{"name":"Western Sahara","code":"ESH","id":"732"},{"name":"Yemen","code":"YEM","id":"887"},{"name":"Zambia","code":"ZMB","id":"894"},{"name":"Zimbabwe","code":"ZWE","id":"716"}]

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
            success: function(result) {
                result.sort((a, b) => a.name.localeCompare(b.name));
               var $dropdown = $("#searchBox");
                $.each(result, function() {
                    $dropdown.append($("<option />").val(this.code).text(this.name));
                });
  
                                   
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
    getCountryName(_lat, _lon).then(countryName => {
        //find country code from latitude and longtityde
        country_list.forEach(function (country) {
           if (country['name'].includes(countryName)) {
                id = country['code'];
            }
        });
        $('#searchBox').val(id);
        getData(id);
    });
}
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
async function getCountryName(_lat, _lon) {

    try {
      let response = await fetch(`http://api.geonames.org/countryCodeJSON?lat=${_lat}&lng=${_lon}&username=gradian`);
  
      if(response.ok) {
        let json = await response.json();
  
        if(json.countryName != undefined && json.countryName != null) {
          return json.countryName;
        }
      }
      else {
        throw "bad response from server!";
      }
    }
    catch(error) {
        console.log(error);
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


