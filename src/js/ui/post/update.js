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
      <input type="text" id="image-url" name="image-url" placeholder="Image URL" required>
      <img id="image-preview" src="" alt="Image preview" />
      
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

  try {
    const post = await postAPI.post.readSinglePost(postId);
    
    document.querySelector('#title').value = post.data.title;
    document.querySelector('#caption').value = post.data.body;
    document.querySelector('#tags').value = post.data.tags?.length > 0 
      ? post.data.tags.join(', ') 
      : null;

    const imagePreview = document.querySelector('#image-preview');
    const imageUrlField = document.querySelector('#image-url');
    
    if (post.data.media?.url) {
      imagePreview.src = post.data.media.url;
      imageUrlField.value = post.data.media.url;
    } else {
      imagePreview.src = ''; 
      imagePreview.style.display = 'none';
      imageUrlField.value = '';
    }
  } catch (error) {
    console.error('Error fetching post data:', error);
  }
}

export async function handleUpdatePost(postId) {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#caption').value;
  const tags = document.querySelector('#tags').value.split(',').map(tag => tag.trim());
  const mediaUrl = document.querySelector('#image-url').value;

  const updatedData = {
    title,
    body,
    tags,
    media: { url: mediaUrl || null }, 
  };

  try {
    await postAPI.post.update(postId, updatedData);
    alert('Post updated successfully!');
    window.location.href = '/profile/';
  } catch (error) {
    console.error('Error updating post:', error);
    alert('Failed to update post.');
  }
}


createEditPostForm();
populatePostForm();


  

