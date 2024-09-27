
import { onLogout } from "../../ui/auth/logout";
import { profileAPI } from "../../api/instance";
import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { createPostHTML } from '../../ui/post/displayPost';

// const logoutButton = document.querySelector(".Logout-button");
// logoutButton.addEventListener("click", onLogout);

displayLoggedInUser();

const profileUserName = profileAPI.getUserName();

export async function readPostsByUser(username) {
    try {
      const response = await profileAPI.profile.readPosts(username);
      console.log("Posts:", response);
      const posts = response || [];
      console.log('posts by user', posts);
  
  
      const postContainer = document.querySelector(".dashboard-container");
      postContainer.innerHTML = "";

      // posts.forEach(post => {
      //   const postElement = createPostHTML(post,profileUserName);
      //   postContainer.appendChild(postElement);
      // });
      
     
        for (const post of posts) {
        const postElement = await createPostHTML(post,profileUserName);
        postContainer.appendChild(postElement);

        // return posts;

      };
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  readPostsByUser();

  
