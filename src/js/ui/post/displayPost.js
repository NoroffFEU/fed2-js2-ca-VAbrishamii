export  function createPostHTML(post) {

    const postContainer = document.createElement('div');
    postContainer.classList.add('post');
  
    const titleElement = document.createElement('h2');
    titleElement.classList.add('post-title');
    titleElement.textContent = post.title;
    postContainer.appendChild(titleElement);
  
    const captionElement = document.createElement('p');
    captionElement.classList.add('post-caption');
    captionElement.textContent = post.caption;
    postContainer.appendChild(captionElement);
  
    if (post.imgUrl) {
      const imgElement = document.createElement('img');
      imgElement.classList.add('post-image');
      imgElement.src = post.imgUrl;
      imgElement.alt = post.imgAlt || 'Post Image';
      postContainer.appendChild(imgElement);
    }
  
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('post-comments');
    const commentsTitle = document.createElement('h3');
    commentsTitle.textContent = 'Comments';
    commentsContainer.appendChild(commentsTitle);
    
    post.comments.forEach(comment => {
      const commentElement = document.createElement('p');
      commentElement.classList.add('post-comment');
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });
    postContainer.appendChild(commentsContainer);
  
  
    const reactionsContainer = document.createElement('div');
    reactionsContainer.classList.add('post-reactions');
    const reactionsTitle = document.createElement('h3');
    reactionsTitle.textContent = 'Reactions';
    reactionsContainer.appendChild(reactionsTitle);
  
    post.reactions.forEach(reaction => {
      const reactionElement = document.createElement('span');
      reactionElement.classList.add('post-reaction');
      reactionElement.textContent = reaction;
      reactionsContainer.appendChild(reactionElement);
    });
    postContainer.appendChild(reactionsContainer);
  
    return postContainer;
  }
  
  export function displayPosts(posts) {
    const feedContainer = document.querySelector(".feed-container");
    feedContainer.innerHTML = ""; 
    posts.forEach(post => {
      const postElement = createPostHTML(post);
      feedContainer.appendChild(postElement);
    });
  }
  