<?php

function QM_before_Q_responseExtras()
{
	$app = Q_Config::expect('Q', 'app');	
	
	Q_Response::addStylesheet('plugins/Q/css/Q.css');
	Q_Response::addStylesheet('css/html.css', '@end');

	if (Q_Config::get('Q', 'firebug', false)) {
		Q_Response::addScript("https://getfirebug.com/firebug-lite-debug.js");
	}
	Q_Response::addScript('js/QM.js');
	
	header('Vary: User-Agent');
	
	// running an event for loading action-specific extras (if there are any)
	$uri = Q_Dispatcher::uri();
	$module = $uri->module;
	$action = $uri->action;
	$event = "$module/$action/response/responseExtras";
	if (Q::canHandle($event)) {
		Q::event($event);
	}
}
