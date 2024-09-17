
import { displayLoggedInUser } from '../../ui/auth/displayLoggedInUser';
import { authGuard } from '../../utilities/authGuard';
import { populatePostForm,handleUpdatePost } from '../../ui/post/update'; 

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const postId = getQueryParam('id');
console.log("Post ID:", postId);

if (!postId) {
  alert('No post ID provided.');
} else {
  populatePostForm(postId); 

  const form = document.querySelector('#edit-post-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleUpdatePost(postId);  // Pass postId to handleUpdatePost for updating the post
  });
}


authGuard();
displayLoggedInUser();