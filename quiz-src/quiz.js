document.addEventListener("DOMContentLoaded", function () {
  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");
  const quizForm = document.getElementById("quiz-form");
  const quizResults = document.getElementById("quiz-results");
  const submitBtn = document.getElementById("submit-quiz");
  const menuBtn = document.querySelector(".menu-btn");
  const navbarOverlay = document.querySelector(".navbar-overlay");
  const backButton = document.querySelector(".back-button");

  function toggleNavbar() {
    document.body.classList.toggle("navbar-open");
  }

  menuBtn.addEventListener("click", toggleNavbar);
  navbarOverlay.addEventListener("click", toggleNavbar);

  if (backButton) {
    backButton.addEventListener("click", function () {
      if (document.body.classList.contains("navbar-open")) {
        toggleNavbar();
      }
    });
  }

  function applyTheme(theme) {
    darkThemeBtn.classList.toggle("active", theme === "dark");
    lightThemeBtn.classList.toggle("active", theme !== "dark");
    document.body.classList.toggle("dark-theme", theme === "dark");
  }

  function applyThemeAndSave(theme) {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }

  lightThemeBtn.addEventListener("click", () => applyThemeAndSave("light"));
  darkThemeBtn.addEventListener("click", () => applyThemeAndSave("dark"));
  applyTheme(localStorage.getItem("theme") || "light");

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let score = 0;
    const totalQuestions = 7;
    const answers = {
      q1: "d",
      q2: "b",
      q3: "c",
      q4: "b",
      q5: "c",
      q6: "c",
      q7: "d",
    };

    const formData = new FormData(quizForm);
    for (let [name, value] of formData.entries()) {
      if (answers[name] === value) {
        score++;
      }
    }

    let resultMessage = "";
    if (score <= 2) {
      resultMessage =
        "There's more to learn! Try reading through the articles again to explore these topics.";
    } else if (score <= 5) {
      resultMessage =
        "Great job! You have a solid understanding of the key issues.";
    } else {
      resultMessage =
        "Excellent! You have a strong grasp of the social and environmental dimensions of climate change.";
    }

    quizResults.innerHTML = `<h2>You scored ${score} out of ${totalQuestions}!</h2><p>${resultMessage}</p>`;
    quizResults.style.display = "block";
    submitBtn.style.display = "none";
  });
});
