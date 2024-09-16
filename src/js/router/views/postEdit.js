import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { authGuard } from "../../utilities/authGuard";
import { postAPI } from "../../api/instance";

async function updatePost(event) {
    event.preventDefault(); // Prevent default form submission
  
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // Get the post ID from the URL
  
    const updatedPostData = {
      title: document.querySelector('#title').value,
      body: document.querySelector('#caption').value,
      tags: document.querySelector('#tags').value.split(',').map(tag => tag.trim()), // Split tags by comma
      media: {
        url: document.querySelector('#image').src,
        alt: "Updated post image", // Optionally update alt text
      },
    };
  
    try {
      await postAPI.post.update(postId, updatedPostData);
      alert('Post updated successfully!');
      window.location.href = '/profile'; // Redirect back to profile page
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update the post.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('edit-post-form');
  
    if (editForm) {
      editForm.addEventListener('submit', updatePost);
    } else {
      console.error('Edit form not found in the DOM.');
    }
});
  






authGuard();
displayLoggedInUser();
