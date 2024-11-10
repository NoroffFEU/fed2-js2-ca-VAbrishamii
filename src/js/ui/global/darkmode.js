// export function toggleDarkMode() {
//     const isDarkMode = document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", isDarkMode ? "dark" : "light");

   
//   }

  
//   export function initializeDarkMode() {
//     if (
//       localStorage.getItem("theme") === "dark" ||
//       (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
//     ) {
//       document.documentElement.classList.add("dark");
//     }

// }
export function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Update toggle link text based on the new mode
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

    // Set initial toggle link text based on current mode
    const darkModeToggleLink = document.getElementById("darkModeToggleLink");
    if (darkModeToggleLink) {
        darkModeToggleLink.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
    }
}
