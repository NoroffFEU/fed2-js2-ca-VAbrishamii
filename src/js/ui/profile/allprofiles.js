
import { profileAPI } from "../../api/instance";
import { createPostHTML } from "../post/displayPost";


export async function AllProfiles() {
  try {
    const response = await profileAPI.profile.allProfiles();
    console.log("responseprofile", response);

    if (response.error) {
      console.error(response.error);
      return;
    }
    const profiles = response;

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

      profileList.appendChild(profileElement);
    });
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
  }
}


export async function displayPostsFromFollowing() {
  try {
    const posts = await profileAPI.profile.getPostsFromFollowing();
    console.log("Raw API response:", posts);

    if (posts.length === 0) {
      console.log("No posts from followed users");
      return;
    }else{
      console.log("posts", posts);
    }

    const postContainer = document.querySelector(".userpost-container");
    postContainer.innerHTML = "";
    for (const post of posts) {
      const postElement = await createPostHTML(post);
      postContainer.appendChild(postElement);
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}

