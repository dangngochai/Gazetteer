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

			console.log(result);

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
