document.addEventListener("DOMContentLoaded", function () {
  const pageData = {
    home: {
      mainContent: `
                    <h1>Test for now.</h1>
                    
                `,
      sidebarContent: `
                    <h1>Test for now.</h1>
                `,
    },
    articles: {
      mainContent: `
                    <h1>Test for now.</h1>
                `,
      sidebarContent: `                    <h1>Test for now.</h1>`,
    },
    advertisement: {
      mainContent: `                    <h1>Test for now.</h1>`,
      sidebarContent: `                    <h1>Test for now.</h1>`,
    },
    timeline: {
      mainContent: `                    <h1>Test for now.</h1>`,
      sidebarContent: `
                                        <h1>Test for now.</h1>
                `,
    },
    glossary: {
      mainContent: `                    <h1>Test for now.</h1>
                `,
      sidebarContent: `
                                        <h1>Test for now.</h1>
                `,
    },
    about: {
      mainContent: `<h1>NEXUS BSIT 2-7</h1>
                    <p>Will add more features soon! - dev ctorw</p>
                `,
      sidebarContent: `                    <h1>Test for now.</h1>`,
    },
  };

  const contentContainer = document.getElementById("content-container");
  const sidebarContainer = document.getElementById("sidebar-container");
  const navLinks = document.querySelectorAll(".nav-link");
  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");
  const searchBtn = document.getElementById("search-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const closeSearchBtn = document.getElementById("close-search-btn");
  const contentCard = document.getElementById("content-card");

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

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("visible");
    searchInput.focus();
  });
  function closeSearch() {
    searchOverlay.classList.remove("visible");
  }
  closeSearchBtn.addEventListener("click", closeSearch);
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("visible"))
      closeSearch();
  });

  function createRipple(event) {
    const element = event.currentTarget;
    const existingRipple = element.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    circle.style.cssText = `width: ${diameter}px; height: ${diameter}px; left: ${
      event.clientX - element.getBoundingClientRect().left - radius
    }px; top: ${
      event.clientY - element.getBoundingClientRect().top - radius
    }px;`;
    circle.classList.add("ripple");
    element.appendChild(circle);
  }

  function updatePage(pageId) {
    const data = pageData[pageId] || pageData["home"];

    contentContainer.style.opacity = 0;
    sidebarContainer.style.opacity = 0;

    contentCard.scrollTop = 0;

    setTimeout(() => {
      contentContainer.innerHTML = data.mainContent;
      sidebarContainer.innerHTML = data.sidebarContent;
      contentContainer.style.opacity = 1;
      sidebarContainer.style.opacity = 1;
    }, 150);

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.id === `nav-${pageId}`);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const pageId = this.id.replace("nav-", "");
      history.pushState(null, "", `#${pageId}`);
      updatePage(pageId);
    });
  });

  document
    .querySelectorAll(".nav-link, .icon-btn")
    .forEach((el) => el.addEventListener("click", createRipple));

  const initialPageId = window.location.hash.substring(1) || "home";
  updatePage(initialPageId);
});
