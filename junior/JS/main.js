const hamMenu = document.getElementById("menu");
const uls = document.querySelector(".links");

hamMenu.onclick = () => {
  if (hamMenu.classList.contains("clicked")) {
    hamMenu.classList.remove("clicked");
    uls.classList.remove("mobile");
  } else {
    hamMenu.classList.add("clicked");
    uls.classList.add("mobile");
  }
};
