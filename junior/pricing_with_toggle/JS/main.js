const choose = document.getElementById("ball-cont");
const basPln = document.getElementById("basic");
const proPln = document.getElementById("pro");
const masPln = document.getElementById("master");

if (sessionStorage.getItem("plan") === "Monthly") {
  choose.classList.remove("left");
  choose.classList.add("right");
  changeTxt("$19.99", "$24.99", "$39.99");
} else {
  choose.classList.remove("right");
  choose.classList.add("left");
  changeTxt("$199.99", "$249.99", "$399.99");
}

choose.onclick = () => {
  if (choose.classList.contains("left")) {
    choose.classList.remove("left");
    choose.classList.add("right");
    changeTxt("$19.99", "$24.99", "$39.99");
    sessionStorage.setItem("plan", "Monthly");
  } else {
    choose.classList.remove("right");
    choose.classList.add("left");
    changeTxt("$199.99", "$249.99", "$399.99");
    sessionStorage.setItem("plan", "Annualy");
  }
};

function changeTxt(bas, pro, mas) {
  basPln.innerText = bas;
  proPln.innerText = pro;
  masPln.innerText = mas;
}
