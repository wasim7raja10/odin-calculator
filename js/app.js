const keys = Array.from(document.querySelectorAll('button'));
const screenUp = document.querySelector('.up');
screenUp.textContent = "0";
const screenDown = document.querySelector('.down');
screenDown.textContent = "0";
let result;
const operation = ['+', '−', '×', '÷']

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x) {
  switch (operator) {
    case "+":
      result = add(x, result);
      break;
    case "−":
      result = subtract(result, x);
      break;
    case "×":
      result = multiply(x, result);
      break;
    case "÷":
      result = divide(result, x);
      break;
    default:
      result = x;
      break;
  }
  screenDown.textContent = result;
}

function checkDecimal() {
  if (screenDown.textContent.includes('.')) {
    document.querySelector('#dot').disabled = true;
  } else {
    document.querySelector('#dot').disabled = false;
  }
}

function clear() {
  screenUp.textContent = "";
  screenDown.textContent = "";
  checkDecimal();
  result = null;
}

function backspace() {
  screenDown.textContent = screenDown.textContent.slice(0, -1);
  checkDecimal();
}

function displayUp(data) {

  if (data == '=') {
    screenUp.textContent += " " + screenDown.textContent + " =";
  } else {
    screenUp.textContent = result + " " + data;
  }
}

function displayDown(num) {
  if (screenDown.textContent == '0' || screenDown.textContent == '' ||
    screenDown.textContent == result) {
    screenDown.textContent = num;
  } else {
    screenDown.textContent += num;
  }
  checkDecimal();
}

function start(e) {
  const data = e.target.textContent;
  if (data >= 0 && data <= 9 || data == '.') {
    displayDown(data);
  } else if (data == 'clear') {
    clear();
  } else if (data == 'delete') {
    backspace();
  } else if (data == '=') {
    if (screenUp.textContent[screenUp.textContent.length - 1] != '=') {
      displayUp(data);
      const operator = screenUp.textContent.split(" ")[1];
      operate(operator, +screenDown.textContent);
    }
  } else {
    // operation
    if (result == null) {
      result = +screenDown.textContent;
    } else {
      const operator = screenUp.textContent[screenUp.textContent.length - 1];
      operate(operator, +screenDown.textContent);
    }
    displayUp(data);
  }
}

keys.forEach(key => key.addEventListener('click', start))