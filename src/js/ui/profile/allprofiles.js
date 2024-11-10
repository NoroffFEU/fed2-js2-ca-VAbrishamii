
import { postAPI, profileAPI } from "../../api/instance";
import { createPostHTML } from "../post/displayPost";
import {  followingStatus,initializeFollowingStatus} from "../post/follow";


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
            <div class="allprofile-header item-center mb-5 p-2 w-2/4">
                <img class="profile-avatar rounded-full w-20 max-h-10 items-center" src="${profile.avatar.url}" alt="${profile.name} avatar">
                <h2 class="profile-username text-center">${profile.name}</h2>
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
    await initializeFollowingStatus();
    console.log('following statuse', followingStatus);
    const followedUser = Object.keys(followingStatus);
    console.log('followeduser', followedUser)
     
      const posts = await postAPI.post.getPostsFromFollowing(followedUser);
      console.log('posts',posts);

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
              removePostsByUser(post.author.id);
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
