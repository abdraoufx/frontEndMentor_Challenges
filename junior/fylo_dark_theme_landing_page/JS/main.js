const submitBtn = document.getElementById("su-email");
const emInput = document.getElementById("email");
const errorMsg = document.getElementById("msg-error");
const emailPtn = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

submitBtn.onclick = function () {
  validateEmail(emInput.value);
};

function validateEmail(eAddr) {
  if (eAddr.match(emailPtn)) {
    errorMsg.style.display = "none";
  } else {
    errorMsg.style.display = "block";
  }
}
