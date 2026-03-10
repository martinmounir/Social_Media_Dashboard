const darkTheme = {
  "--background": "hsl(230, 17%, 14%)",
  "--text-color": "hsl(0, 0%, 100%)",
  "--text-color2": "hsl(228, 34%, 66%)",
  "--card-bg": "hsl(228, 28%, 20%)",
  "--card-hover": "hsl(228, 25%, 27%)",
  "--toggle": "hsl(230, 19%, 60%)",
  "--toggle-bg": "hsl(210, 78%, 56%)",
  "--toggle-button": "hsl(228, 46%, 96%)",
};

const lightTheme = {
  "--background": "hsl(0, 0%, 100%)",
  "--text-color": "hsl(230, 17%, 14%)",
  "--text-color2": "hsl(230, 12%, 44%)",
  "--card-bg": "hsl(227, 47%, 96%)",
  "--card-hover": "hsl(228, 33%, 91%)",
  "--toggle": "hsl(230, 19%, 60%)",
  "--toggle-bg": "hsl(230, 22%, 74%)",
  "--toggle-button": "hsl(228, 46%, 96%)",
};

function setTheme(theme) {
  const themeData = theme === "dark" ? darkTheme : lightTheme;
  const root = document.documentElement;

  for (const [key, value] of Object.entries(themeData)) {
    root.style.setProperty(key, value);
  }

  // Move toggle button based on selection
  const toggleButton = document.querySelector(".toggle__button");
  const toggleWrapper = document.querySelector(".toggle__wrapper");

  if (theme === "dark") {
    toggleButton.style.transform = "translateX(0)";
  } else if (theme === "light") {
    toggleButton.style.transform = "translateX(100%)";
  } else {
    // System - default to dark position
    toggleButton.style.transform = "translateX(0)";
  }

  // Save preference to localStorage
  localStorage.setItem("theme", theme);
}

// Get radio inputs
const darkRadio = document.getElementById("dark");
const systemRadio = document.getElementById("system");
const lightRadio = document.getElementById("light");
const toggleButton = document.querySelector(".toggle__button");

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  if (savedTheme === "dark") {
    darkRadio.checked = true;
    setTheme("dark");
  } else if (savedTheme === "light") {
    lightRadio.checked = true;
    setTheme("light");
  } else {
    // Default to dark theme
    darkRadio.checked = true;
    setTheme("dark");
  }
} else {
  // Default to dark theme
  darkRadio.checked = true;
  setTheme("dark");
}

// Add event listeners
darkRadio.addEventListener("change", () => {
  setTheme("dark");
});

systemRadio.addEventListener("change", () => {
  // For system preference, check prefers-color-scheme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
});

lightRadio.addEventListener("change", () => {
  setTheme("light");
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (systemRadio.checked) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
