<div id='content'>

<div class="QM_bookmarklet_container">
	<?php
	$baseUrl = Q_Request::baseUrl();
	$baseUrlJson = json_encode($baseUrl);
	echo Q::tool("Q/bookmarklet", array(
		'title' => 'Quickmarklets',
		'usage' => 'discover and manage bookmarklets on the mobile web',
		'content' => "javascript:(function(){var QMB = window.__QM && __QM.Bookmarklet; if (QMB) { QMB.invoke(); } else { window.__QM = {baseUrl: $baseUrlJson}; document.body.appendChild(document.createElement('script')).src='$baseUrl/js/bookmarklet.js';}})();"
	));
	
// 	echo Q::tool("Q/bookmarklet", array(
// 		'title' => 'Add to HMH Portfolio',
// 		'usage' => 'discover and manage bookmarklets on the mobile web',
// 		'content' => <<<EOT
// javascript:
// 		debugger;
// 			var request = new XMLHttpRequest();
// 			request.onreadystatechange = function () {
// 			    if (request.readyState==4) {
// 					Q.alert("You've successfully added this to your Houghton Mifflin Harcourt Portfolio!", {
// 						title: "Hey, Anna."
// 					});
// 				}
// 			};
// 			request.open("POST", "http://sandbox.graph.hmhco.com/v4/documents", true);
// 			request.setRequestHeader("Vnd-HMH-Api-Key", "18f0f0df75275d71cec173718de25d23");
// 			request.setRequestHeader("Authorization", "SIF_HMACSHA256 ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVFEyTWpjd01EVXdPU3dpYzNWaUlqb2lZMjVjZFRBd00yUmxiVzFoSUcxdmNtZGhiaXgxYVdSY2RUQXdNMlJsYlcxaFgyMXZjbWRoYmw5emRIVmtaVzUwWDJJMllURXlOVE0wTFdNek5UZ3RORGcwTUMxaU9XWTBMVFpoTkdVeVpEQmxNbUkyTUM1b2JXaGpieTVqYjIwc2RXNXBjWFZsU1dSbGJuUnBabWxsY2x4MU1EQXpaR1ZpWkdObE5tWmhMVEl6T0dFdE5HRTJPUzFoWlRKaExUTmlOelptTWpnMU1UZGlOU3hrWTF4MU1EQXpaRGMwTnpjaUxDSm9kSFJ3T2k4dmQzZDNMbWx0YzJkc2IySmhiQzV2Y21jdmFXMXpjSFZ5YkM5c2FYTXZkakV2ZG05allXSXZjR1Z5YzI5dUlqcGJJa3hsWVhKdVpYSWlYU3dpWTJ4cFpXNTBYMmxrSWpvaVlqWmhNVEkxTXpRdFl6TTFPQzAwT0RRd0xXSTVaalF0Tm1FMFpUSmtNR1V5WWpZd0xtaHRhR052TG1OdmJTSXNJbVY0Y0NJNk1UUTJNamM0Tmprd09YMC5CdU5MMUNQNVJ4MEFaVjV5aWU0NW5xaFM5NW1qRE5JcGJ2NnVLOWpSajEwOnMyZjhGSTlSTkFTQlhXdWpYYk84Unh2Z2ZUSDdSTlRGcitrTjc2ZEhuZG89Cg==");
// 			request.setRequestHeader("Accept","text/plain");
// 			request.send("document='{\"url\": " + location.href + "}'");
// EOT
// 	));
	?>
</div>
	
</div>