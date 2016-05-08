(function (w, undefined) {
	
	if (!w.__QM) {
		return alert("__QM should have been defined");
	}
	var QM = w.__QM;
	var QMB = QM.Bookmarklet = function () {};
	QMB.invoke = function () {

		var urlQ = QM.baseUrl + "/plugins/Q/js/Q.js";
		var urlJ = "https://code.jquery.com/jquery-1.11.3.min.js";
		
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
			var found = {};
			$('a').each(function () {
				var $this = $(this);
				var href = $this.attr('href');
				if (!href) {
					return;
				}
				if (href.substr(0, 11) === 'javascript:') {
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
				found: found
			};
			Q.Template.render('QM/dialog', fields, function (err, html) {
				Q.Dialogs.push({
					title: 'Quickmarklets',
					content: html,
					onActivate: function () {
						$('.QM_dialog .QM_button_new').click(function () {
							$('.QM_found_links').slideDown();
						});
						$('.QM_dialog .QM_button_add').click(function () {
							// TODO: add the actual thing
						});
					}
				});
			});
		}

	};
	
	prepare();
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
			+ '{{#if found}}'
				+ '<button class="Q_button QM_button_new Q_tool Q_clickable_tool">+ Add New Bookmarklet</button>'
				+ '<ul class="QM_found_links">'
					+ '{{#each found}}'
					+ '<li><button class="Q_button QM_button_add Q_tool Q_clickable_tool" data-code="{{@key}}">{{this.title}}</button></li>'
					+ '{{/each}}'
				+ '</ul>'
			+ '{{/if}}'
			+ '</div>'
		);
	}
	
	// TODO: make a template
	// have a list of bookmarklets found in page
	// load list of bookmarklets for this user from localstorage or user
	// add bookmarklets of type to look up selected text or share something
	// add bookmarklets for sponsors and that's it
	
})(window);