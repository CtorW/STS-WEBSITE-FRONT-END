document.addEventListener("DOMContentLoaded", function () {
  const articleDetails = {
    art1: {
      mainContent: `
                    <img src="https://placehold.co/1200x600/EADDFF/21005D?text=art1" alt="test" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 24px; margin-bottom: 24px; background-color: var(--md-sys-color-primary-container);">
                    <h1>Test for now.</h1>
                `,
    },
    art2: {
      mainContent: `
                    <img src="https://placehold.co/1200x600/E8DEF8/1D192B?text=art2" alt="test" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 24px; margin-bottom: 24px; background-color: var(--md-sys-color-secondary-container);">
                    <h1>Test for now.</h1>
                `,
    },
    art3: {
      mainContent: `
                    <img src="https://placehold.co/1200x600/FFD8E4/31111D?text=art3" alt="test" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 24px; margin-bottom: 24px; background-color: var(--md-sys-color-tertiary-container);">
                    <h1>Test for now.</h1>
                `,
    },
    art4: {
      mainContent: `
                    <img src="https://placehold.co/1200x600/D0BCFF/381E72?text=art4" alt="test" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 24px; margin-bottom: 24px; background-color: var(--md-sys-color-primary-dark);">
                    <h1>Test for now.</h1>
                `,
    },
    art5: {
      mainContent: `
                    <img src="https://placehold.co/1200x600/CCC2DC/332D41?text=art5" alt="test" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 24px; margin-bottom: 24px; background-color: var(--md-sys-color-surface-variant);">
                    <h1>Test for now.</h1>
                `,
    },
  };
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
                    <div class="article-grid">
                        <div class="article-card" data-article-id="art1">
                            <img src="https://placehold.co/600x400/EADDFF/21005D?text=art1" alt="test">
                            <div class="article-card-content">
                                <h1>Test for now.</h1>
                            </div>
                        </div>
                        <div class="article-card" data-article-id="art2">
                            <img src="https://placehold.co/600x400/E8DEF8/1D192B?text=art2" alt="Placeholder image for cheese">
                            <div class="article-card-content">
                                <h1>Test for now.</h1>
                            </div>
                        </div>
                        <div class="article-card" data-article-id="art3">
                            <img src="https://placehold.co/600x400/FFD8E4/31111D?text=art3" alt="Placeholder image for sauces">
                            <div class="article-card-content">
                                <h1>Test for now.</h1>
                            </div>
                        </div>
                        <div class="article-card" data-article-id="art4">
                            <img src="https://placehold.co/600x400/D0BCFF/381E72?text=art4" alt="Placeholder image for buns">
                            <div class="article-card-content">
                                <h1>Test for now.</h1>
                            </div>
                        </div>
                         <div class="article-card" data-article-id="art5">
                            <img src="https://placehold.co/600x400/CCC2DC/332D41?text=art5" alt="Placeholder image for toppings">
                            <div class="article-card-content">
                                <h1>Test for now.</h1>
                            </div>
                        </div>
                    </div>
                `,
      sidebarContent: `<h1>Test for now.</h1><h3 class="sidebar-heading">Articles</h3>`,
    },
    advertisement: {
      mainContent: `<h1>Test for now.</h1>
                    <p>add will deploy here!😡</p>            
      `,
      sidebarContent: `<h1>Test for now.</h1><h3 class="sidebar-heading">Advertisement</h3>`,
    },
    timeline: {
      mainContent: `<h1>Test for now.</h1>
                `,
      sidebarContent: `
                    <h1>Test for now.</h1>
                `,
    },
    glossary: {
      mainContent: `<h1>Test for now.</h1>
                `,
      sidebarContent: `
                    <h1>Test for now.</h1>
                `,
    },
    about: {
      mainContent: `<h1>My Team 2-7</h1>`,
      sidebarContent: `<p class="sidebar-title">On this page:</p><h3 class="sidebar-heading">Classmates(members)</h3>`,
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
  const articleOverlay = document.getElementById("article-overlay");
  const articleModalContent = document.getElementById("article-modal-content");
  const articleModalContentWrapper = document.getElementById(
    "article-modal-content-wrapper"
  );
  const closeArticleBtn = document.getElementById("close-article-btn");

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

  function openArticlePopup(articleId) {
    const article = articleDetails[articleId];
    if (article) {
      articleModalContent.innerHTML = article.mainContent;
      articleModalContentWrapper.scrollTop = 0;
      articleOverlay.classList.add("visible");
    }
  }
  function closeArticlePopup() {
    articleOverlay.classList.remove("visible");
  }
  contentContainer.addEventListener("click", function (e) {
    const articleCard = e.target.closest(".article-card");
    if (articleCard && articleCard.dataset.articleId) {
      openArticlePopup(articleCard.dataset.articleId);
    }
  });
  closeArticleBtn.addEventListener("click", closeArticlePopup);
  articleOverlay.addEventListener("click", (e) => {
    if (e.target === articleOverlay) closeArticlePopup();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (searchOverlay.classList.contains("visible")) closeSearch();
      if (articleOverlay.classList.contains("visible")) closeArticlePopup();
    }
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
