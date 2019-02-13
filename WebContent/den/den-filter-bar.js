function filterChanged() {
	$('.extension-box').show();
	if (!location.hash) {
		$('#den-filter-bar a').removeClass('selected');
		return;
	}

	var parameters = location.hash.substring(1).split('&').filter(function(p) {
		return p;
	}).map(function(p) {
		return p.split('=').map(function(v) {
			return decodeURIComponent(v);
		});
	});

	if (!parameters.length) {
		$('#den-filter-bar a').removeClass('selected');
		return;
	}

	$('#den-filter-bar a').each(function() {
		var $this = $(this);

		$this.removeClass('selected');

		parameters.forEach(function(p) {
			if ($this.attr('href') === '#' + p[0] + '=' + p[1]) {
				$this.addClass('selected');
			}
		});
	});

	$('.extension-box').each(function() {
		var $this = $(this);

		parameters.forEach(function(p) {
			var data = $this.attr('data-' + p[0]);

			if (p[0] === 'tags') {
				data = data.split(',');
				if (data.indexOf(p[1]) === -1) {
					$this.hide();
				}
            } else if (p[0] === 'product') {
                if (data !== p[1] && data !== 'inedox') {
                    $this.hide();
                }
            } else {
				if (data !== p[1]) {
					$this.hide();
				}
			}
		});
	});
}

$(filterChanged);
$(window).on('hashchange, popstate', filterChanged);

$('#den-filter-bar').on('click', 'a', function(e) {
	e.preventDefault();
	var $this = $(this);
	var key = $this.attr('href').substring(1).split('=')[0];

	if (!$this.is('.selected') && key !== 'tags') {
		$('#den-filter-bar a[href^="#' + key + '"]').removeClass('selected');
	}
	$this.toggleClass('selected');

	var query = '';

	$('#den-filter-bar a.selected').each(function() {
		if (query) {
			query += '&';
		} else {
			query += '#';
		}
		query += $(this).attr('href').substring(1);
	});

	history.pushState({}, '', location.pathname + query);

	filterChanged();
});
