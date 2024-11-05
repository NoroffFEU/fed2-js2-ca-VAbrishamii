

export function displayLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));



  if (user) {

    const profileLink = document.createElement("a");
    profileLink.classList.add("profile-link", 'relative');
    profileLink.href = "#";  
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("profile", 'flex', 'items-center', 'space-x-2', );

 
    const userAvatarElement = document.createElement("img");
    userAvatarElement.classList.add("user-avatar", 'h-10', 'w-10', 'rounded-full','border','border-gray-200');
    if (user.avatar) {
      userAvatarElement.src = user.avatar.url;
      userAvatarElement.alt = `${user.name}'s avatar`;
    }


    const userNameElement = document.createElement("span");
    userNameElement.classList.add("user-name",'hidden', 'sm:inline-block','text-text-dark','hover:text-secondary-light', 'text-2xl', 'font-medium', 'font-mono');
    userNameElement.textContent = user.name;

    profileDiv.appendChild(userAvatarElement);
    profileDiv.appendChild(userNameElement);
    profileLink.appendChild(profileDiv);


    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu", 'absolute', 'right-0', 'mt-2','w-44','bg-background-light','border','border-gray-200','rounded','shadow-lg', 'hidden','z-50' );


    const menuItems = [
      { name: "My Posts", link: `/profile/?user=${user.name}` },
      { name: "Updat", link: "/profile/update/" },
      { name: "Home", link: "/post/feed/" },
      { name: "Logout", link: "#" }
    ];

    menuItems.forEach(item => {
      const menuItem = document.createElement("li");
      const menuLink = document.createElement("a");
      menuLink.href = item.link;
      menuLink.textContent = item.name;
      menuLink.classList.add('block','px-4', 'py-2', 'text-text-dark','hover:text-secondary-light');


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

    const container = document.querySelector(".profile-container");
    if (container) {
      container.appendChild(profileLink);
    }

    profileLink.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle("hidden");
    });
    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation(); 
    });
  } else {
    window.location.href = "/auth/login/";
  }
}
