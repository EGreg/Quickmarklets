var http = require('http');
require('../Q.inc')(function(Q) {
	
	Q.plugins.Users.listen();
	Q.plugins.Streams.listen();
	
	// TODO: Make some classes in classes/QM and then require() them
	
});