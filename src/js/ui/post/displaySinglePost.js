export function createSinglePostHTML(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  // Title
  const titleElement = document.createElement("h2");
  titleElement.classList.add("post-title");
  titleElement.textContent = post.data.title;
  postContainer.appendChild(titleElement);

  // Body
  const bodyElement = document.createElement("p");
  bodyElement.classList.add("post-body");
  bodyElement.textContent = post.data.body;
  postContainer.appendChild(bodyElement);

  // Image
  if (post.data.media && post.data.media.url) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("post-image");
    imgElement.src = post.data.media.url;
    imgElement.alt = post.data.alt || "Post Image";
    postContainer.appendChild(imgElement);
  }
  // Tags
  if (post.tags && post.tags.length > 0) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("post-tags");
    const tagsTitle = document.createElement("h3");
    tagsTitle.textContent = "Tags";
    tagsContainer.appendChild(tagsTitle);

    post.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.classList.add("post-tag");
      tagElement.textContent = data.tag;
      tagsContainer.appendChild(tagElement);
    });
    postContainer.appendChild(tagsContainer);
  }

  // Comments
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("post-comments");
  const commentsTitle = document.createElement("h3");
  commentsTitle.textContent = "Comments";
  commentsContainer.appendChild(commentsTitle);

  // Handle case where comments count might be zero
  const noCommentsElement = document.createElement("p");
  noCommentsElement.textContent = `(${post.data._count.comments})`;
  commentsContainer.appendChild(noCommentsElement);

  postContainer.appendChild(commentsContainer);

  // Reactions
  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("post-reactions");
  const reactionsTitle = document.createElement("h3");
  reactionsTitle.textContent = "Reactions";
  reactionsContainer.appendChild(reactionsTitle);

  // Handle case where reactions count might be zero
  const noReactionsElement = document.createElement("p");
  noReactionsElement.textContent = `(${post.data._count.reactions})`;
  reactionsContainer.appendChild(noReactionsElement);

  postContainer.appendChild(reactionsContainer);

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
