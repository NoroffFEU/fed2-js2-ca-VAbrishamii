// export function displayLoggedInUser() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user);
  
//     if (user) {
//       const userNameElement = document.querySelector(".User-name");
//       if (userNameElement) {
//         userNameElement.textContent = user.name;
//         userNameElement.href = `/profile/index.html?user=${user.name}`; 
//       }

//       const userAvatarElement = document.querySelector(".User-avatar");
//       if (userAvatarElement && user.avatar) {
//         userAvatarElement.src = user.avatar;  // Set the avatar URL
//         userAvatarElement.alt = `${user.name}'s avatar`;  // Set an alt text for accessibility
//       }
//     } else {
//       window.location.href = "/auth/login/";
//     }
//   }
  
export function displayLoggedInUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  
    if (user) {
      // Create the profile link (a tag)
      const profileLink = document.createElement("a");
      profileLink.classList.add("profile-link");
      profileLink.href = `/profile/?user=${user.name}`;
  
      // Create the profile div
      const profileDiv = document.createElement("div");
      profileDiv.classList.add("profile");
  
      // Create and set the avatar image
      const userAvatarElement = document.createElement("img");
      userAvatarElement.classList.add("User-avatar");
      if (user.avatar) {
        userAvatarElement.src = user.avatar.url;  
        userAvatarElement.alt = `${user.name}'s avatar`;
  
      // Create and set the username element
      const userNameElement = document.createElement("span");
      userNameElement.classList.add("User-name");
      userNameElement.textContent = user.name;
  
      // Append avatar and username to the profile div
      profileDiv.appendChild(userAvatarElement);
      profileDiv.appendChild(userNameElement);
  
      // Append the profile div to the profile link (a tag)
      profileLink.appendChild(profileDiv);
  
      // Append the profile link to a specific container in the page
      const container = document.querySelector(".profile-container"); // Ensure you have a container element for this
      if (container) {
        container.appendChild(profileLink);
      }
  
    } else {
      window.location.href = "/auth/login/";
    }
  }
}