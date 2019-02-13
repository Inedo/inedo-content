$(function () {

    function dosearch() {
        var tags = [];
        $('.tags a.selected').each(function () {
            tags.push($(this).text());
        });

        var baseUrl = window.location.href;

        if (window.location.search) {
            baseUrl = baseUrl.substring(0, baseUrl.indexOf('?'))
        }

        var newUrl = baseUrl;
        if (tags && tags.length)
            newUrl += '?' + encodeURI(tags.join(','));

        if (window.history.replaceState)
            window.history.replaceState({}, document.title, newUrl);
        else
            window.location.href = newUrl;

        if (tags && tags.length) {
            $('.tutorials-container a').each(function (_idx) {
                $(this).hide();

                if (!$(this).data('tags')) {
                    console.warn('Tutorial #' + _idx + ' does not have any tags');
                    return;
                }

                var tutTags = $(this).data('tags');

                for (var i = 0; i < tags.length; i++) {
                    var inclused = false;
                    for (var j = 0; j < tutTags.length; j++) {
                        if (tags[i] != tutTags[j])
                            continue;
                        inclused = true;
                        break;
                    }
                    if (!inclused)
                        return;
                }
                $(this).show();
            });
        } else {
            $('.tutorials-container a').show();
        }
    }

    if (window.location.search) {
        var tags = window.location.search.substr(1).split(',');
        $('.tags a').each(function () {
            for (var i = 0; i < tags.length; i++) {
                if (tags[i] == $(this).text())
                    $(this).addClass('selected');
            }
        });
    }

    $('.tags a').click(function () {
        var $el = $(this);
        $el.toggleClass('selected');
        dosearch();
        return false;
    });

    $.ajax({
        method: 'POST',
        url: '/support/tutorials/_tags'
    }).done(function (serverTags) {

        $('.tutorials-container a').each(function (_idx) {
            var tags = serverTags[$(this).attr('href')] || [];
            $(this).data('tags', tags);
            if (!tags.length) {
                console.warn('Tutorial ' + $(this).attr('href') + ' does not have any server tags');
                return;
            }
            
        });

        dosearch();        
    });

});