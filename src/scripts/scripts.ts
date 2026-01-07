const handleThemeChange = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
};

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
darkModeMediaQuery.addEventListener("change", handleThemeChange);

// Run on initial load and after every navigation
handleThemeChange();
document.addEventListener("astro:page-load", handleThemeChange);
