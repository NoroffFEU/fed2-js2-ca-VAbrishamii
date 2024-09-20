
import { onLogout } from "../../ui/auth/logout";
import { profileAPI } from "../../api/instance";
import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { createPostHTML } from '../../ui/post/displayPost';

const logoutButton = document.querySelector(".Logout-button");
logoutButton.addEventListener("click", onLogout);

displayLoggedInUser();

const profileUserName = profileAPI.getUserName();

async function readPostsByUser() {
    try {
      const response = await profileAPI.profile.readPosts();
      console.log("Posts:", response);
      const posts = response || [];
  
      const postContainer = document.querySelector(".dashboard-container");
      postContainer.innerHTML = "";
      
      posts.forEach(post => {
        const postElement = createPostHTML(post,profileUserName);
        postContainer.appendChild(postElement);

      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  readPostsByUser();

  
