import { displayPostsFromFollowing, followUser } from "../../ui/profile/allprofiles";
import { unfollowUser } from "../../ui/profile/allprofiles";
import { profileAPI } from "../../api/instance";



const getUserFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("user");
   
};

export async function initializeFollowButton() {
    const username = getUserFromURL();
    const isFollowing = await profileAPI.checkIfFollowing(username);
    console.log(`Checking if following ${username}:`, isFollowing);
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
        displayPostsFromFollowing();

    } else {    
        followButton.style.display = "block";
        unfollowButton.style.display = "none";
    }
}
initializeFollowButton();

