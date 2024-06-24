function add(num1, num2) {
  return num1 + num2; 
}

function subtract(num1, num2) {
  return num1 - num2; 
}

function multiply(num1, num2) {
  return num1 * num2; 
}

function divide(num1, num2) {
  return num1 / num2; 
}

function operate(num1, num2, symbol) {
  if(symbol === '+') {
    return add(num1, num2); 
  } else if(symbol === '-') {
    return subtract(num1, num2); 
  } else if(symbol === '*') {
    return multiply(num1, num2); 
  } else if(symbol === '/') {
    return divide(num1, num2); 
  }
}

let operand1, operand2; 
let operator; 
let overallInput = "";    // entire sequence of chars (entire expression)
const display = document.querySelector("div.display"); 
const allBtns = document.querySelectorAll(".calculator button"); 
allBtns.forEach( (btn) => btn.addEventListener("click", buttonHandler)); 

function buttonHandler(event) {
  if(event.target.classList.contains("digit")) {
    if( overallInput.at(overallInput.length - 1)==='+' || overallInput.at(overallInput.length - 1)==='-' 
        || overallInput.at(overallInput.length - 1)==='*' || overallInput.at(overallInput.length - 1)==='/') {
      display.textContent = ""; 
    }
    display.textContent += event.target.textContent; 
    overallInput += event.target.textContent; 
  } 
  else if(event.target.classList.contains("operator") &&!overallInput.includes('+') && !overallInput.includes('-')
          && !overallInput.includes('*') && !overallInput.includes('/')) {
    operator = event.target.textContent; 
    operand1 = Number(display.textContent); 
    overallInput += event.target.textContent; 
  }
}


