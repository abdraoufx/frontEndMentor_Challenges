const dataApi = "http://127.0.0.1:5500/data.json";
const title = document.querySelectorAll(".key");
const filters = document.querySelectorAll(
  ".container .boxes .profile .body ul.filter li"
);
const stats = document.querySelectorAll(".stats");
const info = document.querySelectorAll(".info");

// Check For Items In Local Storage
if (localStorage.getItem(`selectedLi`)) {
  document
    .querySelector(
      ".container .boxes .profile .body ul.filter li[class='selected']"
    )
    .classList.remove(`selected`);
  filters.forEach(function (l) {
    if (l.textContent == localStorage.getItem(`selectedLi`)) {
      l.classList.add("selected");
    } else {
      // Do not do anything
    }
  });
}
// Fetch Data From JSON File
fetch(dataApi)
  .then(function (l) {
    return l.json();
  })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      title.forEach(function (t) {
        t.textContent = data[i].title;
        data.splice(i, 1);
      });
    }
  });
fetch(dataApi)
  .then(function (l) {
    return l.json();
  })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      stats.forEach(function (s) {
        if (
          document.querySelector(
            ".container .boxes .profile .body ul.filter li[class='selected']"
          ).textContent == "Daily"
        ) {
          s.textContent = `${data[i].timeframes.daily.current}hrs`;
        } else if (
          document.querySelector(
            ".container .boxes .profile .body ul.filter li[class='selected']"
          ).textContent == "Weekly"
        ) {
          s.textContent = `${data[i].timeframes.weekly.current}hrs`;
        } else {
          s.textContent = `${data[i].timeframes.monthly.current}hrs`;
        }
        data.splice(i, 1);
      });
    }
  });
fetch(dataApi)
  .then(function (l) {
    return l.json();
  })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      info.forEach(function (inf) {
        if (
          document.querySelector(
            ".container .boxes .profile .body ul.filter li[class='selected']"
          ).textContent == "Daily"
        ) {
          inf.innerHTML = `Today - ${data[i].timeframes.daily.previous}hrs`;
        } else if (
          document.querySelector(
            ".container .boxes .profile .body ul.filter li[class='selected']"
          ).textContent == "Weekly"
        ) {
          inf.innerHTML = `Last Week - ${data[i].timeframes.weekly.previous}hrs`;
        } else if (
          document.querySelector(
            ".container .boxes .profile .body ul.filter li[class='selected']"
          ).textContent == "Monthly"
        ) {
          inf.innerHTML = `Last Month - ${data[i].timeframes.monthly.previous}hrs`;
        }
        data.splice(i, 1);
      });
    }
  });

// Filter The Results
filters.forEach(function (f) {
  f.addEventListener("click", function (e) {
    // The Selector to select li that has class `selected`.
    document
      .querySelector(
        ".container .boxes .profile .body ul.filter li[class='selected']"
      )
      .classList.remove("selected");
    e.target.classList.add("selected");
    // Add Items To Local Storage
    localStorage.setItem(
      "selectedLi",
      `${
        document.querySelector(
          ".container .boxes .profile .body ul.filter li[class='selected']"
        ).textContent
      }`
    );
    fetch(dataApi)
      .then(function (l) {
        return l.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          info.forEach(function (inf) {
            if (
              document.querySelector(
                ".container .boxes .profile .body ul.filter li[class='selected']"
              ).textContent == "Daily"
            ) {
              inf.innerHTML = `Today - ${data[i].timeframes.daily.previous}hrs`;
            } else if (
              document.querySelector(
                ".container .boxes .profile .body ul.filter li[class='selected']"
              ).textContent == "Weekly"
            ) {
              inf.innerHTML = `Last Week - ${data[i].timeframes.weekly.previous}hrs`;
            } else {
              inf.innerHTML = `Last Month - ${data[i].timeframes.monthly.previous}hrs`;
            }
            data.splice(i, 1);
          });
        }
      });
    fetch(dataApi)
      .then(function (l) {
        return l.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          stats.forEach(function (s) {
            if (
              document.querySelector(
                ".container .boxes .profile .body ul.filter li[class='selected']"
              ).textContent == "Daily"
            ) {
              s.textContent = `${data[i].timeframes.daily.current}hrs`;
            } else if (
              document.querySelector(
                ".container .boxes .profile .body ul.filter li[class='selected']"
              ).textContent == "Weekly"
            ) {
              s.textContent = `${data[i].timeframes.weekly.current}hrs`;
            } else if (
              document.querySelector(
                ".container .boxes .profile .body ul.filter li[class='selected']"
              ).textContent == "Monthly"
            ) {
              s.textContent = `${data[i].timeframes.monthly.current}hrs`;
            }
            data.splice(i, 1);
          });
        }
      });
  });
});
