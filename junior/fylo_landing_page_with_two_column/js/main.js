const allEmInputs = document.querySelectorAll(".email-input");

allEmInputs.forEach((emIn) => {
  let submitBtn = emIn.parentElement.nextElementSibling;

  submitBtn.onclick = () => {
    checkEmail(emIn);
  };

  emIn.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      checkEmail(emIn);
    }
  });
});

function checkEmail(input) {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  input.value.match(pattern)
    ? input.classList.replace("error", "valid") || input.classList.add("valid")
    : input.classList.replace("valid", "error") || input.classList.add("error");
}
