
import { postAPI, profileAPI } from "../../api/instance";
import { createPostHTML } from "../post/displayPost";


export async function AllProfiles() {
  try {
    const response = await profileAPI.profile.allProfiles();

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
      const posts = await postAPI.post.getPostsFromFollowing();
   
    const postContainer = document.querySelector(".userpost-container");
    postContainer.innerHTML = "";

    for (const post of posts) { 
     
        const postElement = await createPostHTML(post);

        postElement.setAttribute("data-author-id", post.id); 
        postContainer.appendChild(postElement);
       
        const unfollowButton = postElement.querySelector(".unfollow-btn"); 
        if (unfollowButton) {
          unfollowButton.addEventListener("click", async () => {
            try {
              await profileAPI.profile.unfollow(post.id); 
              removePostsByUser(post.data.author.id);
            } catch (error) {
              console.error("Error unfollowing user:", error.message);
            }
          });
        }
     
    }
  } catch (error) {
    console.error("Error fetching posts from followed users:", error.message);
  }
}

function removePostsByUser(authorId) {
  const postContainer = document.querySelector(".userpost-container");
  const postsToRemove = postContainer.querySelectorAll(`[data-author-id='${authorId}']`);
  
  postsToRemove.forEach(post => post.remove());
}
