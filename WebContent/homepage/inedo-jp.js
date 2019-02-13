$(document).ready(function() {
	var createCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	var readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	var checkLanguages = function(languages) {
		var any = false;
		for (var i = 0; i < languages.length; i++) {
			if (/^ja$|^ja-|-JP$/i.test(languages[i])) {
				any = true;
				break;
			}
		}

		if (!any) {
			return;
		}

		if (languages[0].toLowerCase() === 'ja' && location.pathname === '/' && !readCookie('jp-redirected')) {
			createCookie('jp-redirected', 'Y', null);
			location = '/jp';
			return;
		}

		if (readCookie('jp-banner-hide')) {
			return;
		}

		$('.modal').addClass('active');
		$('.close-modal').click(function() {
			$('.modal').removeClass('active');
			createCookie('jp-banner-hide', 'Y', null);
		});
	};

	if (location.search) {
		var args = location.search.substring(1).split('&');
		for (var i = 0; i < args.length; i++) {
			if (/^overrideLanguages=/.test(args[i])) {
				checkLanguages(args[i].substring('overrideLanguages='.length).split(','));
				return;
			}
		}
	}
	checkLanguages(navigator.languages || [navigator.language || navigator.userLanguage]);
});
