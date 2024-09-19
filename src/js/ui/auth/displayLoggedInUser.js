 
// export function displayLoggedInUser() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user);
  
//     if (user) {

//       const profileLink = document.createElement("a");
//       profileLink.classList.add("profile-link");
//       profileLink.href = `/profile/?user=${user.name}`;

//       const profileDiv = document.createElement("div");
//       profileDiv.classList.add("profile");
  
//       const userAvatarElement = document.createElement("img");
//       userAvatarElement.classList.add("User-avatar");
//       if (user.avatar) {
//         userAvatarElement.src = user.avatar.url;  
//         userAvatarElement.alt = `${user.name}'s avatar`;
  
//       const userNameElement = document.createElement("span");
//       userNameElement.classList.add("User-name");
//       userNameElement.textContent = user.name;
 
//       profileDiv.appendChild(userAvatarElement);
//       profileDiv.appendChild(userNameElement);
  
//       profileLink.appendChild(profileDiv);
  
//       const container = document.querySelector(".profile-container"); 
//       if (container) {
//         container.appendChild(profileLink);
//       }
  
//     } else {
//       window.location.href = "/auth/login/";
//     }
//   }
// }

export function displayLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user) {
    // Create profile link and profile div
    const profileLink = document.createElement("a");
    profileLink.classList.add("profile-link");
    profileLink.href = "#";  // Prevent default navigation for the profile link
    
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("profile");

    // Create avatar image
    const userAvatarElement = document.createElement("img");
    userAvatarElement.classList.add("user-avatar");
    if (user.avatar) {
      userAvatarElement.src = user.avatar.url;
      userAvatarElement.alt = `${user.name}'s avatar`;
    }

    // Create user name span
    const userNameElement = document.createElement("span");
    userNameElement.classList.add("user-name");
    userNameElement.textContent = user.name;

    profileDiv.appendChild(userAvatarElement);
    profileDiv.appendChild(userNameElement);
    profileLink.appendChild(profileDiv);

    // Dropdown menu
    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");

    // Menu items
    const menuItems = [
      { name: "My Posts", link: `/profile/?user=${user.name}` },
      { name: "Settings", link: "/profile/update" },
      { name: "Home", link: "/post/feed/" },
      { name: "Logout", link: "#" }
    ];

    menuItems.forEach(item => {
      const menuItem = document.createElement("li");
      const menuLink = document.createElement("a");
      menuLink.href = item.link;
      menuLink.textContent = item.name;

      // Handle logout action
      if (item.name === "Logout") {
        menuLink.addEventListener("click", () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/auth/login/";
        });
      }

      menuItem.appendChild(menuLink);
      dropdownMenu.appendChild(menuItem);
    });

    profileLink.appendChild(dropdownMenu);

    // Append to container
    const container = document.querySelector(".profile-container");
    if (container) {
      container.appendChild(profileLink);
    }

    // Toggle dropdown menu visibility
    profileLink.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle("show-menu");
    });
    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the profileLink click from affecting the menu links
    });
  } else {
    window.location.href = "/auth/login/";
  }
}
