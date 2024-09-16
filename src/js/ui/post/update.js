export async function onUpdatePost(event) {}

// import PostAPI from "../../api/instance";

// const postAPI = new PostAPI();

// // Function to create the form dynamically
// function createEditForm() {
//   const form = document.createElement('form');
//   form.id = 'edit-post-form';

//   // Title field
//   const titleLabel = document.createElement('label');
//   titleLabel.setAttribute('for', 'title');
//   titleLabel.textContent = 'Title';
//   form.appendChild(titleLabel);

//   const titleInput = document.createElement('input');
//   titleInput.type = 'text';
//   titleInput.id = 'title';
//   titleInput.name = 'title';
//   titleInput.required = true;
//   form.appendChild(titleInput);

//   // Caption field
//   const captionLabel = document.createElement('label');
//   captionLabel.setAttribute('for', 'caption');
//   captionLabel.textContent = 'Caption';
//   form.appendChild(captionLabel);

//   const captionInput = document.createElement('textarea');
//   captionInput.id = 'caption';
//   captionInput.name = 'caption';
//   captionInput.required = true;
//   form.appendChild(captionInput);

//   // Image field (for preview, you can change this to a file input if needed)
//   const imageLabel = document.createElement('label');
//   imageLabel.setAttribute('for', 'image');
//   imageLabel.textContent = 'Image';
//   form.appendChild(imageLabel);

//   const imageInput = document.createElement('img');
//   imageInput.id = 'image';
//   imageInput.alt = 'Post image';
//   imageInput.style.maxWidth = '100%';
//   form.appendChild(imageInput);

//   // Tags field
//   const tagsLabel = document.createElement('label');
//   tagsLabel.setAttribute('for', 'tags');
//   tagsLabel.textContent = 'Tags (comma-separated)';
//   form.appendChild(tagsLabel);

//   const tagsInput = document.createElement('input');
//   tagsInput.type = 'text';
//   tagsInput.id = 'tags';
//   tagsInput.name = 'tags';
//   form.appendChild(tagsInput);

//   // Submit button
//   const submitButton = document.createElement('button');
//   submitButton.type = 'submit';
//   submitButton.textContent = 'Update Post';
//   form.appendChild(submitButton);

//   // Append the form to a container on the page
//   const formContainer = document.querySelector('.form-container'); // Make sure there's a .form-container in your HTML
//   formContainer.appendChild(form);
// }

// // Load the post data and populate the form
// async function loadPostData() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const postId = urlParams.get('id'); // Get the post ID from the URL

//   if (!postId) {
//     alert('No post ID provided.');
//     return;
//   }

//   try {
//     const post = await postAPI.post.readSinglePost(postId);

//     // Populate the form with post data
//     document.querySelector('#title').value = post.title;
//     document.querySelector('#caption').value = post.body;
//     document.querySelector('#image').src = post.media.url;
//     document.querySelector('#tags').value = post.tags.join(', '); // Assuming tags are comma-separated
//   } catch (error) {
//     console.error('Error fetching post data:', error);
//   }
// }

  
// createEditForm(); 
// loadPostData(); 
import { postAPI } from "../../api/instance";

async function loadPostData() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); 
  
    if (!postId) {
      alert('No post ID provided.');
      return;
    }
    console.log('Fetching post with ID:', postId);

  
    try {
      const post = await postAPI.post.readSinglePost(postId);
      console.log('Post data fetched:', post);
  
      // Create form HTML dynamically
      const formHTML = `
        <form id="edit-post-form">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" value="${post.title}" required>
          
          <label for="caption">Caption:</label>
          <textarea id="caption" name="caption" required>${post.body}</textarea>
          
          <label for="tags">Tags:</label>
          <input type="text" id="tags" name="tags" value="${post.tags.join(', ')}" required>
          
          <label for="image">Image:</label>
          <img id="image" src="${post.media.url}" alt="${post.media.alt}" />
          
          <button type="submit">Update Post</button>
        </form>
      `;
  
      // Insert the form HTML into the DOM
      const formContainer = document.querySelector('.form-container');
      formContainer.innerHTML = formHTML;
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }
  
  loadPostData();
  
