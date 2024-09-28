
import { profileAPI } from '../../api/instance';

export async function createAuthorContainer(post) {
  const authorContainer = document.createElement("div");
  authorContainer.classList.add("post-author-container");

if (post.author && post.author.avatar && post.author.avatar.url && post.author.name) {
  const avatarElement = document.createElement("img");
  avatarElement.classList.add("post-author-avatar");
  avatarElement.src = post.author.avatar.url || "default-avatar.png"; 
  authorContainer.appendChild(avatarElement);

  const authorLink = document.createElement("a");
  authorLink.classList.add("post-author-name");
  authorLink.href = `/profile/?id=${post.author.id}`; 
  authorLink.textContent = post.author.name;
  authorContainer.appendChild(authorLink);

  // Follow/Unfollow button
  const followButton = document.createElement("button");
  followButton.classList.add("follow-button");

  // Check local storage for follow status
  const followingUsers = JSON.parse(localStorage.getItem("followingUsers")) || {};
  if (followingUsers[post.author.name]) {
    followButton.textContent = "Unfollow"; // If already following
  } else {
    followButton.textContent = "Follow"; // Default to follow
  }

  followButton.addEventListener('click', async () => {
    try {
      if (followButton.textContent === "Follow") {
        await profileAPI.profile.follow(post.author.name); 
        followButton.textContent = "Unfollow"; 

        // Store the following status in local storage
        followingUsers[post.author.name] = true; // Set to true when following
      } else {
        await profileAPI.profile.unfollow(post.author.name); 
        followButton.textContent = "Follow";

        // Remove from local storage
        delete followingUsers[post.author.name]; // Remove followed status
      }

      // Update local storage
      localStorage.setItem("followingUsers", JSON.stringify(followingUsers));
    } catch (error) {
      console.error("Error following/unfollowing:", error);
      alert('Could not update follow status. Please try again.');
    }
  });

  authorContainer.appendChild(followButton);

  return authorContainer;
}
}
