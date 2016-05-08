<?php
	
function QM_iframe_response_content()
{
	Q_Response::layoutView('QM/layout/iframe.php');
	$user = Users::loggedInUser();
	if (!$user) {
		return "<button class='QM_login'>Log in or create an account</button>";
	}
	$userId = $user->id;
	return Q::view('QM/content/iframe.php', compact('userId'));
}