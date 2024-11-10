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


export async function updateFollowerFollowingCount() {
  try{
    const username = profileAPI.getUserName();
    console.log(username)
    if(!username){
      throw new error("user is not logged in");
    }
    const profileData = await profileAPI.getProfileDetails(username,{
      followers:true,
      following:true,
      posts:true
    });
    console.log('profiledata',profileData);

    const profileInfoContainer = document.getElementById("profile-info");
    if (!profileInfoContainer) {
      console.error("Profile info container not found in the DOM");
      return;
    }
    
    // Clear any existing content inside the container
    profileInfoContainer.innerHTML = "";

    // Add Tailwind classes to the container for styling
    profileInfoContainer.classList.add("flex", "gap-4", "text-center", );

    // Helper function to create and append count elements
    function createCountElement(label, count) {
      // Create a container for each label and count
      const countContainer = document.createElement("div");
      countContainer.classList.add("flex", "flex-col", "items-center");

      const labelElement = document.createElement("p");
      labelElement.textContent = label;
      labelElement.classList.add("text-gray-600", "font-semibold", "text-sm");

      const countElement = document.createElement("p");
      countElement.textContent = count;
      countElement.classList.add("text-lg", "font-bold", "text-gray-900");

      // Append label and count to the count container, and then to profile info container
      countContainer.appendChild(labelElement);
      countContainer.appendChild(countElement);
      profileInfoContainer.appendChild(countContainer);
    }
    // Create and append elements for followers, following, and posts
    createCountElement("Followers", profileData.data._count.followers);
    createCountElement("Following", profileData.data._count.following);
    createCountElement("Posts", profileData.data._count.posts);

  } catch (error) {
    console.error("Error fetching follower/following counts:", error.message);
  }
}

updateFollowerFollowingCount();

initializeFollowingStatus();

