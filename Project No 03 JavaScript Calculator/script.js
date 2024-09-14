const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function findSquare() {
  let displayValue = document.getElementById("display").value;
  let square = Math.pow(displayValue, 2);
  document.getElementById("display").value = square;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
