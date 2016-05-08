<?php

function Q_response_dashboard()
{	
	$app = Q_Config::expect('Q', 'app');
	$slogan = "One bookmarklet to rule them all.";
	$user = Users::loggedInUser();
	return Q::view("$app/dashboard.php", compact('slogan', 'user'));
}
