const box = document.querySelector(".ready-box");

window.onscroll = function () {
  const bxOffset = box.offsetTop + 80;

  window.scrollY >= bxOffset
    ? box.classList.add("show")
    : box.classList.remove("show");
};
