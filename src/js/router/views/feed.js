import { onLogout } from "../../ui/auth/logout";

const logoutButton = document.querySelector(".Logout-button");
logoutButton.addEventListener("click", onLogout);


    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      const userNameElement = document.querySelector(".User-name");
      if (userNameElement) {
        userNameElement.textContent = user.name;
      }
    } else {
      window.location.href = "/auth/login/";
    }


  
