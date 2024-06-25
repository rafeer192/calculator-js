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

const MAX_DISPLAY_SIZE = 10; 
let operand1, operand2; 
let operator; 
let overallInput = "";    // entire sequence of chars (entire expression)
const display = document.querySelector("div.display"); 
const allBtns = document.querySelectorAll(".calculator button"); 
display.textContent = "";
allBtns.forEach( (btn) => btn.addEventListener("click", buttonHandler)); 

function buttonHandler(event) {
  const activeButton = document.querySelector("button.active"); 
  if(activeButton) activeButton.classList.remove("active"); 
  event.target.classList.toggle("active");

  if(event.target.classList.contains("digit")) {
    if( overallInput.at(overallInput.length - 1)==='+' || overallInput.at(overallInput.length - 1)==='-' 
        || overallInput.at(overallInput.length - 1)==='*' || overallInput.at(overallInput.length - 1)==='/') {
      display.textContent = "";   // reset
    }
    if(display.textContent.length <= MAX_DISPLAY_SIZE) {
      display.textContent += event.target.textContent; 
      overallInput += event.target.textContent; 
    }
  } 
  else if(event.target.classList.contains("operator")) {
    operator = event.target.textContent; 
    operand1 = Number(display.textContent); 
    if(!overallInput.includes('+')&& !overallInput.includes('-')&& !overallInput.includes('*')&& !overallInput.includes('/')) {
      overallInput += event.target.textContent; 
    } else {
      overallInput = overallInput.replace(/[+|*|/|-]/g, event.target.textContent); 
    }
  }
  else if(event.target.textContent === '=') {
    if(overallInput.includes('+')||overallInput.includes('-')||overallInput.includes('*')||overallInput.includes('/')) {
      operand2 = Number(display.textContent);
      let result = operate(operand1, operand2, operator); 
      let resultLength = (result+'').length; 
      if( resultLength > MAX_DISPLAY_SIZE && Number.isInteger(result) ) {
        result = result.toExponential(4);
      } else if( resultLength > MAX_DISPLAY_SIZE && !Number.isInteger(result) ) {
        result = result.toFixed(resultLength - MAX_DISPLAY_SIZE); 
      }
      display.textContent = result; 
      overallInput = String(result); 
    }
  }
  else if(event.target.classList.contains("clear")) {
    //if(!overallInput.includes('+')&& !overallInput.includes('-')&& !overallInput.includes('*')&& !overallInput.includes('/')) {
      display.textContent = ""; 
      overallInput = "";
    //} 
  }
}


