$(".r-value-button").click(function () {
    $(".r-value-selected-button")
        .add(this)
        .toggleClass("r-value-selected-button")
        .toggleClass("r-value-button");
});

console.log("Hello");

$("#y-value").blur(function () {
    console.log($(this).val());
});

