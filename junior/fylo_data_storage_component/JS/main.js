const rangeInputs = document.querySelectorAll('input[type="range"]');
const rangeId = document.getElementById("range");
const used = document.querySelector(".used");
const stLeft = document.querySelector(".left");
const bgsInc = 1;

if (localStorage.getItem("left") && localStorage.getItem("used")) {
  stLeft.innerHTML = `${localStorage.getItem("left")}`;
  used.innerHTML = `${localStorage.getItem("used")} GB`;
  used.style.fontWeight = `600`;
  rangeId.setAttribute("value", localStorage.getItem("used"));
  rangeId.style.backgroundSize =
    `${parseInt(localStorage.getItem("used")) / 10}%` + "100%";
} else {
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleRangeInput);
});

function handleRangeInput(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "%100%";

  let left = parseInt(max - val);

  stLeft.innerHTML = `${left}`;
  localStorage.setItem("left", left);

  used.innerHTML = `${val} GB`;
  localStorage.setItem("used", val);
}
