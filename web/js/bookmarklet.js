(function (w, undefined) {
	
	w.__QM = {};
	var QM = w.__QM;
	QM.invoke = function (baseUrl) {
		
		if (!Q.info.baseUrl) { 
			Q.info.baseUrl = baseUrl;
		}
		Q.init();
		var parsed = baseUrl.parseUrl();
		var baseDomain = parsed.scheme + '://' + parsed.host;
		var title = 'Quickmarklets';
		QM.baseUrl = baseUrl;
		Q.setObject({
			"Q.info.baseUrl": baseUrl
		});
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
			Q.addStylesheet(baseUrl + '/css/bookmarklet.css');
			Q.Dialogs.pop();
			Q.Dialogs.push({
				title: title,
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
							var parts = e.data.split("\t");
							switch (parts[0]) {
							case 'code':
								break;
							case 'clickjack':
								if (parts[1] === 'show') {
									$clickjack.show();
								} else {
									$clickjack.hide();
								}
								break;
							}
						});
						QM.addedMessageListener = true;
					}
				}
			});
		});

	};
	
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