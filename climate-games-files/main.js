document.addEventListener("DOMContentLoaded", function () {
  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");
  const menuBtn = document.querySelector(".menu-btn");
  const navbarOverlay = document.querySelector(".navbar-overlay");

  function toggleNavbar() {
    document.body.classList.toggle("navbar-open");
  }
  menuBtn.addEventListener("click", toggleNavbar);
  navbarOverlay.addEventListener("click", toggleNavbar);

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

  const startScreen = document.getElementById("game-start-screen");
  const mainScreen = document.getElementById("game-main-screen");
  const endScreen = document.getElementById("game-end-screen");

  const startGameBtn = document.getElementById("start-game-btn");
  const playAgainBtn = document.getElementById("play-again-btn");
  const nextTurnBtn = document.getElementById("next-turn-btn");

  const yearStat = document.getElementById("year-stat");
  const budgetStat = document.getElementById("budget-stat");
  const happinessStat = document.getElementById("happiness-stat");
  const resilienceStat = document.getElementById("resilience-stat");

  const scenarioText = document.getElementById("scenario-text");
  const gameOptions = document.getElementById("game-options");
  const decisionResult = document.getElementById("decision-result");

  const endTitle = document.getElementById("end-title");
  const endMessage = document.getElementById("end-message");

  let gameState;

  const scenarios = [
    {
      year: 1,
      text: "A prolonged drought is devastating farms. Your people are facing food shortages.",
      options: [
        {
          text: "Import food aid (-$20M)",
          effects: { budget: -20, happiness: 10, resilience: 0 },
          resultText:
            "The food aid provides immediate relief, boosting public morale.",
        },
        {
          text: "Invest in irrigation (-$15M)",
          effects: { budget: -15, happiness: -5, resilience: 10 },
          resultText:
            "A costly but crucial investment. Farmers are upset now, but this will help in the future.",
        },
      ],
    },
    {
      year: 2,
      text: "International investors offer to build a large coal power plant, promising jobs and cheap energy.",
      options: [
        {
          text: "Accept the deal (+$10M)",
          effects: { budget: 10, happiness: 5, resilience: -15 },
          resultText:
            "The economy gets a short-term boost, but your nation's carbon footprint and pollution levels increase.",
        },
        {
          text: "Decline and fund a solar farm (-$25M)",
          effects: { budget: -25, happiness: 0, resilience: 15 },
          resultText:
            "A very expensive choice, but it's a major step towards sustainable energy and long-term resilience.",
        },
      ],
    },
    {
      year: 3,
      text: "A super typhoon is forecast to hit your largest coastal city.",
      options: [
        {
          text: "Invest in early warning systems & shelters (-$15M)",
          effects: { budget: -15, happiness: 5, resilience: 10 },
          resultText:
            "The investment saves lives and infrastructure, improving public trust and your city's preparedness.",
        },
        {
          text: "Focus on post-storm cleanup (-$10M)",
          effects: { budget: -10, happiness: -10, resilience: -10 },
          resultText:
            "You save some money upfront, but the storm causes significant damage and loss of life, angering the public.",
        },
      ],
    },
    {
      year: 4,
      text: "Global sea levels are rising, causing regular flooding in a low-income coastal community.",
      options: [
        {
          text: "Build a large sea wall to protect the area (-$30M)",
          effects: { budget: -30, happiness: 5, resilience: 15 },
          resultText:
            "It's a huge expense, but the community is now protected for decades to come.",
        },
        {
          text: "Relocate the community inland (-$15M)",
          effects: { budget: -15, happiness: -15, resilience: 5 },
          resultText:
            "It's cheaper, but people are devastated to leave their ancestral homes. Social cohesion suffers.",
        },
      ],
    },
    {
      year: 5,
      text: "An international climate summit is happening. You have a chance to speak.",
      options: [
        {
          text: "Demand 'Loss & Damage' funds from wealthy nations.",
          effects: {
            budget: Math.random() > 0.5 ? 25 : 0,
            happiness: 10,
            resilience: 5,
          },
          resultText:
            "Your powerful speech resonates! Wealthy nations agree to provide financial aid. (Or... Your plea falls on deaf ears this time.)",
        },
        {
          text: "Pledge to be self-sufficient and focus on local solutions.",
          effects: { budget: 0, happiness: -5, resilience: 10 },
          resultText:
            "The international community praises your resolve, but your people feel abandoned and worry about the future.",
        },
      ],
    },
  ];

  function startGame() {
    gameState = { year: 1, budget: 100, happiness: 70, resilience: 50 };
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    mainScreen.style.display = "block";
    loadScenario();
  }

  function updateStatusBar() {
    yearStat.textContent = `${gameState.year}/5`;
    budgetStat.textContent = `$${gameState.budget}M`;
    happinessStat.textContent = `${gameState.happiness}%`;
    resilienceStat.textContent = `${gameState.resilience}%`;
  }

  function loadScenario() {
    const currentScenario = scenarios.find((s) => s.year === gameState.year);
    scenarioText.textContent = currentScenario.text;
    gameOptions.innerHTML = "";
    currentScenario.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("option-btn");
      button.textContent = option.text;
      button.onclick = () => handleDecision(option);
      gameOptions.appendChild(button);
    });
    decisionResult.textContent = "";
    nextTurnBtn.style.display = "none";
    updateStatusBar();
  }

  function handleDecision(option) {
    gameState.budget += option.effects.budget;
    gameState.happiness = Math.max(
      0,
      Math.min(100, gameState.happiness + option.effects.happiness)
    );
    gameState.resilience = Math.max(
      0,
      Math.min(100, gameState.resilience + option.effects.resilience)
    );

    decisionResult.textContent = option.resultText;
    gameOptions
      .querySelectorAll(".option-btn")
      .forEach((btn) => (btn.disabled = true));
    nextTurnBtn.style.display = "block";
    updateStatusBar();

    if (gameState.budget <= 0 || gameState.happiness <= 0) {
      nextTurnBtn.onclick = () => endGame(false);
    } else if (gameState.year === 5) {
      nextTurnBtn.onclick = () => endGame(true);
    } else {
      nextTurnBtn.onclick = () => {
        gameState.year++;
        loadScenario();
      };
    }
  }

  function endGame(isWin) {
    mainScreen.style.display = "none";
    endScreen.style.display = "block";

    if (isWin) {
      endTitle.textContent = "Challenge Complete!";
      endMessage.textContent = `Congratulations! You led your nation through 5 difficult years. With a final budget of $${gameState.budget}M, ${gameState.happiness}% happiness, and ${gameState.resilience}% resilience, you have built a more sustainable future.`;
    } else {
      endTitle.textContent = "Challenge Failed";
      if (gameState.budget <= 0) {
        endMessage.textContent =
          "Your nation has declared bankruptcy. The economic crisis has derailed all climate initiatives. Better luck next time.";
      } else {
        endMessage.textContent =
          "Your people's happiness has fallen to zero. Widespread protests and social unrest have forced you to step down. Better luck next time.";
      }
    }
  }

  startGameBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", startGame);
});
