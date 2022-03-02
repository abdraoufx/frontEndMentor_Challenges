const thTogl = document.getElementById("toggler");

if (localStorage.getItem("mode") === "white") {
  thTogl.classList.replace("left", "right");
  document.querySelectorAll(".dark").forEach((d) => {
    d.classList.replace("dark", "white");
  });
} else {
  thTogl.classList.replace("right", "left");
  document.querySelectorAll(".white").forEach((w) => {
    w.classList.replace("white", "dark");
  });
}

thTogl.onclick = () => {
  if (thTogl.classList.contains("left")) {
    thTogl.classList.replace("left", "right");
    document.querySelectorAll(".dark").forEach((d) => {
      d.classList.replace("dark", "white");
    });
    localStorage.setItem("mode", "white");
  } else {
    thTogl.classList.replace("right", "left");
    document.querySelectorAll(".white").forEach((w) => {
      w.classList.replace("white", "dark");
    });
    localStorage.setItem("mode", "dark");
  }
};
