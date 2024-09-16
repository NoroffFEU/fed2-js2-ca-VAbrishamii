import { postAPI } from '../../api/instance';

export function createEditPostForm() {
  const formHTML = `
    <form id="edit-post-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="caption">Caption:</label>
      <textarea id="caption" name="caption" required></textarea>

      <label for="tags">Tags:</label>
      <input type="text" id="tags" name="tags" required>

      <label for="image">Image:</label>
      <img id="image-preview" src="" alt="Image preview" />
      <input type="text" id="image-url" name="image-url" placeholder="Image URL" required>

      <button type="submit">Update Post</button>
    </form>
  `;

  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    formContainer.innerHTML = formHTML;
    console.log("Form created successfully!");
  } else {
    console.error("Form container not found.");
  }
}

export async function populatePostForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    alert('No post ID provided.');
    return;
  }

  try {
    const post = await postAPI.post.readSinglePost(postId);
    
    document.querySelector('#title').value = post.data.title;
    document.querySelector('#caption').value = post.data.body;
    document.querySelector('#tags').value = post.data.tags && post.data.tags.length > 0 
    ? post.data.tags.join(', ') 
    : null;
    const imagePreview = document.querySelector('#image-preview');
    const imageUrlField = document.querySelector('#image-url');
    if (post.data.media.url) {
      imagePreview.src = post.data.media.url;
      imageUrlField.value = post.data.media.url;
    } else {
      imagePreview.src = ''; 
      imageUrlField.value = null;
    }

  } catch (error) {
    console.error('Error fetching post data:', error);
  }
}

createEditPostForm();
populatePostForm();


  

