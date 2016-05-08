(function (w, undefined) {
	
	if (!w.__QM) {
		return alert("__QM should have been defined");
	}
	var QM = w.__QM;
	var QMB = QM.Bookmarklet = function () {};
	QMB.invoke = function () {

		var urlQ = QM.baseUrl + "/plugins/Q/js/Q.js";
		var urlJ = "https://code.jquery.com/jquery-1.11.3.min.js";
		var baseDomain = QM.baseUrl.split('/').slice(0, 3).join('/');
		
		if (!w.jQuery || !jQuery.fn || jQuery.fn.jquery < 1.6) {
			loadScript(urlJ, _J);
		} else {
			_J();
		}
		
		function _J() {
			if (!w.Q || !w.Q.setObject) {
				loadScript(urlQ, _Q);
			} else {
				_Q();
			}
		}
		
		function _Q() {
			Q.setObject({
				"Q.info.baseUrl": QM.baseUrl
			});
			var title = 'Quickmarklets';
			prepare();
			var found = {};
			$('a').each(function () {
				var $this = $(this);
				var href = $this.attr('href');
				if (!href) {
					return;
				}
				if (href.substr(0, 11) === 'javascript:'
				&& href.length >= 40) {
					found[href] = {
						title: $this.text()
					};
				}
			});
			
			// Q.each(links, function (href) {
			// 	// found some bookmarklets
			// 	var $this = $(this);
			// 	var $a = $('<a />', {href: href});
			// 	$a.html($this.text())
			// 	.click(function () {
			// 		alert($(this).attr('href'));
			// 		return false;
			// 	}).appendTo($content);
			// });
			
			var fields = {
				baseUrl: QM.baseUrl,
				found: found,
				notEmpty: !Q.isEmpty(found)
			};
			Q.Template.render('QM/dialog', fields, function (err, html) {
				if (err) {
					return alert(Q.firstErrorMessage(err));
				}
				Q.addStylesheet('css/bookmarklet.css');
				Q.Dialogs.pop();
				Q.Dialogs.push({
					title: 'Quickmarklets',
					content: html,
					onActivate: function () {
						var $iframe = $('iframe', this);
						var $clickjack = $('.QM_clickjack', this);
						var $new = $('.QM_button_new', this).click(function () {
							$('.QM_found_links').slideDown(300, function () {
								var position = $iframe.position();
								$clickjack.css({
									left: position.left + 'px',
									top: position.top + 'px',
									width: $iframe.outerWidth() + 'px',
									height: $iframe.outerHeight() + 'px'
								});
							});
						});
						var $add = $('.QM_button_add', this).click(function () {
							var $this = $(this);
							var args = [
								"add", 
								$this.text(), 
								$this.attr('data-code')
							];
							var msg = args.join("\t");
							$iframe[0].contentWindow.postMessage(msg, baseDomain);
						});
						var position = $iframe.position();
						$clickjack.css({
							left: position.left + 'px',
							top: position.top + 'px',
							width: $iframe.outerWidth() + 'px',
							height: $iframe.outerHeight() + 'px'
						}).on('click', function () {
							if (QM.code) {
								Q.Dialogs.pop();
								eval(QM.code);
								QM.code = null;
							}
						}).on(Q.Pointer.start, function (e) {
							var offset = $iframe.offset();
							var x = Q.Pointer.getX(e) - offset.left;
							var y = Q.Pointer.getY(e) - offset.top;
							var args = ["start", x, y];
							var msg = args.join("\t");
							$iframe[0].contentWindow.postMessage(msg, baseDomain);
						});
						if (!QM.addedMessageListener) {
							window.addEventListener("message", function (e) {
								if (e.origin !== baseDomain) {
									return;
								}
								// TODO: make sure that baseDomain starts with https!!!
								var parts = e.data.split("\t");
								if (parts[0] === 'code') {
									QM.code = parts.slice(1).join("\t");
								}
							});
							QM.addedMessageListener = true;
						}
					}
				});
			});
		}

	};
	
	QMB.invoke(); // when loading this script

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
	
	function prepare() {
		Q.Template.set('QM/dialog', 
			'<div class="QM_dialog">'
			+ '{{#if notEmpty}}'
				+ '<button class="Q_button QM_button_new Q_tool Q_clickable_tool">+ Add New Bookmarklet</button>'
				+ '<ul class="QM_found_links">'
					+ '{{#each found}}'
					+ '<li><button class="Q_button QM_button_add Q_tool Q_clickable_tool" data-code="{{@key}}">{{this.title}}</button></li>'
					+ '{{/each}}'
				+ '</ul>'
			+ '{{/if}}'
			+ '<iframe src="{{baseUrl}}/iframe"></iframe>'
			+ '<div class="QM_clickjack"></div>'
			+ '</div>'
		);
	}
	
	// TODO: make a template
	// have a list of bookmarklets found in page
	// load list of bookmarklets for this user from localstorage or user
	// add bookmarklets of type to look up selected text or share something
	// add bookmarklets for sponsors and that's it
	
})(window);