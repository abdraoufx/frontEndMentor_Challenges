const emailInput = document.getElementById("email");
const subBtn = document.getElementById("sub");

let emPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

subBtn.onclick = () => {
  if (emailInput.value.match(emPattern)) {
    document.querySelector(".__error-msg").classList.remove("show");
    emailInput.classList.remove("error");
  } else {
    document.querySelector(".__error-msg").classList.add("show");
    emailInput.classList.add("error");
  }
};
