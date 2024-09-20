import { postAPI } from '../../api/instance';

export function createPostHTML(post, profileUserName) {
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

    actionsContainer.appendChild(editIcon);
    actionsContainer.appendChild(deleteIcon);
    postContainer.appendChild(actionsContainer);
  }

  const titleElement = document.createElement("h1");
  titleElement.classList.add("post-title");
  titleElement.textContent = post.title;
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

  const interactionsContainer = document.createElement("div");
  interactionsContainer.classList.add("post-interactions");

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("post-comments");

  const commentsTitle = document.createElement("div");
  commentsTitle.classList.add("comments-title");

  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fas", "fa-comments");
  commentsTitle.appendChild(commentIcon);

  const commentCount = document.createElement("span");
  commentCount.textContent = ` ${post.comments?.length || 0} `;
  commentsTitle.appendChild(commentCount);

  commentsContainer.appendChild(commentsTitle);

  if (post.comments && post.comments.length > 0) {
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.classList.add("post-comment");
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });
  } else {
    const noCommentsElement = document.createElement("p");
    noCommentsElement.textContent = "";
    commentsContainer.appendChild(noCommentsElement);
  }

  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("post-reactions");

  const reactionsTitle = document.createElement("div");
  reactionsTitle.classList.add("reactions-title");

  const reactionIcon = document.createElement("i");
  reactionIcon.classList.add("fas", "fa-heart");
  reactionsTitle.appendChild(reactionIcon);

  const reactionCount = document.createElement("span");
  reactionCount.textContent = ` ${post.reactions?.length || 0} `;
  reactionsTitle.appendChild(reactionCount);

  reactionsContainer.appendChild(reactionsTitle);

  if (post.reactions && post.reactions.length > 0) {
    post.reactions.forEach((reaction) => {
      const reactionElement = document.createElement("span");
      reactionElement.classList.add("post-reaction");
      reactionElement.textContent = reaction;
      reactionsContainer.appendChild(reactionElement);
    });
  } else {
    const noReactionsElement = document.createElement("p");
    noReactionsElement.textContent = "";
    reactionsContainer.appendChild(noReactionsElement);
  }

  interactionsContainer.appendChild(commentsContainer);
  interactionsContainer.appendChild(reactionsContainer);

  postContainer.appendChild(interactionsContainer);

  const dateElement = document.createElement("p");
  dateElement.classList.add("post-date");
  dateElement.textContent = `Published on: ${new Date(
    post.created
  ).toLocaleDateString()}`;
  postContainer.appendChild(dateElement);

  const postLink = document.createElement("a");
  postLink.href = `/post/?id=${post.id}`;
  postLink.classList.add("post-link");
  postLink.appendChild(postContainer);

  return postLink;
}

export function displayPosts(posts) {
  const feedContainer = document.querySelector(".feed-container");
  feedContainer.innerHTML = "";
  posts.forEach((post) => {
    const postElement = createPostHTML(post);
    feedContainer.appendChild(postElement);
  });
}
