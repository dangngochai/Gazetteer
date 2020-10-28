<?php

	$executionStartTime = microtime(true) / 1000;

	//read country's boundary from json file
    $str = file_get_contents('../../countries_small.geo.json');
    $json = json_decode($str, true);

    $listCountry = [];
    $i=0;

    foreach ($json['features'] as $country) {
        $listCountry[$i]['name']= $country['properties']['name'];
        $listCountry[$i]['code']= $country['id'];
        $i+=1;
    };

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $listCountry;
	
	header('Content-Type: application/json; charset=UTF-8');
	//send back data to javascript 
	echo json_encode($listCountry); 

?>