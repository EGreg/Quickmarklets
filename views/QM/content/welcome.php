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
// 		'title' => 'Translate to Spanish',
// 		'usage' => 'discover and manage bookmarklets on the mobile web',
// 		'content' => <<<EOT
// javascript:
// 		var text = '';
// 	    if (window.getSelection) {
// 	        text = window.getSelection().toString();
// 	    } else if (document.selection && document.selection.type != "Control") {
// 	        text = document.selection.createRange().text;
// 	    }
// 		Q.req('QM/translate', 'watson', function (err, result) {
// 		var fem = Q.firstErrorMessage(err, result && result.errors);
// 		alert(fem ? fem : result.slots.watson)
// 		}, {
// 		  fields: { text: text || $('body').text().substr(0, 1000) }
// 		});
// EOT
// 	));
	?>
</div>
	
</div>