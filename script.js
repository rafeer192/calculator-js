const MAX_DISPLAY_SIZE = 10; 
let operand1, operand2; 
let operator; 
let overallInput = "";    // entire sequence of chars (entire expression)
const negativeBtn = document.querySelector("button.negative"); 
const display = document.querySelector("div.display"); 
const allBtns = document.querySelectorAll(".calculator button"); 
display.textContent = "";
allBtns.forEach( (btn) => btn.addEventListener("click", buttonHandler)); 

function buttonHandler(event) {
  const activeButton = document.querySelector("button.active"); 
  if(activeButton) {
    activeButton.classList.remove("active"); 
  } 
  event.target.classList.toggle("active");

  if(event.target.classList.contains("digit")) {
    digitSubhandler(event);
  } 
  else if(event.target.classList.contains("operator")) {
    operatorSubhandler(event); 
  }
  else if(event.target.classList.contains("equals")) {
    equalsSubhandler(event); 
  }
  else if(event.target.classList.contains("clear")) {
    clearSubhandler(event); 
  }
  else if(event.target.classList.contains("decimal")) {
    decimalSubhandler(event); 
  }
  else if(event.target.classList.contains("negative")) {
    negativeSubhandler(event); 
  }
}

// SUBHANDLERS

function digitSubhandler(event) {
  if( overallInput.endsWith('+') || overallInput.endsWith('_') ||
      overallInput.endsWith('*') || overallInput.endsWith('/')) {
    display.textContent = "";   // reset
  } else if(overallInput.endsWith('-')) {
    display.textContent = '-';
  }

  if(display.textContent.length <= MAX_DISPLAY_SIZE) {
    display.textContent += event.target.textContent; 
    overallInput += event.target.textContent; 
  }
}

function operatorSubhandler(event) {
  operator = event.target.textContent; 
  operand1 = Number(display.textContent); 
  if(!overallInput.includes('+')&&!overallInput.includes('_')&&!overallInput.includes('*')&&!overallInput.includes('/')) { 
    overallInput += event.target.textContent; 
  } else {
    overallInput = overallInput.replace(/[+|*|/|_]/g, event.target.textContent); 
  }
  if(negativeBtn.classList.contains("chosen")) {
    negativeBtn.classList.remove("chosen"); 
  }
}

function equalsSubhandler(event) {
  operand2 = Number(display.textContent);
  if(operator === '/' && operand2 === 0) {
    display.textContent = "nope, hit AC"; 
  }
  else if(overallInput.includes('+')||overallInput.includes('_')||overallInput.includes('*')||overallInput.includes('/')) {
    let result = operate(operand1, operand2, operator); 
    let resultLength = (result+'').length; 
    if(resultLength > MAX_DISPLAY_SIZE ) {
      if(Number.isInteger(result)) {
        result = result.toExponential(4);
      } else {
        result = result.toFixed(resultLength - MAX_DISPLAY_SIZE - 2); 
      }
    } 
    display.textContent = result; 
    overallInput = String(result); 
  }
}

function clearSubhandler(event) {
  if(negativeBtn.classList.contains("chosen")) {
    negativeBtn.classList.remove("chosen"); 
  }
  display.textContent = ""; 
  overallInput = "";
}

function decimalSubhandler(event) {
  if(!display.textContent.includes('.') && display.textContent.length <= MAX_DISPLAY_SIZE) {
    //not already decimal in number, fits
    display.textContent += '.'; 
    overallInput += '.';
  } 
  else if(overallInput.endsWith('+')|| overallInput.endsWith('_') || 
          overallInput.endsWith('*') || overallInput.endsWith('/'))  {
    display.textContent = '0.'; 
    overallInput += '.';
  }
}

function negativeSubhandler(event) {
  event.target.classList.toggle("chosen"); 
  if(event.target.classList.contains("chosen")) {
    display.textContent = display.textContent.padStart(display.textContent.length+1, '-'); 
    if(!overallInput.includes('+')&&!overallInput.includes('_')&&!overallInput.includes('*')&&!overallInput.includes('/')) {
      overallInput = overallInput.padStart(overallInput.length+1, '-'); 
    } else {
      overallInput = overallInput.replace(operator, `${operator}-`); 
    }
  } 
  else {
    display.textContent = display.textContent.replace('-', ''); 
    overallInput = overallInput.replace('-', '');
  }
}

// ----------------------------
// MATH FUNCTIONS
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
  } else if(symbol === '_') {
    return subtract(num1, num2); 
  } else if(symbol === '*') {
    return multiply(num1, num2); 
  } else if(symbol === '/') {
    return divide(num1, num2); 
  }
}