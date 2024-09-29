

import { profileAPI } from '../../api/instance';

let followingStatus = {}; 
function initializeFollowingStatus() {
  const storedFollowingUsers = JSON.parse(localStorage.getItem("followingUsers")) || {};
  followingStatus = storedFollowingUsers;
}


function updateFollowButtons(authorName, isFollowing) {
  const followButtons = document.querySelectorAll(`[data-author-name="${authorName}"]`);
  followButtons.forEach(button => {
    button.textContent = isFollowing ? "Unfollow" : "Follow";
  });
}

export async function createAuthorContainer(post) {
  const authorContainer = document.createElement("div");
  authorContainer.classList.add("post-author-container");

  const avatarElement = document.createElement("img");
  avatarElement.classList.add("post-author-avatar");
  avatarElement.src = post.author.avatar.url || "default-avatar.png";
  authorContainer.appendChild(avatarElement);

  const authorName = document.createElement("span");
  authorName.classList.add("post-author-name");
  authorName.textContent = post.author.name;
  authorContainer.appendChild(authorName);

  const followButton = document.createElement("button");
  followButton.classList.add("follow-button");
  followButton.setAttribute('data-author-name', post.author.name);  

  if (followingStatus[post.author.name]) {
    followButton.textContent = "Unfollow";
  } else {
    followButton.textContent = "Follow";
  }

  followButton.addEventListener('click', async () => {
    try {
      if (followButton.textContent === "Follow") {
        await profileAPI.profile.follow(post.author.name);
        followingStatus[post.author.name] = true;  
        localStorage.setItem("followingUsers", JSON.stringify(followingStatus));
        updateFollowButtons(post.author.name, true);  
      } else {
        await profileAPI.profile.unfollow(post.author.name);
        delete followingStatus[post.author.name];  
        localStorage.setItem("followingUsers", JSON.stringify(followingStatus));
        updateFollowButtons(post.author.name, false);  
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
      alert('Could not update follow status. Please try again.');
    }
  });

  authorContainer.appendChild(followButton);

  return authorContainer;
}


initializeFollowingStatus();

