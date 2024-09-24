import { followUser } from "../../ui/profile/allprofiles";
import { unfollowUser } from "../../ui/profile/allprofiles";
import { profileAPI } from "../../api/instance";



const getUserFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("user");
   
};
export async function initializeFollowButton() {
    const username = getUserFromURL();
    const isFollowing = await profileAPI.checkIfFollowing(username);
    const followButton = document.querySelector(".follow-btn");
    const unfollowButton = document.querySelector(".unfollow-btn");

    if(!username){
        console.error("No username found in URL");
        return;
    }
    followButton.addEventListener("click", async () => {
        await followUser(username);
    });
    unfollowButton.addEventListener("click", async () => {
        await unfollowUser(username);
    });
    if(isFollowing){
        followButton.style.display = "none";
        unfollowButton.style.display = "block";

    } else {    
        followButton.style.display = "block";
        unfollowButton.style.display = "none";
    }
}
initializeFollowButton();


// export async function readUserPosts() {
//     const username = getUserFromURL();
//     console.log('username', username);
//     const posts = await profileAPI.profile.readPosts(username);
//     console.log('posts', posts);
//     displayUserPosts(posts);
  
// }

// export async function displayUserPosts(posts) {
//     const postContainer = document.querySelector(".userpost-container");
//     postContainer.innerHTML = "";
//     posts.forEach(post => {
//         const postElement = createPostHTML(post);
//         postContainer.appendChild(postElement);
//     });
// }
// readUserPosts();