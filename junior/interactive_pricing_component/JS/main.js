const slider = document.querySelector(".slider");
const toggler = document.querySelector(".toggler");
const views = document.querySelector(".head .views .number");
const priceEles = document.querySelectorAll(".price");
const startTrial = document.querySelector(".start-my-f");
const gotitTrial = document.getElementById("gotit");
const box = document.getElementById("trial-started");

slider.addEventListener("input", handleRangeInput);

toggler.onclick = () => {
  toggler.classList.toggle("checked");

  calcPrice(parseInt(slider.value));
};

startTrial.onclick = () => {
  document.querySelector("main").classList.add("overlay");

  box.classList.add("visible");
};

gotitTrial.onclick = () => {
  document.querySelector("main").classList.remove("overlay");

  box.classList.remove("visible");
};

//// Functions:

function handleRangeInput(e) {
  let target = e.target;

  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "%100%";

  calcViews(max, val);
  calcPrice(val);
}

function calcViews(max, val) {
  views.innerHTML = `${max * 10 * val}K`;
}

function calcPrice(val) {
  priceEles.forEach((prEle) => {
    if (toggler.classList.contains("checked")) {
      prEle.textContent = `$${(8 * val * 10).toFixed(2)}`;
    } else {
      prEle.textContent = `$${(8 * val).toFixed(2)}`;
    }

    let ele = document.createElement("span");
    let eTxt = document.createTextNode("/ month");

    ele.appendChild(eTxt);

    prEle.append(ele);
  });
}
