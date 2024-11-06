import { profileAPI } from '../../api/instance';

export let followingStatus = {}; 
export async function initializeFollowingStatus() {
  const storedFollowingUsers = JSON.parse(localStorage.getItem("followingUsers")) || {};
  followingStatus = storedFollowingUsers;
  console.log('followingstatus', followingStatus);
  return followingStatus;
}


function updateFollowButtons(authorName, isFollowing) {
  const followButtons = document.querySelectorAll(`[data-author-name="${authorName}"]`);
  followButtons.forEach(button => {
    button.textContent = isFollowing ? "Unfollow" : "Follow";
    button.classList.remove("bg-secondary-light", "text-text-light", "bg-primary-light", "text-primary-dark");
    if (isFollowing) {
      button.classList.add("bg-secondary-light", "text-text-light");
    }
  
  });
}

export async function createAuthorContainer(post) {
  const authorContainer = document.createElement("div");
  authorContainer.classList.add("post-author-container", 'flex','justify-between', 'item-center','px-4', 'py-2');

  const avatarElement = document.createElement("img");
  avatarElement.classList.add("post-author-avatar", 'w-10', 'h-10', 'rounded-full','border','border-gray');
  avatarElement.src = post.author.avatar.url || "default-avatar.png";
  authorContainer.appendChild(avatarElement);

  const authorName = document.createElement("span");
  authorName.classList.add("post-author-name",'pt-2');
  authorName.textContent = post.author.name;
  authorContainer.appendChild(authorName);

  const followButton = document.createElement("button");
  followButton.classList.add('w-20', 'border', 'rounded-lg', 'text-center');
  followButton.setAttribute('data-author-name', post.author.name);  

  if (followingStatus[post.author.name]) {
    followButton.textContent = "Unfollow";

  } else {
    followButton.textContent = "Follow";
    followButton.classList.add( "text-text-dark", "border-gray-300");

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

