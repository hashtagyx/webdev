$("h1").addClass("big-title");

$("button").click(function () {
    $("h1").slideUp().slideDown().animate({
        fontSize: 80,
        opacity: 0.5
    })
})

$("input").keydown(function(e) {
    $("h1").text($("h1").text() + e.key);
    console.log($("h1").text());
})

$("h1").on("mouseenter mouseleave", function() {
    $("h1").toggleClass("purple");
})