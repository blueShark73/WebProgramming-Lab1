const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const CANVAS_R_VALUE = 160;

function onSubmitClick() {
    if (checkX() && checkY() && checkR()) {
        writeErrorMessage("");
        const x = getXValue(), y = getYValue(), r = getRValue();
        const xCoordinate = calculateX(x, r), yCoordinate = calculateY(y, r);
        $("#point").attr({
            cx: xCoordinate,
            cy: yCoordinate,
            visibility: "visible"
        });
    }
}

function getXValue() {
    let xText = $(".for-x input[type=\"radio\"]:checked").prev().text();
    return parseInt(xText);
}

function getYValue() {
    let yText = $("#y-value").val().replace(",", ".");
    return parseFloat(yText);
}

function getRValue() {
    let rText = $(".r-value-selected-button").text();
    return parseFloat(rText);
}

function calculateX(x, r) {
    return x / r * CANVAS_R_VALUE + CANVAS_WIDTH / 2;
}

function calculateY(y, r) {
    return CANVAS_HEIGHT / 2 - y / r * CANVAS_R_VALUE;
}

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
