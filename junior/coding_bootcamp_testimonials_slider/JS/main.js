const tanya = {
    testim: `“ I’ve been interested in coding for a while but never taken the
    jump, until now. I couldn’t recommend this course enough. I’m now in
    the job of my dreams and so excited about the future. ”`,
    theName: "Tanya Sinclair",
    job: "UX Engineer",
  },
  john = {
    testim: `“ If you want to lay the best foundation possible I’d recommend taking this course. 
    The depth the instructors go into is incredible. I now feel so confident about 
    starting up as a professional developer. ”`,
    theName: "John Tarkpor",
    job: "Junior Front-end Developer",
  };

const prevBtn = document.getElementById("previous-btn"),
  nextBtn = document.getElementById("next-btn"),
  tanyaImg = document.querySelector(".tanya-img"),
  johnImg = document.querySelector(".john-img"),
  testimEle = document.querySelector(".testim"),
  nameEle = document.querySelector(".info .name"),
  jobEle = document.querySelector(".info .job");

let showedImg = document.querySelector("img.show");

prevBtn.addEventListener("click", function () {
  changeFlow(tanya, johnImg, tanyaImg);
});

nextBtn.addEventListener("click", function () {
  changeFlow(john, tanyaImg, johnImg);
});

function changeFlow(obj, imgOne, imgTwo) {
  imgOne.classList.remove("show");
  imgTwo.classList.add("show");

  testimEle.textContent = `${obj.testim}`;
  nameEle.textContent = `${obj.theName}`;
  jobEle.textContent = `${obj.job}`;
}
