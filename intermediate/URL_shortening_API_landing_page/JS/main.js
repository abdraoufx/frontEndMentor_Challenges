const hambIcon = document.getElementById("hamb-icon"),
  mobNav = document.getElementById("mobile-nav"),
  subBtn = document.getElementById("sb-data"),
  theInput = document.getElementById("short-input"),
  urlPattern = /^(|http|https):\/\/[^ "]+$/g,
  btnsContainer = document.querySelector(".short-result");

let allData;

if (localStorage.getItem("shortedData")) {
  allData = JSON.parse(localStorage.getItem("shortedData"));

  for (let i = 0; i < allData.length; i++) {
    handleLocalS(allData[i].mainUrl, allData[i].shortedUrl);
  }
} else {
  allData = [];
}

hambIcon.onclick = function () {
  this.classList.toggle("close");
  mobNav.classList.toggle("show-nav");
};

theInput.onkeyup = (ev) => {
  if (ev.key === "Enter") {
    if (!theInput.value.match(urlPattern) || theInput.value === "") {
      theInput.parentElement.classList.add("not-valid-val");
    } else {
      theInput.parentElement.classList.remove("not-valid-val");
      createElements(theInput);
    }
  }
};

subBtn.onclick = () => {
  if (!theInput.value.match(urlPattern) || theInput.value === "") {
    theInput.parentElement.classList.add("not-valid-val");
  } else {
    theInput.parentElement.classList.remove("not-valid-val");
    createElements(theInput);
  }
};

btnsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    e.target.classList.add("copied");
    e.target.textContent = "Copied!";

    let copiedText = e.target.previousElementSibling.textContent;
    copyTxt(copiedText);
  }
});

// Functions To Use :
function createElements(inputEle) {
  const mainBox = document.createElement("div");
  mainBox.className = "box";

  const theUrl = document.createElement("span");
  theUrl.className = "box__url";

  const rightSide = document.createElement("div");
  rightSide.className = "box__right-side";

  const shortedUrl = document.createElement("span");
  shortedUrl.className = "shorted-url";

  const theBtn = document.createElement("button");
  theBtn.classList.add("copy", "cyan-btn");
  theBtn.textContent = "Copy";

  rightSide.append(shortedUrl, theBtn);

  mainBox.append(theUrl, rightSide);

  document.querySelector(".short-result").append(mainBox);

  handleData(theUrl, shortedUrl, inputEle);
}

function handleData(urlEle, shortEle, inputEle) {
  urlEle.textContent = inputEle.value;

  fetch(`https://api.shrtco.de/v2/shorten?url=${inputEle.value}`)
    .then((resValue) => {
      return resValue.json();
    })
    .then((resValue) => {
      shortEle.textContent = resValue.result.full_short_link3;

      const theData = {
        mainUrl: inputEle.value,
        shortedUrl: resValue.result.full_short_link3,
      };

      allData.push(theData);

      localStorage.setItem("shortedData", JSON.stringify(allData));
    });
}

function handleLocalS(titleValue, urlValue) {
  const mainBox = document.createElement("div");
  mainBox.className = "box";

  const theUrl = document.createElement("span");
  theUrl.className = "box__url";

  const rightSide = document.createElement("div");
  rightSide.className = "box__right-side";

  const shortedUrl = document.createElement("span");
  shortedUrl.className = "shorted-url";

  const theBtn = document.createElement("button");
  theBtn.classList.add("copy", "cyan-btn");
  theBtn.textContent = "Copy";

  theUrl.textContent = `${titleValue}`;
  shortedUrl.textContent = `${urlValue}`;

  rightSide.append(shortedUrl, theBtn);

  mainBox.append(theUrl, rightSide);

  document.querySelector(".short-result").append(mainBox);
}

async function copyTxt(text) {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    alert(error);
  }
}
