const userInput = document.getElementById("user-data"), // The Input
  allKeys = document.querySelector(".keys-wrapper"), // All Keys
  toggler = document.querySelector(".toggler"), // Toggler
  calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    currentTheme: 1,
  };

toggler.onclick = updateTheme;

updateContent();

allKeys.addEventListener("click", (e) => {
  const { target } = e;
  const { outerText } = target;

  if (!target.matches("button")) return false;

  switch (outerText) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
    case "x":
      handleOperators(outerText);
      break;

    case ".":
      showDecimal(outerText);
      break;

    case "DEL":
      deleteChar();
      break;

    case "RESET":
      reset();
      break;

    default:
      if (Number.isInteger(parseFloat(outerText))) showDigits(outerText);
      break;
  }
  updateContent();
});

userInput.onfocus = () => {
  if (userInput.value == "0") {
    userInput.focus();
    userInput.value = "";
  }
};

userInput.addEventListener("keydown", (e) => {
  const { key } = e;

  switch (key) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "x":
      handleOperators(key);
      break;

    case ".":
      showDecimal(key);
      break;

    case "Backspace":
      deleteChar();
      break;

    default:
      if (Number.isInteger(parseFloat(key))) showDigits(key);
      break;
  }
});

// Functions To Use:

// Update Theme Function:
function updateTheme() {
  const elements = document.querySelectorAll(`.changable-theme`);

  if (calculator.currentTheme === 3) {
    elements.forEach((el) => {
      el.classList.remove(`theme-${calculator.currentTheme}`);
    });
    calculator.currentTheme = 1;
    elements.forEach((el) => {
      el.classList.add(`theme-${calculator.currentTheme}`);
    });
  } else {
    elements.forEach((el) => {
      el.classList.remove(`theme-${calculator.currentTheme}`);
    });

    ++calculator.currentTheme;

    elements.forEach((el) => {
      el.classList.add(`theme-${calculator.currentTheme}`);
    });
  }
}
// Update User Input Content Function:
function updateContent() {
  userInput.value = calculator.displayValue;
}
// Show Digits Function:
function showDigits(digit) {
  const { waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue === "0"
      ? (calculator["displayValue"] = digit)
      : (calculator["displayValue"] += digit);
  }
}
// Show Decimal Points One Time Function:
function showDecimal(dec) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
  }
  if (!calculator.displayValue.includes(dec)) calculator.displayValue += dec;
}
// Handle Operators Function:
function handleOperators(theOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  const userInput = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = theOperator;
    return;
  }
  if (firstOperand === null && !isNaN(userInput)) {
    calculator.firstOperand = userInput;
  } else if (operator) {
    const result = calc(firstOperand, userInput, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = theOperator;
}
// Calculation Function:
function calc(firstOp, secondOperand, operatorType) {
  if (operatorType === "+") {
    return firstOp + secondOperand;
  } else if (operatorType === "-") {
    return firstOp - secondOperand;
  } else if (operatorType === "*" || operatorType === "x") {
    return firstOp * secondOperand;
  } else if (operatorType === "/") {
    return firstOp / secondOperand;
  }

  return secondOperand;
}
// Reset Function
function reset() {
  userInput.value = "";
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}
// Delete Function:
function deleteChar() {
  let filter = calculator.displayValue.split("");
  filter.splice(-1, 1);
  calculator.displayValue = filter.join("");
}
