const mainNav = document.querySelector(".nav-bar");
const navBtns = document.querySelector(".right-side > .btns");
const navBarLis = document.querySelectorAll(".nav-bar > li");
const menu = document.getElementById("hamburger");
const closeMenu = document.getElementById("close-hamburger");

navBarLis.forEach(function (li) {
  li.addEventListener("click", (e) => {
    const allImgs = li.querySelectorAll("img");
    const inMenu = li.querySelector(".mega-menu");

    if (document.querySelector(".nav-bar li.active")) {
      document.querySelector(".nav-bar li.active").classList.remove("active");
    }
    li.classList.add("active");

    allImgs.forEach((img) => {
      let currentImg;

      if (getComputedStyle(img).getPropertyValue("display") === "block") {
        currentImg = img;

        if (img.hasAttribute("up")) {
          replaceAttr(img, "up", "down");

          replaceAttr(inMenu, "aria-hidden", "aria-hidden", "true");

          li.classList.remove("active");
        } else {
          document.querySelectorAll(".arrow").forEach((arr) => {
            replaceAttr(arr, "up", "down");
          });

          replaceAttr(img, "down", "up");

          document.querySelectorAll(".mega-menu").forEach((mn) => {
            replaceAttr(mn, "aria-hidden", "aria-hidden", "true");
          });

          replaceAttr(inMenu, "aria-hidden", "aria-hidden", "false");
        }
      }
    });
  });
});

menu.onclick = function () {
  this.style.display = "none";
  closeMenu.style.display = "block";

  document.body.style.overflowY = "hidden";

  replaceAttr(mainNav, "aria-hidden", "aria-hidden", "false");
  replaceAttr(navBtns, "aria-hidden", "aria-hidden", "false");
};

closeMenu.onclick = function () {
  this.style.display = "none";
  menu.style.display = "block";

  document.body.style.overflow = "visible";

  replaceAttr(mainNav, "aria-hidden", "aria-hidden", "true");
  replaceAttr(navBtns, "aria-hidden", "aria-hidden", "true");
};

function replaceAttr(ele, frsAttr, sndAttr, attrValue) {
  ele.removeAttribute(frsAttr);
  attrValue
    ? ele.setAttribute(sndAttr, attrValue)
    : ele.setAttribute(sndAttr, "");
}
