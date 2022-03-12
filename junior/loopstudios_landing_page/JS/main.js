const hambMenu = document.getElementById("open");
const closeMenu = document.getElementById("close");
const menu = document.querySelector(".one");
const cont = document.querySelector(".two");
const links = document.querySelectorAll(".links li a");
const seeBtn = document.querySelector(".see-all")

hambMenu.onclick = () => {
  if (hambMenu.classList.contains("unclicked")) {
    hambMenu.classList.replace("unclicked", "clicked");
    closeMenu.style.display = "block";
    menu.classList.add("menu");
    cont.style.display = "none";
    links.forEach(function (a) {
      a.onclick = () => {
        closeMenu.style.display = "none";
        menu.classList.remove("menu");
        hambMenu.classList.replace("clicked", "unclicked");
      };
    });
  }
  closeMenu.addEventListener("click", () => {
    hambMenu.classList.replace("clicked", "unclicked");
    closeMenu.style.display = "none";
    menu.classList.remove("menu");
    cont.style.display = "block";
  });
};
