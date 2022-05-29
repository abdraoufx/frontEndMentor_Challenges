const humber = document.getElementById("hamburger"),
  mobileNav = document.querySelector(".mobile-nav"),
  allCards = document.querySelectorAll(".cards .content .card"),
  fillBar = document.querySelector(".stats .stats__fill-bar .color-fill"),
  backTPElement = document.querySelector(".back-t-project"),
  backTProject = document.getElementById("bc-t-project"),
  closeTProject = document.getElementById("close-bc-t-project"),
  rewardBtns = document.querySelectorAll(".select-reward-btn"),
  continuePldBtns = document.querySelectorAll(
    ".back-t-project .modal .pay-section .btns .cyan-btn"
  ),
  thnkYouCard = document.querySelector(".card.thnk-you"),
  gotItBtn = document.querySelector(".card.thnk-you .got-it"),
  bookmarkSection = document.querySelector(".mastercraft .btns .bookmark");

if (window.localStorage.getItem("bookmarked") === "true") {
  handleBookM("images/bookmarked-icon.svg", "Bookmarked", true);
} else {
  handleBookM("images/icon-bookmark.svg", "Bookmark", false);
}

timeoutToggle(allCards, "show", 1000);
timeoutToggle(fillBar, "show", 3000);

increaseNums(document.getElementById("days-left"), 56, 30);
increaseNums(document.getElementById("backers"), 5007, 30);
increaseNums(document.getElementById("backed"), 89914, 1, true);

humber.onclick = function () {
  this.classList.toggle("close");
  mobileNav.classList.toggle("show");
};

backTProject.onclick = function () {
  backTPElement.classList.add("display");
};

closeTProject.onclick = function () {
  backTPElement.classList.remove("display");
};

document.querySelectorAll(".cards .modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    const checked = document.querySelector(".cards .modal.checked");

    if (
      this.classList.contains("out-of-stack") === false &&
      e.target.className !== "cyan-btn"
    ) {
      this.classList.contains("checked")
        ? this.classList.remove("checked")
        : this.classList.add("checked");

      checked.classList.remove("checked"); // Error Will Not Stop The Code.
    }
  });
});

rewardBtns.forEach((btn) => {
  btn.onclick = () => {
    backTPElement.classList.add("display");

    window.scrollTo({
      top: backTPElement.offsetTop - 20,
      behavior: "smooth",
    });

    if (btn.classList.contains("bamboo-stand-reward")) {
      setTimeout(() => {
        document.querySelector(".modal.bambo-stand").classList.add("checked");
      }, 30);
    } else if (btn.classList.contains("black-edition-reward")) {
      setTimeout(() => {
        document.querySelector(".modal.black-edition").classList.add("checked");
      }, 30);
    }
  };
});

continuePldBtns.forEach((btn) => {
  btn.onclick = () => {
    backTPElement.classList.remove("display");

    timeoutToggle(thnkYouCard, "display", 250);
  };
});

bookmarkSection.onclick = () => {
  handleBookM("images/icon-bookmark.svg", "Bookmark", false);

  window.localStorage.setItem("bookmarked", "false");
};

gotItBtn.onclick = () => {
  thnkYouCard.classList.remove("display");

  handleBookM("images/bookmarked-icon.svg", "Bookmarked", true);

  window.localStorage.setItem("bookmarked", "true");
};

// Functions To Use:
function timeoutToggle(ele, className, timeOut) {
  setTimeout(() => {
    if (ele instanceof NodeList) {
      ele.forEach((el) => {
        el.classList.add(`${className}`);
      });
    } else {
      ele.classList.add(`${className}`);
    }
  }, timeOut);
}

function increaseNums(ele, max, ms, hasDollar) {
  let increaser = setInterval(() => {
    if (ele.textContent == max) {
      if (hasDollar === true) {
        ele.textContent = `$${max}`;
        clearInterval(increaser);
      } else {
        clearInterval(increaser);
      }
    } else {
      ele.textContent++;
    }
  }, ms);
}

function handleBookM(imgPath, txtCont, add) {
  const bookmarkedImg = document.querySelector(".mastercraft .btns .bokm-icon");
  const bookmarkedTxt = document.querySelector(".mastercraft .btns .bk-txt");

  bookmarkedImg.removeAttribute("src");
  bookmarkedImg.setAttribute("src", imgPath);

  add === true
    ? bookmarkedTxt.classList.add("bookmarked")
    : bookmarkedTxt.classList.remove("bookmarked");

  bookmarkedTxt.textContent = `${txtCont}`;
}
