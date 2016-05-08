<?php
	
function QM_iframe_response_content()
{
	Q_Response::layoutView('QM/layout/iframe.php');
	$userId = Users::loggedInUser(true)->id;
	return Q::view('QM/content/iframe.php', compact('userId'));
}