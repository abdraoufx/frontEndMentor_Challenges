// Inputs
const billInp = document.getElementById("bill");
const percBoxs = document.querySelectorAll(".perc-box");
const customPrBox = document.getElementById("custom-perc");
const peopleCount = document.getElementById("n-people");

// Outputs
const tipOutput = document.getElementById("tip-am");
const totalOutput = document.getElementById("total-am");

// Clickable
const resetBtn = document.getElementById("reset-Btn");

billInp.onkeyup = function () {
  let errElement = document.querySelector(".bill .error");
  let parElement = this;
  validVal(parElement, errElement);
  if (peopleCount.value.length !== 0) {
    calcTip();
  } else {
    emptyValue();
  }
};

peopleCount.onkeyup = function () {
  let errElement = document.querySelector(".p-num .error");
  let parElement = this;
  validVal(parElement, errElement);
  billInp.classList.contains("valid") && this.classList.contains("valid")
    ? resetBtn.classList.remove("no-data")
    : resetBtn.classList.add("no-data");
  if (billInp.value.length !== 0) {
    calcTip();
  } else {
    emptyValue();
  }
};

resetBtn.addEventListener("click", (e) => {
  if (resetBtn.classList.contains("no-data")) {
    e.preventDefault();
  } else {
    emptyValue();
  }
});

customPrBox.onkeyup = () => {
  document.querySelectorAll(".perc-box").forEach((b) => {
    if (b.classList.contains("active")) {
      b.classList.remove("active");
    } else {
    }
  });
};

percBoxs.forEach((box) => {
  box.onclick = function () {
    addActive(box);
    if (billInp.value.length !== 0 && peopleCount.value.length !== 0) {
      calcTip();
    }
  };
});

// Functions To Use :

// Valid Input Value Function:
function validVal(parElement, errElement) {
  if (parElement.value.length > 0) {
    parElement.classList.add("valid");
  }
  if (parseInt(parElement.value) === 0) {
    parElement.classList.replace("valid", "error");
    errElement.style.display = "block";
  } else if (parseInt(parElement.value) > 0) {
    parElement.classList.replace("error", "valid");
    errElement.style.display = "none";
  }
}

// Add Active Class Function:
function addActive(box) {
  document.querySelector(".perc-box.active").classList.remove("active");
  box.classList.add("active");
}

// Empty The Outputs Value Function:
function emptyValue() {
  tipOutput.innerHTML = "0.00";
  totalOutput.innerHTML = "0.00";
}

// Calculate Tip Function:
function calcTip() {
  let bill = parseFloat(billInp.value);
  let tipPerc;

  if (customPrBox.value.length >= 1) {
    tipPerc = parseFloat(customPrBox.value);
  } else {
    tipPerc =
      parseFloat(
        document.querySelector(".perc-box.active").getAttribute("data-value")
      ) / 100;
  }

  let people = parseFloat(peopleCount.value);

  let tipAmount = (bill * tipPerc) / people;
  let total = (bill * tipAmount) / people;

  tipOutput.innerHTML = tipAmount.toFixed(2);
  totalOutput.innerHTML = total.toFixed(2);
}
