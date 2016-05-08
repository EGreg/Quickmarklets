<?php

function QM_after_Users_insertUser($params)
{
	// Create a stream for the user's bookmarklets
	$user = $params['user'];
	$stream = Streams::create($user->id, $user->id, 'Streams/category', array(
		'name' => 'QM/bookmarklets'
	));
	$stream->join(array('userId' => $user->id));
}