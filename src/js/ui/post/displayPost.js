
export function createPostHTML(post) {
  const postContainer = document.createElement('div');
  postContainer.classList.add('post');

  const titleElement = document.createElement('h1');
  titleElement.classList.add('post-title');
  titleElement.textContent = post.title;
  postContainer.appendChild(titleElement);

  if (post.media && post.media.url) {
    const imgElement = document.createElement('img');
    imgElement.classList.add('post-image');
    imgElement.src = post.media.url;
    imgElement.alt = post.media.alt || 'Post Image';
    postContainer.appendChild(imgElement);
  }

  const captionElement = document.createElement('p');
  captionElement.classList.add('post-caption');
  captionElement.textContent = post.caption;
  postContainer.appendChild(captionElement);

  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('post-comments');

  const commentsTitle = document.createElement('div');
  commentsTitle.classList.add('comments-title');
  
  const commentIcon = document.createElement('i');
  commentIcon.classList.add('fas', 'fa-comments'); 
  commentsTitle.appendChild(commentIcon);

  const commentCount = document.createElement('span');
  commentCount.textContent = ` ${post.comments?.length || 0} `;
  commentsTitle.appendChild(commentCount);

  commentsContainer.appendChild(commentsTitle);

  if (post.comments && post.comments.length > 0) {
    post.comments.forEach(comment => {
      const commentElement = document.createElement('p');
      commentElement.classList.add('post-comment');
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });
  } else {
    const noCommentsElement = document.createElement('p');
    noCommentsElement.textContent = "";
    commentsContainer.appendChild(noCommentsElement);
  }
  postContainer.appendChild(commentsContainer);

  const reactionsContainer = document.createElement('div');
  reactionsContainer.classList.add('post-reactions');

  const reactionsTitle = document.createElement('div');
  reactionsTitle.classList.add('reactions-title');

  const reactionIcon = document.createElement('i');
  reactionIcon.classList.add('fas', 'fa-heart'); // Font Awesome heart icon for reactions
  reactionsTitle.appendChild(reactionIcon);

  const reactionCount = document.createElement('span');
  reactionCount.textContent = ` ${post.reactions?.length || 0} `;
  reactionsTitle.appendChild(reactionCount);

  reactionsContainer.appendChild(reactionsTitle);

  if (post.reactions && post.reactions.length > 0) {
    post.reactions.forEach(reaction => {
      const reactionElement = document.createElement('span');
      reactionElement.classList.add('post-reaction');
      reactionElement.textContent = reaction;
      reactionsContainer.appendChild(reactionElement);
    });
  } else {
    const noReactionsElement = document.createElement('p');
    noReactionsElement.textContent = "";
    reactionsContainer.appendChild(noReactionsElement);
  }
  postContainer.appendChild(reactionsContainer);

  const postLink = document.createElement('a');
  postLink.href = `/post/?id=${post.id}`;
  postLink.classList.add('post-link'); 
  postLink.appendChild(postContainer);

  return postLink;
}


  
  export function displayPosts(posts) {
    const feedContainer = document.querySelector(".feed-container");
    feedContainer.innerHTML = ""; 
    posts.forEach(post => {
      const postElement = createPostHTML(post);
      feedContainer.appendChild(postElement);
    });
  }
  