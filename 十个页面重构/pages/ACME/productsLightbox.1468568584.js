$(document).ready(function () {
    $('#product-pri-image').on('click', function (e) {
        e.preventDefault();
        var links = $('.product-gallery ul.slider-list').find('a').first();
        var options = {index: links, event: e};
        blueimp.Gallery(links, options);

    });
    $(".product-gallery").on('click', 'li.slider-item a', function (e) {
        e.preventDefault();

        var target = e.target || e.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: e};


        var links = $(this).closest('ul.slider-list').find('a');
        links = links.slice(1, links.length);
        blueimp.Gallery(links, options);
    });
    $(".gobos-list").on('click', 'li.gobo-item a', function (e) {
        e.preventDefault();

        var target = e.target || e.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: e};


        var links = $(this).closest('ul.gobos-list').find('a');
        blueimp.Gallery(links, options);
    });

    $(".multimedia-slider-container").on('click', '#images-slides li.multimedia-content a', function (e) {
        e.preventDefault();

        var target = e.target || e.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: e};


        var links = $(this).closest('ul').find('a');
        blueimp.Gallery(links, options);
    });
});