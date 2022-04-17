const lisHasMenu = document.querySelectorAll(".has-menu");
const hamburgerIcon = document.getElementById("hamb");
const closeHamburger = document.getElementById("close-hamb");
const navBar = document.querySelector(".nav-bar");

lisHasMenu.forEach((li) => {
  li.onclick = function () {
    let inMenu = this.lastElementChild; // Inside Menu
    let inArrow = this.firstElementChild.firstElementChild; // Arrow Image

    if (inMenu.hasAttribute("hidden")) {
      replaceAttr(inMenu, "hidden", "visible");
      replaceAttr(inArrow, "arrow-down", "arrow-up");
    } else {
      replaceAttr(inMenu, "visible", "hidden");
      replaceAttr(inArrow, "arrow-up", "arrow-down");
    }
  };
});

hamburgerIcon.onclick = function () {
  this.style.display = "none";
  closeHamburger.style.display = "block";

  replaceAttr(navBar, "hidden", "visible");

  document.querySelector(".main-wrapper").classList.add("use-overlay");
};
closeHamburger.onclick = function () {
  this.style.display = "none";
  hamburgerIcon.style.display = "block";

  replaceAttr(navBar, "visible", "hidden");

  document.querySelector(".main-wrapper").classList.remove("use-overlay");
};

function replaceAttr(ele, attrOne, attrTwo) {
  ele.removeAttribute(attrOne);
  ele.setAttribute(attrTwo, "");
}
