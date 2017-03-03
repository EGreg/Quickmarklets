<div id='content'>

<div class="QM_bookmarklet_container">
	<?php
	$baseUrl = Q_Request::baseUrl();
	$baseUrlJson = json_encode($baseUrl);
	echo Q::tool("Q/bookmarklet", array(
		'title' => 'Quickmarklets',
		'usage' => 'discover and manage bookmarklets on the mobile web',
		'scripts' => array(
			'https://code.jquery.com/jquery-1.11.3.min.js', 
			'plugins/Q/js/Q.js',
			'js/bookmarklet.js'
		),
		'skip' => array(
			'jQuery',
			'Q',
			'__QM'
		),
		'code' => "__QM.invoke(baseUrl);"
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