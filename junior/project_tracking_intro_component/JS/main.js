const hamb = document.querySelector("header .container .hamb");
const clHamb = document.querySelector("header .container .close");
const menu = document.querySelector("header .container nav ul.links");

hamb.onclick = function () {
  this.style.display = "none";
  clHamb.style.display = "block";
  menu.classList.toggle("menu");
};
clHamb.onclick = function () {
  this.style.display = "none";
  hamb.style.display = "block";
  menu.classList.toggle("menu");
};
