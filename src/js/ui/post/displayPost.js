import { postAPI } from '../../api/instance';
import { createPostInteractions } from './comment';
import { createAuthorContainer } from './follow';

export async function createPostHTML(post, profileUserName, comments = []) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = loggedInUser && loggedInUser.name === profileUserName;

  if (isOwner) {
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('post-actions');
    
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    editIcon.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = `/post/edit/?id=${post.id}`; 
    });
    actionsContainer.appendChild(editIcon);
    
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
    postContainer.appendChild(actionsContainer);
  }else{
    try {
    const authorContainer = await createAuthorContainer(post);
    if (authorContainer instanceof HTMLElement) {

    postContainer.appendChild(authorContainer);}
    } catch (error) {

      console.error("Error fetching comments:", error);  

  }
}
 
  const titleElement = document.createElement("h1");
  titleElement.classList.add("post-title");

  const postLink = document.createElement("a");
  postLink.href = `/post/?id=${post.id}`;
  postLink.textContent = post.title;
  titleElement.appendChild(postLink);
  postContainer.appendChild(titleElement);

  if (post.media && post.media.url) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("post-image");
    imgElement.src = post.media.url;
    imgElement.alt = post.media.alt || "Post Image";
    postContainer.appendChild(imgElement);
  }

  const captionElement = document.createElement("p");
  captionElement.classList.add("post-caption");
  captionElement.textContent = post.body;
  postContainer.appendChild(captionElement);

  const interactions = createPostInteractions(post, comments, );
  postContainer.appendChild(interactions);

  const dateElement = document.createElement("p");
  dateElement.classList.add("post-date");
  dateElement.textContent = `Published on: ${new Date(post.created).toLocaleDateString()}`;
  postContainer.appendChild(dateElement);

  return postContainer;
}






export async function displayPosts(posts) {
  const feedContainer = document.querySelector(".feed-container");
  feedContainer.innerHTML = "";

  // posts.forEach(async (post) => {
    for (const post of posts) {
    try {
      const profileUserName = post.author.name; // Extract the profile username from the post
      const comments = []; // Assuming you're fetching comments separately (if available)
      
      const postElement = await createPostHTML(post, profileUserName, comments); // Pass post, profileUserName, and comments
      feedContainer.appendChild(postElement);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
}


