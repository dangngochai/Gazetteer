<?php

$executionStartTime = microtime(true) / 1000;
//API call
$url='http://api.geonames.org/countryCodeJSON?lat='. $_REQUEST['lat'] . '&lng='. $_REQUEST['lng'] .'&username=gradian';



$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);

$result=curl_exec($ch);

curl_close($ch);

$decode = json_decode($result,true);	

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "mission saved";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');
//send back data to javascript 
echo json_encode($decode); 

?>