const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const CANVAS_R_VALUE = 160;

async function onSubmitClick() {
    let point = $("#point");
    if (checkX() && checkY() && checkR()) {
        writeErrorMessage("");
        const x = getXValue(), y = getYValue(), r = getRValue();
        const xCoordinate = calculateX(x, r), yCoordinate = calculateY(y, r);
        point.attr({
            cx: xCoordinate,
            cy: yCoordinate,
            visibility: "visible"
        });

        /*
        $.ajax({
            url: "php/answer.php?x=" + x + "&y=" + y + "&r=" + r,
            type: 'GET',
            success: function (response) {
                $(".table-content").html(response);
            }
        });
         */

       /* try {
            const response = await fetch("php/answer.php?x=" + x + "&y=" + y + "&r=" + r);
            const data = response.text();
            $(".table-content").html(data);
        } catch (err) {
            writeErrorMessage('HTTP error. Try later...');
        }*/

        fetch("php/answer.php?x=" + x + "&y=" + y + "&r=" + r)
            .then(response => response.text())
            .then(data => $(".table-content").html(data))
            .catch(err => writeErrorMessage('HTTP error. Try later...'));
    } else {
        point.attr({
            visibility: "hidden"
        })
    }
}

function onClearTableClick() {
    fetch("php/clear_table.php")
        .then(response => response.text())
        .then(data => $(".table-content").html(data));
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

$('button[name=\"clearTable\"]').click(onClearTableClick);

$("button.control-button[name = \"reset\"]").click(function () {
    $(".r-value-selected-button")
        .toggleClass("r-value-selected-button")
        .toggleClass("r-value-button");
});

$(".table-header").click(function () {
    $(".table-content").slideToggle("slow");
});

$(".label").animate({
    opacity: "+=1",
    fontSize: "+=1.2em"
}, 1500);

// handler enter key
$("#data-form").keydown(function (event){
    // enter key code = 13
    if(event.keyCode === 13){
        event.preventDefault();
        $('button[name=\"submit\"]').click();
    }
});
