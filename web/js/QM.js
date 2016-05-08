if (!window.Q) { // You can remove this part after you've run install.php
	document.getElementsByTagName('body')[0].innerHTML = "<h1>Please run QM/scripts/Q/install.php --all</h1>";
	throw "Q is not defined";
}

var QM = (function (Q, $) {
	
	// Here is some example code to get you started
	
	var QM = {
		userContextual: function (item) {
			var action = $(item).attr('data-action');
			if (QM.actions[action]) {
				Q.handle(QM.actions[action], QM, [item]);
			}
		},
		actions: {
			logout: Q.Users.logout,
			setIdentifier: Q.Users.setIdentifier
		}
	};
	
	Q.page('', function () {
		
		$('.QM_login').on(Q.Pointer.click, function () {
			Q.Users.login();
			return false;
		});
		
		$('.QM_login_iframe').on(Q.Pointer.click, function () {
			Q.Users.login({successUrl: Q.url('iframe')});
			return false;
		});
		
		Q.addScript("plugins/Q/js/QTools.js", function () {
			var avatar = $('#dashboard .Users_avatar_tool');
			if (avatar.length) {
				Q.Contextual.add(avatar, $('#dashboard_user_contextual'));	
			}
		});
		
		// For hiding notices and errors that may be displayed
		$('#notices li').on(Q.Pointer.fastclick, function () {
			var $this = $(this), key;
			$this.css('min-height', 0)
			.slideUp(300, function () {
				$(this).remove();
				if (!$('#notices li').length) {
					$('#notices_slot').empty();
				}
				Q.layout();
			});
			if (key = encodeURIComponent($this.attr('data-key'))) {
				Q.req('Q/notice', 'data', null, { 
					method: 'delete', 
					fields: {key: key} 
				});
			}
		}).css('cursor', 'pointer');
		
	});
	
	Q.page("QM/welcome", function () {
		// when loading
		return function () {
			// unloading;
		};
	});
	
	Q.page("QM/iframe", function () {
	    window.addEventListener("message", function (e) {
			var parts = e.data.split("\t");
			var title = parts[1];
			var href = parts[2];
			Q.Streams.create({
				'type': 'QM/bookmarklet',
				'title': title,
				'content': decodeURIComponent(href),
				'icon': Q.url('img/icon')
			}, function () {
				Q.Tool.byId('Streams_related').refresh();
			}, {
				publisherId: Q.Users.loggedInUserId(),
				streamName: 'QM/bookmarklets',
				type: 'bookmarklets'
			});
		}, false);
		$('body').on('click', '.QM_bookmarklet_preview_tool', function () {
			var stream = this.Q.tool.preview.stream;
			var msg = "eval\t" + stream.fields.content;
			window.top.postMessage(msg, '*');
		});
	});
	
	// example stream
	Q.Streams.define("QM/cool", "js/streams/QM/cool.js");
	
	// example tool
	Q.Tool.define("QM/cool", "js/tools/QM/cool.js");

	// tell Q.handle to load pages using AJAX
	Q.handle.options.loadUsingAjax = true;
	
	// make the app feel more native on touch devices
	Q.Pointer.preventRubberBand({
		direction: 'vertical'
	});
	Q.Pointer.startBlurringOnTouch();
	
	return QM;
	
})(Q, jQuery);