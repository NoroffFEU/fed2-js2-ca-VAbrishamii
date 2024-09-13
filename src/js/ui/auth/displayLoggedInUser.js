 
export function displayLoggedInUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  
    if (user) {

      const profileLink = document.createElement("a");
      profileLink.classList.add("profile-link");
      profileLink.href = `/profile/?user=${user.name}`;

      const profileDiv = document.createElement("div");
      profileDiv.classList.add("profile");
  
      const userAvatarElement = document.createElement("img");
      userAvatarElement.classList.add("User-avatar");
      if (user.avatar) {
        userAvatarElement.src = user.avatar.url;  
        userAvatarElement.alt = `${user.name}'s avatar`;
  
      const userNameElement = document.createElement("span");
      userNameElement.classList.add("User-name");
      userNameElement.textContent = user.name;
 
      profileDiv.appendChild(userAvatarElement);
      profileDiv.appendChild(userNameElement);
  
      profileLink.appendChild(profileDiv);
  
      const container = document.querySelector(".profile-container"); 
      if (container) {
        container.appendChild(profileLink);
      }
  
    } else {
      window.location.href = "/auth/login/";
    }
  }
}