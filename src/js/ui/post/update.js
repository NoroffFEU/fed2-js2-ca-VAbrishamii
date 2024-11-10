import { postAPI } from '../../api/instance';

export function createEditPostForm() {
  const formHTML = `
   <form id="edit-post-form" class="form-box" >
      <label for="title">Title:</label>
      <input type="text" id="title" class="input-field" name="title" required>

      <label for="caption">Caption:</label>
      <textarea id="caption" class="input-field" name="caption" required></textarea>

      <label for="tags">Tags:</label>
      <input type="text" id="tags" class="input-field" name="tags" required>

      <label for="image">Image:</label>
      <input type="text" id="image-url" class="input-field" name="image-url" placeholder="Image URL" required>
      <img id="image-preview" class="input-field" src="" alt="Image preview" />
      
      <button type="submit" class="btn hover:bg-secondary-light hover:text-text-light">Update Post</button>
    </form>
   
    
  `;

  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    formContainer.innerHTML = formHTML;
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


  

