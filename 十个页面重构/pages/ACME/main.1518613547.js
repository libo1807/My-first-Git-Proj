var map;
var contactMarkers = [
    {'id': 0, 'city': 'Valašské meziříčí', 'lat': 49.448191, 'long': 18.170972, 'zoom': 14},
    {'id': 1, 'city': 'Dubai', 'lat': 24.998329, 'long': 55.171955, 'zoom': 14},
    {'id': 2, 'city': 'Valašské meziříčí', 'lat': 49.4674425, 'long': 17.9611243, 'zoom': 14},
    {'id': 3, 'city': 'Singapore', 'lat': 1.342925, 'long': 103.885858, 'zoom': 14},
    {'id': 4, 'city': 'Moscow', 'lat': 55.740027, 'long': 37.663107, 'zoom': 14},
    {'id': 5, 'city': 'Ismaning', 'lat': 48.236519, 'long': 11.680589, 'zoom': 14},
    {'id': 6, 'city': 'Paris', 'lat': 48.977500, 'long': 2.495691, 'zoom': 14},
    {'id': 7, 'city': 'Northampton', 'lat': 52.266444, 'long': -0.864382, 'zoom': 14},
    {'id': 8, 'city': 'Florida', 'lat': 26.052392, 'long': -80.311793, 'zoom': 14},
    {'id': 9, 'city': 'Montevideo', 'lat': -34.899989, 'long': -56.190816, 'zoom': 14}
];

//Set offset
var topMenuOffset;
setTopMenuOffset();

function robeNewsSlider() {
	if ($('#viewport-width').size() < 1) {
		var viewportWidthElem = document.createElement('div');
		$(viewportWidthElem).attr('id', 'viewport-width');
		$('body').append(viewportWidthElem);
	}

	$('.news-slider-container .news-list').owlCarousel({
		items: 4,
		navigation: false,
		itemsDesktop : [1800,4],
		itemsDesktopSmall: [1250,3],
		itemsTablet: [950,2],
		itemsMobile: [650,1],
		responsiveBaseWidth: '#viewport-width',
		pagination: true
	});
};


// disable jquery-mobile loading
$.mobile.autoInitializePage = false;
$(document).foundation();

$(document).ready(function () {

    // ALL LAYOUTS INIT  BEGIN //

$.mobile.autoInitializePage = false;

    $(".select2.small").select2({
        theme: "short",
        minimumResultsForSearch: -1

    });
    $(".select2.medium").select2({
        theme: "medium",
        minimumResultsForSearch: -1

    });
    $(".select2.lang").select2({
        theme: "lang",
        minimumResultsForSearch: -1
    }).on('change', function () {
        var $this = $(this);

        var uri = $this.val();
        window.location = uri;
    });


    mainmenu = new MainMenu($("#top-menu"));
    headerSlider = new HeaderSlider($(".header-slider-container"), true);

    Elevator();
    SocialListToggle();
    specificationCollpase();
    animateTo();
    FullscreenHeader();
    LikeButtons();
    MobileContentToggle();

    // SUPPORT FILTER


    if ($('.youtube-content a').length) {
        $('.youtube-content').on('click', "a", function (e) {
            e.preventDefault();
            var irame = $('<iframe  width="1280" height="720" frameborder="0"></iframe>');
            irame.attr('src', $(this).data('iframe'));
            $("#videoModal .flex-video").empty().append(irame);
            var modal = $('#videoModal').foundation('reveal', 'open');

            $('#videoModal .close-reveal-modal').click(function (e) {
                e.preventDefault();
                $("#videoModal .flex-video").empty();
            });

            $('.reveal-modal-bg').click(function (e) {
                e.preventDefault();
                $("#videoModal .flex-video").empty();
            });
        });
    }


    $(document).on('click', '.like-buttons a.btn', function (e) {
        e.preventDefault();
        var $iframeSrc = $(this).data('url');
        // $('#iframe-share-modal iframe').attr('src', $iframeSrc);
        // var modal = $('#iframe-share-modal').foundation('reveal', 'open');
        window.open($iframeSrc, "", "width=600,height=480");
        $(".like-container ").removeClass("active");
    });


    $(document).on('click', '#desktopversion', function (e) {
    //$('#desktopversion').click(function() {
        e.preventDefault();
        var toggle = $(this).data('toggle');
        //alert(document.cookie);

        if (toggle == 0) {
            document.cookie = "desktop=1";
            $('meta[name="viewport"]').attr('content', 'width=1200');
            $(this).data('toggle', 1);
        } else {
            document.cookie="desktop=0";
            $('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
            $(this).data('toggle', 0);
        }

        var text = $(this).data('alttext');
        var alttext = $(this).text();
        $(this).text(text);
        $(this).data('alttext', alttext);
        return false;
    });


    $(window).on("resize", function () {
        FullscreenHeader();
        setTopMenuOffset();
    });

    if ($('.data-list tr').length) {
        $('.data-list tr').each(fileRowSize);
    }

    if (window.location.hash != '') {
        var $target = (window.location.hash);
        AnchorScrollTo($target);
    }

    if ($('.image-click')) {
        $('.image-click img').on('click', function (e) {
            e.preventDefault();
            var parent = $(this).closest('li');
            var href = parent.find('a').attr('href');
            window.location.href = href;
        });
    }

    $(document).on('open.fndtn.reveal', '#forgot-password-modal', function () {
        var modal = $(this);
        $.ajax({
            url: '?tx_felogin_pi1[forgot]=1&type=15551',
            success: function (data) {

                modal.html(data);
            },
            error: function (xhr, status) {
                console.log(status);
            }
        });
    });

    $(document).on('submit', '#forgotpass', function (e) {
        e.preventDefault();
        var modal = $("#forgot-password-modal")
        $.ajax({
            url: $(this).attr('action'),
            method: 'post',
            data: $(this).serialize(),
            success: function (data) {
                modal.html(data);
            },
            error: function (xhr, status) {
                console.log(status);
            }
        })
        ;
    });

});

/**
 * test
 */
function fileRowSize() {
    var ulHeight = $(this).find('ul').height();
    //console.log(ulHeight);
    var descri = $(this).find('td.desc');
    if (descri.height() > ulHeight) {
        var wrap = descri.find('div.desc-wrap');
        wrap.height(ulHeight)

        var btn = $(this).find('a.desc-toggle');
        $(btn).removeClass('hidden');
        btn.click(function (e) {
            $(this).toggleClass('active');
            e.preventDefault();
            if (wrap.height() == ulHeight) {
                wrap.height('auto');
            } else {
                wrap.height(ulHeight);
            }

        });
    }
}


function setTopMenuOffset() {
    if (CheckIfMobile()) {
        topMenuOffset = $("#top-menu").outerHeight();
    } else if (CheckIfTablet()) {
        topMenuOffset = $("#top-menu").outerHeight() + $("#anchors-menu").outerHeight();
    } else {
        topMenuOffset = $("#anchors-menu").outerHeight();
    }
}

function AnchorScrollTo(target) {
    if (target != undefined) {
        $("html, body").animate({scrollTop: $(target).offset().top - topMenuOffset}, 1000);
    }
}

function animateTo() {
    $(".animate-to").on("click", function () {
    	AnchorScrollTo($(this).attr("href"));
    });
}


function MobileContentToggle() {


    if (CheckIfMobile()) {


        $(".mobile-toggle").on("click", function () {

            var target = $(this).parent();
            sectionId = target.attr("id");

            if (window.location.hash != "#" + sectionId) {
                window.location.hash = sectionId;
            } else {
                target.find(".mobile-content").slideToggle();
                $(this).toggleClass("expanded");
            }

        });

        $(window).on('hashchange', function (e) {

            var targetIdName = window.location.hash;
            var target = $(window.location.hash);

            target.find(".mobile-content").slideDown();
            $(this).addClass("expanded");
            AnchorScrollTo(targetIdName);
        });

        if (window.location.hash) {
            var targetIdName = window.location.hash;
            var target = $(window.location.hash);

            target.find(".mobile-content").slideDown();
            $(this).addClass("expanded");
            AnchorScrollTo(targetIdName);
        }
    }

}


function LikeButtons() {
    $(document).on("click", ".like-container button.btn", function (e) {
        e.preventDefault();
        $(".like-container").removeClass("active");
        $(this).parent().toggleClass("active");
    });

    $(document).on("click", ".like-buttons .icon-share", function (e) {
        e.preventDefault();
        $(".like-container").removeClass("active");
    });
}

function AnchorsStickyMenu() {

    if ($(".anchors-menu-wrapper").length != 0) {

        var productMenu = $(".anchors-menu-wrapper");
        var topOffset = productMenu.offset().top;

        $(window).scroll(function (event) {

            var scroll = $(window).scrollTop();

            if (scroll > topOffset) {
                productMenu.addClass("fixed");
            } else {
                productMenu.removeClass("fixed");
            }


        });

    }
}

function Timeline(container) {
    this.container = container;

    this.actualSlide = 0;
    this.totalItems;
    this.dataList;

    this.itemWidth;
    this.totalWidth;
    this.wrapperWidth;
    this.defaltLeftPos;

    this.leftBtn;
    this.rightBtn;

    this.Init();
}

Timeline.prototype = {
    constructor: Timeline,
    Init: function () {
        var self = this;
        this.totalItems = $(this.container).find(".date-item").length;

        setTimeout(function () {
            self.SetTimelineWidth();
            self.CenterDates();
            self.AddEvents();
            self.CheckNavigation();
        }, 100);

    },
    AddEvents: function () {
        var self = this;
        this.leftBtn = $(this.container).find(".btn-left");
        this.rightBtn = $(this.container).find(".btn-right");
        var dateLink = $(this.container).find(".date-item a");

        this.leftBtn.on("click", function () {
            self.MoveToLeft();

        });

        this.rightBtn.on("click", function () {
            self.MoveToRight();

        });

        dateLink.on("click", function (e) {
            e.preventDefault();
            var target = $(this).parent().index();
            self.moveToTarget(target);
        })

        $(window).on("resize", function () {
            self.SetTimelineWidth();
            self.CenterDates();
        });

    },
    CenterDates: function () {

        var centerPosition = (this.wrapperWidth / 2) - (this.itemWidth / 2);
        this.dataList.css("left", centerPosition);
        this.defaltLeftPos = centerPosition;
    },
    SetTimelineWidth: function () {
        this.wrapperWidth = $(this.container).find(".dates-wrapper").outerWidth();
        this.itemWidth = $(this.container).find(".date-item").outerWidth();

        this.totalWidth = (this.totalItems * this.itemWidth) + this.totalItems;
        this.dataList = $(this.container).find(".dates-list");
        $(this.dataList).css("width", this.totalWidth);
    },
    MoveToRight: function () {
        var self = this;
        this.actualSlide++;

        if (this.actualSlide == this.totalItems) {
            this.actualSlide = this.totalItems - 1;
        } else {
            this.ShowContent();
        }


        var pos = this.defaltLeftPos - (this.actualSlide * this.itemWidth);
        this.dataList.css("left", pos);
        this.CheckNavigation();
    },
    MoveToLeft: function () {
        var self = this;
        this.actualSlide--;

        if (this.actualSlide < 0) {
            this.actualSlide = 0;
        } else {
            this.ShowContent();
        }

        var pos = this.defaltLeftPos - (this.actualSlide * this.itemWidth);
        this.dataList.css("left", pos);
        this.CheckNavigation();

    },
    moveToTarget: function (target) {

        if (this.actualSlide != target) {
            this.actualSlide = target;

            var pos = this.defaltLeftPos - (this.actualSlide * this.itemWidth);
            this.dataList.css("left", pos);
            this.CheckNavigation();
            this.ShowContent();
        }

    },
    CheckNavigation: function () {
        if (this.actualSlide == 0) {
            $(this.leftBtn).addClass("passive");
        } else {
            $(this.leftBtn).removeClass("passive");
        }

        if (this.actualSlide == this.totalItems - 1) {
            $(this.rightBtn).addClass("passive");
        } else {
            $(this.rightBtn).removeClass("passive");
        }
    },
    ShowContent: function () {
        var id = $(this.container).find(".date-item").eq(this.actualSlide).find("a").attr("href");

        $(id).parent().find(".date-content-item.active").removeClass("active").hide(0);
        $(id).fadeToggle(500);
        $(id).addClass("active");
    }
}

function MapInit() {
    var image = '/fileadmin/Default_theme/img/marker.png';
    var mapCanvas = document.getElementById('map');
    var styles = [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#0c0b0b"}]
    }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": -100}, {"lightness": 45}]
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#090909"}]
    }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
    }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#d4e4eb"}, {"visibility": "on"}]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"color": "#fef7f7"}]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9b7f7f"}]
    }, {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"color": "#fef7f7"}]}]

    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    var mapOptions = {
        center: new google.maps.LatLng(49.194841, 16.6079437),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        mapTypeControl: false
    }
    map = new google.maps.Map(mapCanvas, mapOptions)

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    for (var i = 0; i < contactMarkers.length; i++) {
        var contactMarker = contactMarkers[i];

        var marker = new google.maps.Marker({
            position: {lat: contactMarker.lat, lng: contactMarker.long},
            map: map,
            title: contactMarker.city,
            zIndex: contactMarker.zoom,
            icon: image,
        });
    }
}

function MapChange(targetMarkerId) {

    var targetMarker = $.grep(contactMarkers, function (e) {
        return e.id == targetMarkerId
    });

    map.setCenter(new google.maps.LatLng(targetMarker[0].lat, targetMarker[0].long));
    map.setZoom(targetMarker[0].zoom);
}


function ContactsToggle(container) {
    this.cacheActive;
    this.container = container;
    this.cacheActiveIdName = window.location.hash;
    this.Init();
}

ContactsToggle.prototype = {
    constructor: ContactsToggle,
    Init: function () {
        this.AddEvents();
        this.CloseTabForMobile();

    },
    AddEvents: function () {
        var self = this;
        var contactLink = $(this.container).find(".contact-link");
        var scrollTMapLink = $(this.container).find(".scroll-to-map")
        var idName;

        contactLink.on("click", function (e) {
            e.preventDefault();
            var idName = $(this).attr("href");
            self.ShowTab(idName, false);
        });

        scrollTMapLink.on("click", function (e) {
            e.preventDefault();
            self.ScrollToMap();
        });

        if (window.location.hash) {
            setTimeout(function () {
                idName = window.location.hash;
                self.ShowTab(idName, true);
            }, 100);
        }

        $(window).on("hashchange", function (e) {
            e.preventDefault();
            setTimeout(function () {
                idName = window.location.hash;
                self.ShowTab(idName, true);
            }, 100);
        })
    },
    CloseTabForMobile: function () {
        if (CheckIfMobile()) {
            $(".contact-list .contact-item.active").removeClass("active");
        }
    },
    ShowTab: function (idName, isFromHash) {
        //wait for header
        if (!contactSlider.isSliding) {

            var activeTabHeader = $(idName).parent().find('.contact-link');
            var content = $(idName);
            var mapMarkerId = activeTabHeader.data("marker-id");

            //togle tabs condition
            if (!$(idName).parent().hasClass("active")) {
                $(this.container).find(".contact-item.active .contact-content").fadeOut(0);
                $(this.container).find(".contact-item.active").removeClass("active");

                $(idName).parents(".contact-item").addClass("active");
                content.fadeIn();

                if (CheckIfTablet() || CheckIfMobile()) {
                    this.AnimateToTab(idName);
                }
            } else if ($(idName).parent().hasClass("active") && !isFromHash) {
                //content.fadeOut();
                //activeTabHeader.parent().removeClass("active");
            }

            // prevent anchor jump
            if (history.pushState) {
                history.pushState(null, null, idName);
            } else {
                location.hash = idName;
            }

            this.AfterChange(mapMarkerId);
        }
    },
    AnimateToTab: function (target) {
        var headerHeight = $(target).parent().find('.contact-link').outerHeight();
        setTimeout(function () {
            $("html, body").animate({scrollTop: $(target).offset().top - (topMenuOffset + headerHeight)}, 1000);
        }, 100);
    },
    AfterChange: function (targetId) {
        MapChange(targetId);
        contactSlider.targetSlide(targetId);
    },
    ScrollToMap: function () {
        $("html, body").animate({scrollTop: $("#map").offset().top - topMenuOffset}, 1000);
    }
}

function specificationCollpase() {
    $(".specification-category-list h4").on("click", function () {

        $(this).parent().toggleClass("open");
        $(this).parent().find(".specification-list").slideToggle();
    });
}

function Elevator() {
    $(".elevator").on("click", function () {
        $("html, body").animate({scrollTop: "0"});
    });
}


function SocialListToggle() {
    $(document).on("click", ".social-toggle", function () {
        $(this).parent().find(".social-media-list").fadeToggle();
        $(this).toggleClass("active");
    });
}

function FullscreenHeader() {
    var headerContainer = $(".header-container.fullscreen");
    var topmenuHeight = $("#top-menu").outerHeight();
    var windowHeight = $(window).height();
    var headerHeight = windowHeight - topmenuHeight;

    headerContainer.css("height", headerHeight);

    //topmenu fixed  - body padding
    $("body").css("padding-top", topmenuHeight);

    SearchBarToggle();
}

function SearchBarToggle() {
    $('html').on("click", function (e) {

        if (!$(e.target).parents(".search-bar").hasClass("search-bar")) {
            $(".search-bar.active").removeClass("active");
            $(".search-bar input").val('');
        }
    });


    $(".search-bar .main-icons.icon-search").on("click", function (event) {

        if ($(this).parents(".search-bar").hasClass("active")) {

            $(this).parents(".search-bar").removeClass("active");
            $(this).parents(".search-bar").find("input").val('');

        } else {
            $(this).parents(".search-bar").addClass("active");
            $(this).parents(".search-bar").find("input[type=text]").focus();
        }

    });

}

function HeaderSlider(container, autoslide, anchorTarget) {
    this.container = container;
    this.actualSlideIndex = 0;
    this.totalSlides;
    this.totalListWidth = 0;
    this.isSliding = false;
    this.timer;
    this.isAutoslide = (typeof autoslide === 'undefined') ? false : autoslide;
    this.anchorTarget = (typeof anchorTarget === 'undefined') ? false : anchorTarget;

    this.autoSlideTime = 10000;

    this.Init();

}

HeaderSlider.prototype = {
    constructor: HeaderSlider,
    Init: function () {
        this.totalSlides = $(this.container).find(".header-slide").length;
        this.AddEvents();
        this.pointsInit();
    },
    AddEvents: function () {
        var self = this;
        var sliderWrapper = $(this.container);

        sliderWrapper.on("swipeleft", function () {
            if (!self.isSliding)
                self.nextSlide();
        });

        sliderWrapper.on("swiperight", function () {
            if (!self.isSliding)
                self.previousSlide();
        });

        //run autoslide

        if (this.isAutoslide && !self.isSliding) {
            this.autoSlide();
        }
    },
    pointsInit: function () {
        var self = this;
        for (i = 0; i < this.totalSlides; i++) {
            var point = "<li data-slide-target=\"" + i + "\" class=\"slider-point\"></li>";
            $(this.container).find(".slider-points-list").append(point);
        }

        $(".slider-point").on("click", function () {
            var target = $(this).attr("data-slide-target");
            self.targetSlide(target);
        });

        this.setActivePoint();
    },
    setActivePoint: function () {
        var self = this;

        $(this.container).find(".slider-point").each(function (entry) {

            if (self.actualSlideIndex == entry) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

    },
    nextSlide: function () {
        var self = this;
        this.isSliding = true;
        this.actualSlideIndex++;

        if (this.actualSlideIndex == this.totalSlides) {
            this.actualSlideIndex = 0;
        }

        var nextId = this.actualSlideIndex;
        var actualSlide = $(this.container).find('.header-slide.active');
        var nextSlide = $(this.container).find('.header-slide[data-slideid="' + nextId + '"]');


        actualSlide.addClass("swipe-out-left");
        nextSlide.addClass("swipe-in-left");


        setTimeout(function () {
            actualSlide.removeClass("active");
            actualSlide.removeClass("swipe-out-left");
            nextSlide.removeClass("swipe-in-left");
            nextSlide.addClass("active");
            self.isSliding = false;

            // if header change url anchors
            if (self.anchorTarget) {
                self.ChangeAnchor();
            }

        }, 1000)


        this.setActivePoint();
    },
    previousSlide: function () {
        var self = this;
        this.isSliding = true;

        this.actualSlideIndex--;

        if (this.actualSlideIndex < 0) {
            this.actualSlideIndex = this.totalSlides - 1;
        }

        var previousId = this.actualSlideIndex;
        var actualSlide = $(this.container).find('.header-slide.active');
        var prevSlide = $(this.container).find('.header-slide[data-slideid="' + previousId + '"]');

        actualSlide.addClass("swipe-out-right");
        prevSlide.addClass("swipe-in-right");


        setTimeout(function () {
            actualSlide.removeClass("active");
            actualSlide.removeClass("swipe-out-right");
            prevSlide.removeClass("swipe-in-right");
            prevSlide.addClass("active");
            self.isSliding = false;

            // if header change url anchors
            if (self.anchorTarget) {
                self.ChangeAnchor();
            }

        }, 1000)


        this.setActivePoint();
    },
    targetSlide: function (targetId) {
        clearTimeout(this.timer);

        //prevent same slide click
        if (targetId != this.actualSlideIndex) {

            this.isSliding = true;

            var self = this;
            this.actualSlideIndex = targetId;

            var actualSlide = $(this.container).find('.header-slide.active');
            var nextSlide = $(this.container).find('.header-slide[data-slideid="' + targetId + '"]');


            actualSlide.addClass("swipe-out-left");
            nextSlide.addClass("swipe-in-left");

            setTimeout(function () {
                this.isSliding = true;
                actualSlide.removeClass("active");
                actualSlide.removeClass("swipe-out-left");
                nextSlide.removeClass("swipe-in-left");
                nextSlide.addClass("active");
                self.isSliding = false;

                if (self.isAutoslide) {
                    self.autoSlide();
                }

                if (self.anchorTarget) {
                    self.ChangeAnchor();
                }

            }, 1000)

            this.setActivePoint();

            //turn back autoslide

        }
    },
    ChangeAnchor: function () {
        var anchor = "#" + $(this.container).find('.header-slide[data-slideid="' + this.actualSlideIndex + '"]').data("contact");
        contactstoggle.ShowTab(anchor);

    },
    autoSlide: function () {
        var self = this;
        this.timer = setTimeout(function () {
            self.nextSlide();
            self.autoSlide();
        }, this.autoSlideTime);
    }

}


//// ROBE SLIDER /////

function RobeSlider(preferences) {
    this.container = preferences.container;
    this.actualSlide = 1;
    this.totalSlides;
    this.totalListWidth = 0;
    this.wrapperWidth;
    this.itemWidth;

    this.shownItems;
    this.middleLarge = (typeof preferences.middleLarge === 'undefined') ? false : preferences.middleLarge;
    this.isInfiniteSlider = (typeof preferences.infinite === 'undefined') ? false : preferences.infinite;
    this.sliderList;
    this.slideWidth;
    this.isSliding = false;

    this.Init();
}
RobeSlider.prototype = {
    constructor: RobeSlider,
    Init: function () {

        this.getActiveSliderList();
        this.countTotalSlides();
        this.widthInit();

        this.pointsInit();
        this.addEvents();
        this.hideNavigationButtons();

    },
    getActiveSliderList: function () {

        if ($(this.container).find(".slider-list.active").length == 0) {
            this.sliderList = $(this.container).find(".slider-list")[0];
        } else {
            this.sliderList = $(this.container).find(".slider-list.active");
        }
    },
    countTotalSlides: function () {
        this.totalSlides = $(this.sliderList).find(".slider-item").length;
    },
    addEvents: function () {
        var self = this;

        var sliderWrapper = $(this.container).find(".slider-wrapper");
        var slidesCategoryBtn = $(this.container).find(".slides-category");

        sliderWrapper.on("swipeleft", function () {
            self.nextSlide();
        });

        sliderWrapper.on("swiperight", function () {
            self.previousSlide();
        });

        if ($(this.container).find(".slider-navigation").length != 0) {
            this.navigationInit();
        }

        $(window).on("resize", function () {
            self.widthInit();
        });


        slidesCategoryBtn.on("click", function () {
            var targetId = "#" + $(this).data("category");
            self.slidesCategorySwitcher(this, targetId);
        });
    },
    widthInit: function () {
        var self = this;
        this.itemWidth = $(this.container).find('.slider-item').outerWidth(true);
        this.wrapperWidth = $(this.container).find('.slider-wrapper').outerWidth();

        var i = 1;
        var totalWidth = 0;
        var self = this;
        var totalWidth;
        var isShownItemsSet = false;

        $(this.sliderList).find('.slider-item').each(function () {
            var slideWidth = $(this).outerWidth();
            totalWidth += slideWidth;


            if ((self.wrapperWidth <= totalWidth) && !isShownItemsSet) {
                self.shownItems = i;

                isShownItemsSet = true;
            }
            i++
        });
        this.totalListWidth = totalWidth;

        $(this.container).find(".slider-list").css("width", this.totalListWidth);
        this.resizeMiddleInit();
    },
    numOfVisibleSlides: function () {
        var i = 1;
        var totalWidth = 0;
        var self = this;

        $(this.container).find('.slider-list .slider-item').each(function () {
            var slideWidth = $(this).outerWidth();
            totalWidth += slideWidth;

            if (self.wrapperWidth <= totalWidth) {
                return i;
            }
            i++
        });
        return i;
    },
    navigationInit: function () {
        var self = this;

        var leftBtn = $(this.container).find(".slide-to-left");
        var rightBtn = $(this.container).find(".slide-to-right");

        $(leftBtn).on("click", function () {
            if (!self.isSliding) {
                self.previousSlide();
            }
        });

        $(rightBtn).on("click", function () {
            if (!self.isSliding) {
                self.nextSlide();
            }
        });

    },
    hideNavigationButtons: function () {
        var rightBtn = $(this.container).find(".slide-to-right");
        var leftBtn = $(this.container).find(".slide-to-left");

        if (!this.isInfiniteSlider) {

            if (this.actualSlide == this.totalSlides - (this.shownItems - 1)) {
                rightBtn.addClass("passive");
            } else {
                rightBtn.removeClass("passive");
            }

            if (this.actualSlide == 1) {
                leftBtn.addClass("passive");
            } else {
                leftBtn.removeClass("passive");
            }
        } else {
            leftBtn.removeClass("passive");
        }

    },
    resizeMiddleInit: function () {

        if (/*this.shownItems == 4 && */this.middleLarge && $(window).width() > 1300) {

            var largeSlide = $(this.sliderList).find('.slider-item').eq(1);
            $(largeSlide).addClass("large");

            var largeWidth = $(this.sliderList).find('.slider-item.large').outerWidth();

            this.totalListWidth += (largeWidth - this.itemWidth);
            $(this.sliderList).css("width", this.totalListWidth);
        } else {
            $(this.sliderList).find('.slider-item').eq(1).removeClass("large");
        }
        /*else if (this.middleLarge) {
            $(this.sliderList).find('.slider-item').eq(1).addClass("large");
        }*/
    },
    resizeMiddleSlide: function (targetIndex) {

        if (/*this.shownItems == 4 &&*/ this.middleLarge && $(window).width() > 1300) {

            var largeSlide = $(this.sliderList).find('.slider-item').eq(targetIndex);

            $(this.sliderList).find('.slider-item.large').removeClass("large");
            $(largeSlide).addClass("large");
        } else {
             $(this.sliderList).find('.slider-item.large').removeClass("large");
        }
         /*else if (this.middleLarge) {
            $(this.sliderList).find('.slider-item.large').removeClass("large");
        }*/
    },
    pointsInit: function () {
        for (i = 0; i < this.totalSlides; i++) {
            var id = i + 1;
            var point = "<li data-slide-target=\"" + id + "\" class=\"slider-point\"></li>";
            $(this.container).find(".slider-points-list").append(point);
        }
        ;
        this.setActivePoint();
    },
    setActivePoint: function () {
        var self = this;

        $(this.container).find(".slider-point").each(function (entry) {

            if (self.actualSlide == entry + 1) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

    },
    slidesCategorySwitcher: function (btn, targetId) {
        $(this.container).find(".slides-category.active").removeClass("active");
        $(btn).addClass("active");

        $(this.container).find(".slider-list.active").removeClass("active");
        $(this.container).find(targetId).addClass("active");

        //$(this.container).find(".slider-list.active").countTotalSlides();
        this.countTotalSlides();

        this.sliderList = $(this.container).find(targetId);
        this.widthInit();
    },
    nextSlide: function () {
        this.actualSlide++;
        this.isSliding = true;
        var self = this;

        // infinite slider
        if (!this.isInfiniteSlider) {

            if (this.actualSlide > this.totalSlides - (this.shownItems - 1)) {
                this.actualSlide = 1;
            }

            var nextId = this.actualSlide;
            var nextSlide = $(this.sliderList).find('.slider-item[data-slideid="' + nextId + '"]');

            var offset = nextSlide.offset().left - nextSlide.parent().offset().left;
            nextSlide.parent().css("left", -offset);

            this.isSliding = false;

        } else {

            $(self.sliderList).removeClass("no-transition");

            if (this.actualSlide == this.totalSlides + 1) {
                this.actualSlide = 1;
            }

            var nextId = this.actualSlide;
            //var nextSlide = $(this.sliderList).find('.slider-item').eq(1);
            var nextSlide = $(this.sliderList).find('.slider-item[data-slideid="' + nextId + '"]');

            var offset = nextSlide.offset().left - nextSlide.parent().offset().left;
            nextSlide.parent().css("left", -offset);

            var movedSlide = $(this.sliderList).find('.slider-item').first();

          /*  setTimeout(function () {

                $(self.sliderList).addClass("no-transition");

                $(self.sliderList).append(movedSlide);
                nextSlide.parent().css("left", "0");
                self.isSliding = false;

            }, 500);*/

            setTimeout(function () {

                $(self.sliderList).addClass("no-transition");

                $(self.sliderList).append(movedSlide);
                nextSlide.parent().css("left", "0");

            }, 500);

            setTimeout(function () {
                self.isSliding = false;
            }, 20);

            this.resizeMiddleSlide(2);
        }

        this.hideNavigationButtons();
        this.setActivePoint();

    },
    previousSlide: function () {
        this.actualSlide--;
        this.isSliding = true;
        var self = this;

        if (!this.isInfiniteSlider) {
            if (this.actualSlide < 1) {
                this.actualSlide = 1;
            }

            var previousId = this.actualSlide;

            var prevSlide = $(this.sliderList).find('.slider-item[data-slideid="' + previousId + '"]');
            var offset = prevSlide.offset().left - prevSlide.parent().offset().left;
            prevSlide.parent().css("left", -offset);

            this.isSliding = false;
            this.hideNavigationButtons();
        } else {

            if (this.actualSlide == 0) {
                this.actualSlide = this.totalSlides;
            }

            $(self.sliderList).addClass("no-transition");

            var movedSlide = $(this.sliderList).find('.slider-item').last();
            $(self.sliderList).prepend(movedSlide);
            $(self.sliderList).css("left", "-300px");


            setTimeout(function () {
                $(self.sliderList).removeClass("no-transition");
                $(self.sliderList).css("left", "0px");

            }, 20);

            setTimeout(function () {
                self.isSliding = false;
            }, 500);

            this.resizeMiddleSlide(1);
        }

        this.hideNavigationButtons();
        this.setActivePoint();
    },
}


function MainMenu(container) {
    this.container = container;
    this.isPickerOpen = false;
    this.isCategoryMenuOpen = false;
    this.Init();
}

MainMenu.prototype = {
    constructor: MainMenu,
    Init: function () {
        this.AddEvents();
    },
    AddEvents: function () {
        var self = this;
        var firstLvlBtnDrop = $(this.container).find(".first-lvl-item.has-dropdown>span, .first-lvl-item.has-dropdown>a");
        var secondLvlBtnDrop = $(this.container).find(".second-lvl-item.has-dropdown>span, .second-lvl-item.has-dropdown>a");
        var secondLvlBtn = $(this.container).find(".second-lvl-item>a");

        var menuToggleBtn = $(this.container).find(".menu-toggle");

        var applicationPicker = $(this.container).find(".application-picker");
        var applicationPickerContent = $(this.container).find(".application-picker-menu");


        var categoryMenuBtn = $(this.container).find(".category-menu-item");
        var categoryMenuContent = $(this.container).find(".category-menu-content");
        var categorymenuProductList = $(this.container).find(".category-menu-item");

        var categoryMenuProductItem = $(this.container).find(".category-menu-product-item");

        var setTimeoutConst = 0;
        var delayHover = 350;


        firstLvlBtnDrop.on("click", function (e) {

            if (self.CheckIfTablet() || self.CheckIfMobile()) {
                e.preventDefault();
                self.ExpandedClasses(this);
            }

        });

        secondLvlBtnDrop.on("click", function (e) {
            if (self.CheckIfTablet() || self.CheckIfMobile()) {
                e.preventDefault();
            }
            self.ExpandedClasses(this);
        });

        secondLvlBtn.on("click", function () {
            // self.CloseMobileMenu();
        })


        menuToggleBtn.on("click", function (e) {
            e.preventDefault();
            self.MobileToggle();
        });


        applicationPicker.on("click", function (e) {
            e.preventDefault();

            if (self.isPickerOpen) {
                self.HideApplicationPicker();
            } else {
                self.ShowApplicationPicker();
            }

        });

        applicationPickerContent.on("mouseleave", function () {
            self.HideApplicationPicker();
        });
        var setTimeoutHide = 0
        categoryMenuBtn.on("mouseenter", function (e) {

            e.preventDefault();
            clearTimeout(setTimeoutHide);
            var id = $(this).find(">a");
            setTimeoutConst = setTimeout(function () {

                self.ShowCategoryMenuContent(id);
                $(".category-menu-overlay").stop().fadeIn();
                delayHover = 0;
            }, delayHover);


        });

        categorymenuProductList.on("mouseleave", function (e) {

            clearTimeout(setTimeoutConst);

            self.HideCategoryMenuContent();
            setTimeout(function () {
                if (!self.isCategoryMenuOpen) {
                    $(".category-menu-overlay").stop().fadeOut();
                }
            }, 100);

            setTimeout(function () {
                if (!self.isCategoryMenuOpen) {
                    delayHover = 350;
                }
            }, 450);


        });

        categoryMenuProductItem.on("mouseenter", function (e) {
            self.ChangeProductContent(this);
        });


    },
    ExpandedClasses: function (target) {
        $(target).parent().toggleClass("expanded");
    },
    MobileToggle: function () {
        $(this.container).find("#main-menu").toggleClass("active");
        $(this.container).parent().toggleClass("full-screen-menu");
        $("body").toggleClass("no-scroll");
    },
    CloseMobileMenu: function () {
        $(this.container).find("#main-menu").removeClass("active");
        $(this.container).parent().removeClass("full-screen-menu");
        $("body").removeClass("no-scroll");
    },
    ShowApplicationPicker: function () {

        // detect opened and close category menu
        if (this.isCategoryMenuOpen) {
            this.HideCategoryMenuContent();
        }

        $(this.container).find(".application-picker").addClass("active");
        $(this.container).find(".application-picker-content").addClass("active");

        $(this.container).find(".application-picker-content").fadeIn(500);

        var topPos = $("#top-menu").outerHeight();
        $("body").addClass("no-scroll");
        $(this.container).find(".application-picker-content").css("top", topPos);
        this.isPickerOpen = true;

    },
    HideApplicationPicker: function () {

        $(this.container).find(".application-picker").removeClass("active");
        $(this.container).find(".application-picker-content").removeClass("active");

        $(this.container).find(".application-picker-content").fadeOut(500);

        $("body").removeClass("no-scroll");
        this.isPickerOpen = false;
    },
    ShowCategoryMenuContent: function (id) {

        // detect opened and close application picker
        if (this.isPickerOpen) {
            this.HideApplicationPicker();
        }

        var target = $(id).attr("href");
        $(id).parent().addClass("active");

        $(target).addClass("active");
        $(target).stop().fadeIn(500);

        var topPos = $("#top-menu").outerHeight();
        $("body").addClass("no-scroll");
        $(target).css("top", topPos - 1);

        this.isCategoryMenuOpen = true;

    },
    HideCategoryMenuContent: function () {

        var id = $(this.container).find(".category-menu-item.active");
        var target = $(id).find("a").attr("href");
        $(id).removeClass("active");

        $(target).removeClass("active");
        $(target).stop().fadeOut(100);

        $("body").removeClass("no-scroll");

        this.isCategoryMenuOpen = false;

    },
    ChangeProductContent: function (item) {
        $(item).parent().find(".category-menu-product-item.active").removeClass("active");
        $(item).addClass("active");
    },
    CheckIfMobile: function () {
        if (window.innerWidth <= 767) {
            return true;
        } else {
            return false;
        }
    },
    CheckIfTablet: function () {
        if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
            return true;
        } else {
            return false;
        }
    }

}

function CheckIfMobile() {
    if (window.innerWidth <= 767) {
        return true;
    } else {
        return false;
    }
}

function CheckIfTablet() {

    if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
        return true;
    } else {
        return false;
    }
}

/* Detect Mac OS and force scrollbars */

function scrollDown(){
    for(i=0;i<=jQuery('.mac-os .third-lvl-list').length;i++){
        try{
        var g=jQuery('.mac-os .third-lvl-list')[i];
        g.scrollTop+=1;
        g.scrollTop-=1;
        } catch(e){
        //eliminates errors when no scroll is needed
        }
    }

     for(i=0;i<=jQuery('.mac-os .select2-dropdown').length;i++){
        try{
        var g=jQuery('.mac-os .select2-dropdown')[i];
        g.scrollTop+=1;
        g.scrollTop-=1;
        } catch(e){
        //eliminates errors when no scroll is needed
        }
    }
}

$(document).ready(function() {
    if(navigator.userAgent.indexOf('Mac') > 0)
    $('body').addClass('mac-os');

    //constantly update the scroll position:
    sc=setInterval(scrollDown,200);

    //optional:stop the updating if it gets a click
    jQuery('.mac-os .third-lvl-list').mousedown(function(e){
        clearInterval(sc);
    });

    //optional:stop the updating if it gets a click
    jQuery('.mac-os .select2-dropdown').mousedown(function(e){
        clearInterval(sc);
    });
});


// swap title image and gallery
$(document).ready(showProductImage);
$(window).on('resize', showProductImage);

function showProductImage() {
    var $productGallery = $('.product-gallery');
    if ( $productGallery.length){
        var screen = $(window);
        if (screen.width() < 768) {
            $("#product-overveiw .product-image").css({"display": "none",});
            $("#product-overveiw .product-text").css({"margin-top": "350px",});
        }
        else {
            $("#product-overveiw .product-image").css({"display": "block",});
            $("#product-overveiw .product-text").css({"margin-top": "0",});
        }
    }
    else {
        $("#product-overveiw .product-image").css({"display": "block",});
        $("#product-overveiw .product-text").css({"margin-top": "0",});
    }
}


// ERIGO

$(document).ready(function() {
	$('ul.person-list .person-contact a').each(function(index, item) {
		var emailParts = $(item).text().split('@');

		$(item).html(emailParts[0] + '<em>@' + emailParts[1] + '</em>');
	});
});

$(document).ready(function() {
	countdown();
    setInterval(function(){
        countdown();
    }, 1000);
});

$(window).on('load', function() {

	selectRightContact();
});

function countdown() {
    var text = $('.text-count h1').text();

    var prefix = text.substring(0, text.search(/[0-9]/));

    var actualDate = new Date();
    var finalDate = new Date(1504562400000);

    var daysLeft = Math.ceil((finalDate.getTime() - actualDate.getTime()) / 86400000);
    
    if (daysLeft > 1) {
        daySuffix = 'days';
    } else {
    	daysLeft = Math.max(0, Math.ceil((finalDate.getTime() - actualDate.getTime()) / (86400000 / 24)));
        
        if (daysLeft != 1) {
        	daySuffix = 'hours';
        } else {
        	daySuffix = 'hour';
        }
    }

//    $('.text-count h1').html(prefix + '<span class="red">' + daysLeft + ' ' + daySuffix + '</span>');
    $('.text-count h1').html('<span class="red">IN &nbsp;' + daysLeft + '&nbsp; ' + daySuffix + '</span>').fadeIn();
}

function selectRightContact() {
	
	if(($('.contact-item').length > 0) && (!window.location.hash)) {
		var array = document.domain.split('.');
		var lastEl = array[array.length-1];
		var hrefEl = '#cp11';
		
		switch(lastEl){
			case 'cz':
				hrefEl = '#cp40';
		        break;
			case 'ru':
				hrefEl = '#cp42';
		        break;
			case 'com':
				hrefEl = '#cp12';
		        break;
			case 'de':
				hrefEl = '#cp64';
		        break;
			case 'fr':
				hrefEl = '#cp43';
		        break;
		}
		
		if(array[array.length-2] == 'robeuk') {
			hrefEl = '#cp44';
		}
		
		$('.contact-link').each(function(){
			if($(this).attr('href') == hrefEl) {
				$(this).parent().addClass('show');
				$(this).click();
			}
		})
	} else {
		if(window.location.hash) {
			$('.contact-list .contact-item.active').addClass('show');
		}	
	}
	
	
}

$('.contact-list .contact-item > a').click(function() {
	$('.contact-list .contact-item.show').removeClass('show');
	$(this).parent().addClass('show');
})

// ERIGO