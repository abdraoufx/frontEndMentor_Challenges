const api = "https://api.adviceslip.com/advice";
const advID = document.querySelector(".advice-id > .number");
const quote = document.querySelector(".quote");
const cBtn = document.querySelector(".change");

window.onload = function () {
  fetch(api)
    .then(function (el) {
      return el.json();
    })
    .then(function (data) {
      advID.innerHTML = `${data.slip.id}`;
      quote.innerHTML = `${data.slip.advice}`;
    });
};
cBtn.onclick = () => {
  fetch(api)
    .then(function (el) {
      return el.json();
    })
    .then(function (data) {
      advID.innerHTML = `${data.slip.id}`;
      quote.innerHTML = `${data.slip.advice}`;
    });
};
