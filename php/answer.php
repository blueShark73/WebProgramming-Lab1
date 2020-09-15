<?php

function checkData($x, $y, $r){
    $X_VALUES = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
    $R_VALUES = array(1, 1.5, 2, 2.5, 3);
    $Y_MAX_VALUE = 5;
    $Y_MIN_VALUE = -3;

    if (in_array($x, $X_VALUES) && ($y <= $Y_MAX_VALUE && $y >= $Y_MIN_VALUE) && in_array($r, $R_VALUES)) {
        return true;
    }
    return false;
}

function checkParams(){
    return isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["r"]);
}

function getResult($x, $y, $r)
{
    //   2 | 1
    //   -----
    //   3 | 4

    // 1 quarter
    if ($x >= 0 && $y >= 0 && $y <= $r - 2 * $x) {
        return true;
    }

    // 2 quarter
    if ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= $r * $r / 4) {
        return true;
    }

    // 4 quarter
    if ($x >= 0 && $y <= 0 && $x <= $r && $y >= -$r / 2) {
        return true;
    }

    return false;
}

function resultDiv($result)
{
    return $result ? "<div style=\"color: green\">True</div>" : "<div style=\"color: red\">False</div>";
}

function pushInHistory($data)
{
    if (!isset($_SESSION['history'])) {
        $_SESSION['history'] = array();
    }
    array_push($_SESSION['history'], $data);
}

// Ne lomaite laby
function sendErrorStatus(){
    http_response_code(400);
    exit();
}


session_start();
date_default_timezone_set('Europe/Moscow');
$startTime = microtime(true);
if(!checkParams()){
    sendErrorStatus();
}
$xValue = (double)$_GET["x"];
$yValue = (double)$_GET["y"];
$rValue = (double)$_GET["r"];
if (!checkData($xValue, $yValue, $rValue)) {
    sendErrorStatus();
}
$result = resultDiv(getResult($xValue, $yValue, $rValue));
// in microseconds
$executionTime = round(microtime(true) - $startTime, 12) * 1000000;
$currentTime = date("H:i:s");
$data = array(
    "x" => $xValue,
    "y" => $yValue,
    "r" => $rValue,
    "currentTime" => $currentTime,
    "executionTime" => $executionTime,
    "result" => $result
);
pushInHistory($data);

foreach ($_SESSION['history'] as $row) {
    echo "<div class=\"table-row\">
                <div>$row[x]</div>
                <div>$row[y]</div>
                <div>$row[r]</div>
                <div>$row[currentTime]</div>
                <div>$row[executionTime]</div>
                     $row[result]
            </div>";
}




