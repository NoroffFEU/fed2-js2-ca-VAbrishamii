export function onLogout(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out.");
    window.location.href = "/auth/login/";
}
