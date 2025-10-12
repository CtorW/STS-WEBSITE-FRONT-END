document.addEventListener("DOMContentLoaded", function () {
  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");
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
});
