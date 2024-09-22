import { profileAPI } from "../../api/instance";

export  async function AllProfiles (){
    try {
    const response = await profileAPI.profile.allProfiles();
    console.log('responseprofile', response);

    if (response.error) {
        console.error(response.error);
        return;
    }
    const profiles = response;
    console.log('profiles', profiles);

    const profileList = document.querySelector(".allprofile-container");
    profileList.innerHTML = "";
    profiles.forEach((profile) => {
        const profileElement = document.createElement("div");
        profileElement.classList.add("profile");
        profileElement.innerHTML = `
            <div class="profile_header">
                <img class="profile_banner" src="${profile.banner.url}" alt="${profile.name} banner">
                <img class="profile_avatar" src="${profile.avatar.url}" alt="${profile.name} avatar">
            </div>
            <div class="profile__body">
                <h2 class="profile__username">${profile.name}</h2>
                <p class="profile__bio">${profile.bio}</p>
            </div>
        `;
        profileList.appendChild(profileElement);
    });
} catch (error) {
    console.error("Error fetching profiles:", error.message);
  }
}