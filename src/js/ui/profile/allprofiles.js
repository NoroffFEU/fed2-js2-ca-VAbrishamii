
import { profileAPI } from "../../api/instance";

export async function AllProfiles() {
  try {
    const response = await profileAPI.profile.allProfiles();
    console.log("responseprofile", response);

    if (response.error) {
      console.error(response.error);
      return;
    }
    const profiles = response;
    console.log("profiles", profiles);

    const profileList = document.querySelector(".allprofile-container");
    profileList.innerHTML = "";
    profiles.forEach((profile) => {
      const profileElement = document.createElement("div");
      profileElement.classList.add("allprofile");
      profileElement.innerHTML = `
            <div class="allprofile-header">
                <img class="profile-avatar" src="${profile.avatar.url}" alt="${profile.name} avatar">
                <h2 class="profile-username">${profile.name}</h2>
            </div>
        `;

      profileElement.addEventListener("click", () => {
        window.location.href = `/profile/usersprofile/?user=${profile.name}`;
      });

      profileList.appendChild(profileElement);
    });
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
  }
}

export async function followUser(username) {
  try {
    const response = await profileAPI.profile.follow(username);
    console.log("response", response);
    if (response.error) {
      console.error(response.error);
      return;
    }
    location.reload();
  } catch (error) {
    console.error("Error following user:", error.message);
  }
}

export async function unfollowUser(username) {
  try {
    const response = await profileAPI.profile.unfollow(username);
    console.log("response", response);
    if (response.error) {
      console.error(response.error);
      return;
    }
    location.reload();
  } catch (error) {
    console.error("Error unfollowing user:", error.message);
  }
}


