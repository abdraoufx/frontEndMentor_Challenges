const hamburger = document.getElementById("hamb-icon");
const closeHamb = document.getElementById("close-hamb");
const mobileNav = document.querySelector(".primary-nav");

hamburger.onclick = function () {
  if (mobileNav.hasAttribute("hidden")) {
    mobileNav.removeAttribute("hidden");
    mobileNav.setAttribute("show", "");
  }

  this.style.display = "none";
  closeHamb.style.display = "block";

  document.body.style.overflow = "hidden";
};

closeHamb.onclick = function () {
  if (mobileNav.hasAttribute("show")) {
    mobileNav.removeAttribute("show");
    mobileNav.setAttribute("hidden", "");
  }

  this.style.display = "none";
  hamburger.style.display = "block";

  document.body.style.overflow = "visible";
};
