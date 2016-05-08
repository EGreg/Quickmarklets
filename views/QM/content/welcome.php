<div id='content'>

<div class="QM_bookmarklet_container">
	<?php
	$baseUrl = Q_Request::baseUrl();
	$baseUrlJson = json_encode($baseUrl);
	echo Q::tool("Q/bookmarklet", array(
		'title' => 'Quickmarklets',
		'usage' => 'discover and manage bookmarklets on the mobile web',
		'content' => "javascript:(function(){var QMB = window.__QM && __QM.Bookmarklet; if (QMB) { QMB.invoke(); } else { window.__QM = {baseUrl: $baseUrlJson}; document.body.appendChild(document.createElement('script')).src='$baseUrl/js/bookmarklet.js';}})();"
	))
	?>
</div>
	
</div>