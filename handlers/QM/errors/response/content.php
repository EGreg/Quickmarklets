<?php

function QM_errors_response_content($params)
{
	header('HTTP/1.0 503 Server Encountered Error');
	$url = Q_Request::url();
	return Q::view('QM/content/errors.php', compact('url'));
}
