$(".r-value-button").click(function () {
    $(".r-value-selected-button")
        .add(this)
        .toggleClass("r-value-selected-button")
        .toggleClass("r-value-button");
});

$("#y-value").keyup(checkYInput);

$('button[name=\"submit\"]').on("click", onSubmitClick);

$(".label").animate({
    opacity: "+=1",
    fontSize: "+=1.2em"
}, 1500);
