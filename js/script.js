$(".r-value-button").click(function () {
    $(".r-value-selected-button")
        .add(this)
        .toggleClass("r-value-selected-button")
        .toggleClass("r-value-button");
});

