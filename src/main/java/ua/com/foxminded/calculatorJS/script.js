var NUMERIC_KEY = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99,
        100, 101, 102, 103, 104, 105 ];
var OPERATION_KEY = [ 106, 107, 109, 111 ];
var ENTER_KEY = 13;
var BACKSPACE_KEY = 8;
var RESULT = document.getElementById("result");

var calculationElements = new Array();

printCalculationElements();

function printCalculationElements() {
    var output = "";

    calculationElements.forEach(function(element) {
        output += element;
    });

    if (output == "") {
        output = "0";
    }
    RESULT.value = output;
}

function proccessDigit(digit) {
    var length = calculationElements.length;
    var lastElement = calculationElements[length - 1];
    if (typeof lastElement == "number") {
        calculationElements[length - 1] = lastElement * 10 + digit
    } else {
        calculationElements[length] = digit;
    }
    printCalculationElements();
}

function proccessOperation(operation) {
    var length = calculationElements.length;
    var lastElement = calculationElements[length - 1];
    if (typeof lastElement == "number") {
        calculationElements[length] = operation;
    } else if (typeof lastElement == "string") {
        calculationElements[length - 1] = operation;
    }
    printCalculationElements();
}
function cancelAllOperation() {
    calculationElements.length = 0;
    printCalculationElements();
}
function cancelLastOperation() {
    calculationElements.pop();
    printCalculationElements();
}
function proccessCalculationElements() {
    divisionMultiplication();
    additionSubtraction();
    printCalculationElements();
}

function divisionMultiplication() {
    for (i = 0; i < calculationElements.length; i++) {
        if (typeof calculationElements[i] == "number"
                && i < calculationElements.length - 2) {
            if (calculationElements[i + 1] == "*") {
                calculationElements[i + 2] = calculationElements[i]
                        * calculationElements[i + 2];
                calculationElements.splice(i, 2);
                --i;
            } else if (calculationElements[i + 1] == "/") {
                calculationElements[i + 2] = calculationElements[i]
                        / calculationElements[i + 2];
                calculationElements.splice(i, 2);
                --i;
            }
        }
    }
}
function additionSubtraction() {
    for (i = 0; i < calculationElements.length; i++) {
        if (typeof calculationElements[i] == "number"
                && i < calculationElements.length - 2) {
            if (calculationElements[i + 1] == "+") {
                calculationElements[i + 2] = calculationElements[i]
                        + calculationElements[i + 2];
                calculationElements.splice(i, 2);
                --i;
            } else if (calculationElements[i + 1] == "-") {
                calculationElements[i + 2] = calculationElements[i]
                        - calculationElements[i + 2];
                calculationElements.splice(i, 2);
                --i;
            }
        }
    }
}

RESULT.onkeydown = handleKeyDown;

function handleKeyDown(event) {
    RESULT.focus();
    event.preventDefault();
    if (NUMERIC_KEY.indexOf(event.keyCode) != -1) {
        proccessDigit(parseInt(event.key));
    } else if (OPERATION_KEY.indexOf(event.keyCode) != -1) {
        proccessOperation(event.key);
    } else if (event.keyCode == ENTER_KEY) {
        proccessCalculationElements();
    } else if (event.keyCode == BACKSPACE_KEY) {
        cancelLastOperation();
    }
}
