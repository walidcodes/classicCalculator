// input section for digits.
let calcScreen = document.querySelector("h1");
let floater = "";
let result = [0, 0];
let resultIndex = 0;
let operator = [];
let operatorIndex = 0;
let ready = true;
let calculated = false;

const nums = Array.from(document.querySelectorAll(".digit"));

nums.forEach((n) => n.addEventListener("click", digitInput));

function digitInput(click) {
  if (ready === true || calcScreen.innerText === "0") {
    calcScreen.innerText = "";
  }
  if (calcScreen.innerText.length < 13)
    calcScreen.innerText += floater + click.target.innerText;
  calculated = false;
  floater = "";
  ready = false;
}
// input decimal

document.querySelector("#decimal").addEventListener("click", (click) => {
  if (
    calcScreen.innerText.indexOf(".") === -1 &&
    calcScreen.innerText.length < 12 &&
    !floater
  ) {
    if (calcScreen.innerText === "0") floater += "0";
    floater += ".";
  }
});

// Calculate and Display

const operators = Array.from(document.querySelectorAll(".operator"));

operators.forEach((o) => o.addEventListener("click", calcAndReady));

function calcAndReady(click) {
  ready = true;
  result[resultIndex] = Number(calcScreen.innerText);
  operator[operatorIndex] = click.target.innerText;
  if (!resultIndex) {
    resultIndex++;
    operatorIndex++;
  } else if (resultIndex === 1) {
    if (operator[0] === "+") {
      if (!calculated) result[0] += result[1];
    } else if (operator[0] === "-") {
      if (!calculated) result[0] -= result[1];
    } else if (operator[0] === "×") {
      if (!calculated) result[0] *= result[1];
    } else if (operator[0] === "÷") {
      if (!calculated) result[0] /= result[1];
    }
    operator[0] = operator[1];
    if (!calculated) {
      if (String(result[0]).length < 14) calcScreen.innerText = result[0];
      else if (String(result[0]).split(".")[0].length > 13)
        calcScreen.innerText = "E";
      else
        calcScreen.innerText = result[0].toFixed(
          12 - String(result[0]).split(".")[0].length
        );
      calculated = true;
    }
  }
  if (operator[0] === "=") {
    result = [0, 0];
    resultIndex = 0;
    operator = [];
    operatorIndex = 0;
    ready = true;
    calculated = false;
  }
}
