(function (window, Q, undefined) {

/**
 * @module QM
 */
	
/**
 * YUIDoc description goes here
 * @class QM cool
 * @constructor
 * @param {Object} [options] Override various options for this stream
 *  @param {Q.Event} [options.onMove] Event that fires after a move
 */

Q.Streams.define("QM/cool", function () { // stream constructor
	this.onMove = new Q.Event(); // an event that the stream might trigger
}, {
	someMethod: function () {
		// a method of the stream
	}
});

// this is how you set an event handler to be triggered whenever
// any "QM/move" message is posted to any "QM/cool" stream
Q.Streams.onMessage("QM/cool", "QM/move").set(function (err, message) {
	// trigger our event
	this.onMove.handle(JSON.parse(message.instructions));
}, "QM");

})(window, Q);