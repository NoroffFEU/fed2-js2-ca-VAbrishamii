
import { postAPI, profileAPI } from "../../api/instance";
import { createPostHTML } from "../post/displayPost";


export async function AllProfiles() {
  try {
    const response = await profileAPI.profile.allProfiles();
    // console.log("responseprofile", response);

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


// export async function displayPostsFromFollowing() {
//   try {
//     const posts = await profileAPI.profile.getPostsFromFollowing();
//     console.log("Raw API response:", posts);

//     if (posts.length === 0) {
   
//       return;
//     }else{
//       // console.log("posts", posts);
//     }

//     const postContainer = document.querySelector(".userpost-container");
//     postContainer.innerHTML = "";
//     for (const post of posts) {
//       const postElement = await createPostHTML(post);
//       postContainer.appendChild(postElement);
//     }
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//   }
// }

// export async function displayPostsFromFollowing() {
//   try {
//     // const posts = await profileAPI.profile.getPostsFromFollowing();
//     const posts= await postAPI.post.getPostsFromFollowing();
//     console.log("postfromfollowing:", posts);


//     if (posts.length === 0) {
//       return;
//     }

//     const postContainer = document.querySelector(".userpost-container");
//     postContainer.innerHTML = "";

//     for (const post of posts) {
//       // Create the post HTML element
//       const postElement = await createPostHTML(post);
      
//       // Attach the author's user ID to the post element for easier removal later
//       postElement.setAttribute("data-author-id", post.data.author.name);

//       postContainer.appendChild(postElement);

//       // Add event listener for unfollowing the user
//       const unfollowButton = postElement.querySelector(".unfollow-btn"); // Assuming an unfollow button exists
//       if (unfollowButton) {
//         unfollowButton.addEventListener("click", async () => {
//           try {
//             await profileAPI.profile.unfollow(post.author.id); // Call API to unfollow the user

//             // After unfollowing, remove all posts from this author
//             removePostsByUser(post.author.id);
//           } catch (error) {
//             console.error("Error unfollowing user:", error.message);
//           }
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//   }
// }


// export async function displayPostsFromFollowing() {
//   try {
//     const followedUsers = await profileAPI.profile.getFollowedUsers();
//     console.log("Followed users:", followedUsers);
//     const posts = await postAPI.post.getPostsFromFollowing();
//     console.log("Posts from followed users:", posts);

//   }
//   catch (error) {
//     console.error("Error fetching posts from followed users:", error.message);
//   }
//   const postContainer = document.querySelector(".userpost-container");
//   postContainer.innerHTML = "";
//   for (const post of posts) {
//     if (followedUsers.some(user => user.name === post.data.author.name)) {

//     const postElement = await createPostHTML(post);
//     // Attach the author's user ID to the post element for easier removal later
//     postElement.setAttribute("data-author-id", post.data.author.name);
//     postContainer.appendChild(postElement);
//     // Add event listener for unfollowing the user
//     const unfollowButton = postElement.querySelector(".unfollow-btn"); // Assuming an unfollow button exists
//     if (unfollowButton) {
//       unfollowButton.addEventListener("click", async () => {
//         try {
//           await profileAPI.profile.unfollow(post.author.id); // Call API to unfollow the user
//           // After unfollowing, remove all posts from this author
//           removePostsByUser(post.author.id);
//         } catch (error) {
//           console.error("Error unfollowing user:", error.message);
//         }
//       });
//     }
//   }
// }
// }
// // Function to remove posts by a specific user from the DOM
// function removePostsByUser(authorId) {
//   const postContainer = document.querySelector(".userpost-container");
//   const postsToRemove = postContainer.querySelectorAll(`[data-author-id='${authorId}']`);
  
//   postsToRemove.forEach(post => post.remove());
// }

export async function displayPostsFromFollowing() {
  try {
    const followedUsers = await profileAPI.profile.getFollowedUsers();
    console.log("Followed users:", followedUsers);

    // Get posts from followed users
    const posts = await postAPI.post.getPostsFromFollowing();
    console.log("Posts from followed users:", posts);

    // Clear the post container
    const postContainer = document.querySelector(".userpost-container");
    postContainer.innerHTML = "";

    // Iterate over the posts
    for (const post of posts) { // Changed from post to posts
      if (followedUsers.some(user => user.name === post.data.following.name)) {
        const postElement = await createPostHTML(post);
        // Attach the author's user ID to the post element for easier removal later
        postElement.setAttribute("data-author-id", post.data.author.id); // Use post.data.author.id instead of name
        postContainer.appendChild(postElement);
        
        // Add event listener for unfollowing the user
        const unfollowButton = postElement.querySelector(".unfollow-btn"); // Assuming an unfollow button exists
        if (unfollowButton) {
          unfollowButton.addEventListener("click", async () => {
            try {
              await profileAPI.profile.unfollow(post.data.author.id); // Call API to unfollow the user
              // After unfollowing, remove all posts from this author
              removePostsByUser(post.data.author.id);
            } catch (error) {
              console.error("Error unfollowing user:", error.message);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching posts from followed users:", error.message);
  }
}

// Function to remove posts by a specific user from the DOM
function removePostsByUser(authorId) {
  const postContainer = document.querySelector(".userpost-container");
  const postsToRemove = postContainer.querySelectorAll(`[data-author-id='${authorId}']`);
  
  postsToRemove.forEach(post => post.remove());
}
