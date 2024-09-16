import { onLogout } from "../../ui/auth/logout";
import { postAPI, profileAPI } from "../../api/instance";
import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { createPostHTML } from '../../ui/post/displayPost';

const logoutButton = document.querySelector(".Logout-button");
logoutButton.addEventListener("click", onLogout);

displayLoggedInUser();

async function readPostsByUser() {
    try {
      const response = await profileAPI.profile.readPosts();
      console.log("Posts:", response);
      const posts = response || [];
  
      const postContainer = document.querySelector(".dashboard-container");
      postContainer.innerHTML = "";
  
      posts.forEach(post => {
        const postElement = createPostHTML(post);

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('post-actions');
        // Edit Icon
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit'); 
        editIcon.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = `/post/edit/?id=${post.id}`; 
        });
        actionsContainer.appendChild(editIcon);
        // Delete Icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');
        deleteIcon.addEventListener('click', async (event) => {
          event.preventDefault();
          if (confirm('Are you sure you want to delete this post?')) {
            try {
              await postAPI.post.delete(post.id);
              location.reload();
            } catch (error) {
              console.error("Error deleting post:", error);
              alert('Could not delete post. Please try again.');
            }
          }
        });
        actionsContainer.appendChild(deleteIcon);
        postElement.appendChild(actionsContainer);
        postContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  readPostsByUser();
  
