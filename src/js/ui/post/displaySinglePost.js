
export function createSinglePostHTML(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("post-title");
  titleElement.textContent = post.data.title;
  postContainer.appendChild(titleElement);

  

  if (post.data.media && post.data.media.url) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("post-image");
    imgElement.src = post.data.media.url;
    imgElement.alt = post.data.alt || "Post Image";
    postContainer.appendChild(imgElement);
  }

  if (post.tags && post.tags.length > 0) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("post-tags");
    const tagsTitle = document.createElement("h3");
    tagsTitle.textContent = "Tags";
    tagsContainer.appendChild(tagsTitle);

    post.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.classList.add("post-tag");
      tagElement.textContent = tag; 
      tagsContainer.appendChild(tagElement);
    });
    postContainer.appendChild(tagsContainer);
  }
  const bodyElement = document.createElement("p");
  bodyElement.classList.add("post-body");
  bodyElement.textContent = post.data.body;
  postContainer.appendChild(bodyElement);

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
  commentCount.textContent = ` ${post.data._count.comments || 0} `;
  commentsTitle.appendChild(commentCount);

  commentsContainer.appendChild(commentsTitle);
  interactionsContainer.appendChild(commentsContainer);

  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("post-reactions");

  const reactionsTitle = document.createElement("div");
  reactionsTitle.classList.add("reactions-title");

  const reactionIcon = document.createElement("i");
  reactionIcon.classList.add("fas", "fa-heart"); 
  reactionsTitle.appendChild(reactionIcon);

  const reactionCount = document.createElement("span");
  reactionCount.textContent = ` ${post.data._count.reactions || 0} `;
  reactionsTitle.appendChild(reactionCount);

  reactionsContainer.appendChild(reactionsTitle);
  interactionsContainer.appendChild(reactionsContainer);

  postContainer.appendChild(interactionsContainer);
 

  const dateElement = document.createElement('p');
  dateElement.classList.add('post-date');
  dateElement.textContent = `Published on: ${new Date(post.data.created).toLocaleDateString()}`;
  postContainer.appendChild(dateElement);

  return postContainer;
}


export function displaySinglePosts(posts) {
  const postContainer = document.querySelector(".post-container");
  feedContainer.innerHTML = "";
  posts.forEach((post) => {
    const postElement = createPostHTML(post);
    postContainer.appendChild(postElement);
  });
}
