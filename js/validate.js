function checkYInput() {
    let yText = $("#y-value").val().replace(",", ".");
    let yVal = parseFloat(yText);
    if (/^(-?\d+)(\.\d+)?$/.test(yText) && yVal >= -3 && yVal <= 5) {
        $(this).css("border-color", "green");
        return true;
    } else {
        $(this).css("border-color", "red");
        return false;
    }
}

function checkY() {
    if(!checkYInput()){
        writeErrorMessage("Fix Y value");
        return false;
    }
    return true;
}

function checkX() {
    if($(".for-x input[type=\"radio\"]:checked").val() === undefined){
        writeErrorMessage("Select X value");
        return false;
    }
    return true;
}

function writeErrorMessage(message) {
    $("#error-log").html(message);
}

function checkR() {
    if($(".r-value-selected-button").val() === undefined){
        writeErrorMessage("Select R value");
        return false;
    }
    return true;
}

function onSubmitClick() {
    if(checkX() && checkY() && checkR()){
        writeErrorMessage("It's ok");
    }
}