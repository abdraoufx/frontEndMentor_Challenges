const charts = document.querySelectorAll(".chart"),
  filePath = "https://abdraoufx.github.io/frontEndMentor_Challenges/junior/expenses_chart_component/data/data.json",
  spendedDays = document.querySelector(".num-D"),
  totalMonth = document.querySelector(".details .total"),
  balance = document.querySelector(".balance-txt");

setTimeout(handleApp, 420);

// Functions :
function handleApp() {
  fetch(filePath)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (dataArray) {
      spendedDays.textContent = `${dataArray.length}`;

      someAmounts(totalMonth, dataArray);
      chartsHandler(charts, dataArray);
    });
}

function chartsHandler(chartsSlc, array) {
  for (let i = 0; i < array.length; i++) {
    chartsSlc.forEach(function (chart) {
      chart.style.height = `${(array[i].amount * 2.5) / 16}rem`;

      chart.nextSibling.textContent = array[i].day;

      chart.querySelector(
        ".chart__price .number"
      ).textContent = `$${array[i].amount}`;

      array.splice(i, 1);
    });
  }
}

function someAmounts(array) {
  let number = 0;

  for (let i = 0; i < array.length; i++) {
    number += array[i].amount * 2;
  }

  animateNumber(balance, 921, `$921.48`);
  animateNumber(totalMonth, 478, `$478.33`);
}

function animateNumber(ele, maxNum, target) {
  let counter = setInterval(() => {
    if (ele.textContent == maxNum) {
      ele.textContent = target;
      clearInterval(counter);
    } else {
      ele.textContent++;
    }
  }, 1);
}
