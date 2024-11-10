
export function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const darkModeToggleLink = document.getElementById("darkModeToggleLink");
    if (darkModeToggleLink) {
        darkModeToggleLink.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    }
}

export function initializeDarkMode() {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }

    const darkModeToggleLink = document.getElementById("darkModeToggleLink");
    if (darkModeToggleLink) {
        darkModeToggleLink.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
    }
}
