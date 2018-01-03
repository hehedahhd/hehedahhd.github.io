$(function() {
    "use-strict";
    $(".side-nav-left").sideNav({
        edge: "left",
        closeOnClick: !1
    }),
    $(".slider").slider({
        full_width: !0
    }),
    $("#owl-testimonial").owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0
    }),
    $(".latest-news-owl").owlCarousel({
        autoPlay: !1,
        singleItem: !0
    }),
    $("#fakeLoader").fakeLoader({
        zIndex: 999,
        spinner: "spinner1",
        bgColor: "#ffffff"
    }),
    $(".collapsible").collapsible({
        accordion: !1
    })
});
