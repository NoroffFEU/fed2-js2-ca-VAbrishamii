
// import { postAPI } from '../../api/instance';

// export function createPostHTML(post, profileUserName) {
//   const postContainer = document.createElement("div");
//   postContainer.classList.add("post");

//   const loggedInUser = JSON.parse(localStorage.getItem("user"));
//   const isOwner = loggedInUser && loggedInUser.name === profileUserName;

//   if (isOwner) {
//     const actionsContainer = document.createElement('div');
//     actionsContainer.classList.add('post-actions');
    
//     const editIcon = document.createElement('i');
//     editIcon.classList.add('fas', 'fa-edit');
//     editIcon.addEventListener('click', (event) => {
//       event.preventDefault();
//       window.location.href = `/post/edit/?id=${post.id}`; 
//     });
//     actionsContainer.appendChild(editIcon);
    
//     const deleteIcon = document.createElement('i');
//     deleteIcon.classList.add('fas', 'fa-trash');
//     deleteIcon.addEventListener('click', async (event) => {
//       event.preventDefault();
//       if (confirm('Are you sure you want to delete this post?')) {
//         try {
//           await postAPI.post.delete(post.id);
//           location.reload();
//         } catch (error) {
//           console.error("Error deleting post:", error);
//           alert('Could not delete post. Please try again.');
//         }
//       }
//     });
//     actionsContainer.appendChild(deleteIcon);
//     postContainer.appendChild(actionsContainer);
//   }

//   const titleElement = document.createElement("h1");
//   titleElement.classList.add("post-title");

//   const postLink = document.createElement("a");
//   postLink.href = `/post/?id=${post.id}`;
//   postLink.textContent = post.title;
//   titleElement.appendChild(postLink);
//   postContainer.appendChild(titleElement);

//   if (post.media && post.media.url) {
//     const imgElement = document.createElement("img");
//     imgElement.classList.add("post-image");
//     imgElement.src = post.media.url;
//     imgElement.alt = post.media.alt || "Post Image";
//     postContainer.appendChild(imgElement);
//   }

//   const captionElement = document.createElement("p");
//   captionElement.classList.add("post-caption");
//   captionElement.textContent = post.body;
//   postContainer.appendChild(captionElement);

//   const interactionsContainer = document.createElement("div");
//   interactionsContainer.classList.add("post-interactions");

//   const commentsContainer = document.createElement("div");
//   commentsContainer.classList.add("post-comments");

//   const commentsTitle = document.createElement("div");
//   commentsTitle.classList.add("comments-title");

//   const commentIcon = document.createElement("i");
//   commentIcon.classList.add("fas", "fa-comments");
//   commentIcon.addEventListener("click", (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     toggleCommentForm(post.id);
//   });
  
//   commentsTitle.appendChild(commentIcon);

//   const commentCount = document.createElement("span");
//   commentCount.textContent = ` ${post.comments?.length || 0} `;
//   commentsTitle.appendChild(commentCount);

//   commentsContainer.appendChild(commentsTitle);

//   if (post.comments && post.comments.length > 0) {
//     post.comments.forEach((comment) => {
//       const commentElement = document.createElement("p");
//       commentElement.classList.add("post-comment");
//       commentElement.textContent = comment.body;
//       commentsContainer.appendChild(commentElement);
//     });
//   }

//   const commentForm = document.createElement("form");
//   commentForm.classList.add("comment-form");
//   commentForm.style.display = "none";
//   commentForm.setAttribute("data-post-id", post.id);

//   const commentTextArea = document.createElement("textarea");
//   commentTextArea.classList.add("comment-input");
//   commentTextArea.placeholder = "Write your comment...";
//   commentForm.appendChild(commentTextArea);

//   const actionIconsContainer = document.createElement("div");
//   actionIconsContainer.classList.add("action-icons");

//   const sendIcon = document.createElement("i");
//   sendIcon.classList.add("fas", "fa-paper-plane", "send-comment");
//   sendIcon.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const comment = commentTextArea.value.trim();
//     if (comment) {
//       try {
//         await postAPI.post.comment(post.id, { body: comment });
//         // alert("Comment posted successfully");
      
//         commentTextArea.value = "";
//         const commentCount = commentsContainer.querySelector(".comments-title span");
//         commentCount.textContent = ` ${parseInt(commentCount.textContent) + 1} `;
//       } catch (error) {
//         console.error("Error commenting on post:", error);
//         alert("Could not comment on post. Please try again.");
//       }
//     }
//   });
//   const replyButton = document.createElement("button");
// replyButton.textContent = "Reply";
// replyButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   showReplyForm(actionIconsContainer);
// });
// actionIconsContainer.appendChild(replyButton);

//   actionIconsContainer.appendChild(sendIcon);
//   commentForm.appendChild(actionIconsContainer);

//   interactionsContainer.appendChild(commentsContainer);
//   interactionsContainer.appendChild(commentForm);
//   postContainer.appendChild(interactionsContainer);

//   const dateElement = document.createElement("p");
//   dateElement.classList.add("post-date");
//   dateElement.textContent = `Published on: ${new Date(post.created).toLocaleDateString()}`;
//   postContainer.appendChild(dateElement);

//   return postContainer;
// }

// function toggleCommentForm(postId) {
//   const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`); 
//   if (commentForm) {
//     commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
//   }
// }

// function showReplyForm(actionIconsContainer) {
//   const replyForm = document.createElement("form");
//   const replyTextArea = document.createElement("textarea");
//   replyForm.appendChild(replyTextArea);
  
//   const replySendIcon = document.createElement("i");
//   replySendIcon.classList.add("fas", "fa-paper-plane");
//   replySendIcon.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const reply = replyTextArea.value.trim();
//     if (reply) {
//       await sendReply(actionIconsContainer, reply);
//       replyTextArea.value = "";
//     }
//   });

//   replyForm.appendChild(replySendIcon);
//   actionIconsContainer.appendChild(replyForm);
// }

// export function displayPosts(posts) {
//   const feedContainer = document.querySelector(".feed-container");
//   feedContainer.innerHTML = "";
//   posts.forEach(async (post) => {
//     const comments = await postAPI.post.comment(post.id);
//     const postElement = createPostHTML(post, comments);
//     feedContainer.appendChild(postElement);
//   });
// }

import { postAPI } from '../../api/instance';

export function createPostHTML(post, profileUserName, comments = []) {
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

  const interactionsContainer = document.createElement("div");
  interactionsContainer.classList.add("post-interactions");

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("post-comments");

  const commentsTitle = document.createElement("div");
  commentsTitle.classList.add("comments-title");

  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fas", "fa-comments");
  commentIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCommentForm(post.id);
  });
  
  commentsTitle.appendChild(commentIcon);

  const commentCount = document.createElement("span");
  commentCount.textContent = ` ${comments.length} `;  // Use the comments passed in
  commentsTitle.appendChild(commentCount);

  commentsContainer.appendChild(commentsTitle);

  if (comments.length > 0) {
    comments.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.classList.add("post-comment");
      commentElement.textContent = comment.body;
      commentsContainer.appendChild(commentElement);
    });
  }

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.style.display = "none";
  commentForm.setAttribute("data-post-id", post.id);

  const commentTextArea = document.createElement("textarea");
  // console.log('comment text area', commentTextArea);
  commentTextArea.classList.add("comment-input");
  commentTextArea.placeholder = "Write your comment...";
  commentForm.appendChild(commentTextArea);

  const actionIconsContainer = document.createElement("div");
  actionIconsContainer.classList.add("action-icons");

  const sendIcon = document.createElement("i");
  sendIcon.classList.add("fas", "fa-paper-plane", "send-comment");
  sendIcon.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log('send icon clicked'); 

    const comment = commentTextArea.value.trim();
    console.log('comment body', comment);
    if (comment) {
      try {
        await postAPI.post.comment(post.id, { body: comment });
        commentTextArea.value = "";
        const updatedComments = await postAPI.post.getComments(post.id); 
        updatedCommentDisplay(commentsContainer, updatedComments);

        const commentCount = commentsContainer.querySelector(".comments-title span");
        commentCount.textContent = ` ${parseInt(commentCount.textContent) + 1} `;
      } catch (error) {
        console.error("Error commenting on post:", error);
        alert("Could not comment on post. Please try again.");
      }
    }else {
      alert('Please enter a comment');
    }
  });

  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  replyButton.addEventListener("click", (event) => {
    event.preventDefault();
    showReplyForm(actionIconsContainer);
  });
  actionIconsContainer.appendChild(replyButton);

  actionIconsContainer.appendChild(sendIcon);
  commentForm.appendChild(actionIconsContainer);

  interactionsContainer.appendChild(commentsContainer);
  interactionsContainer.appendChild(commentForm);
  postContainer.appendChild(interactionsContainer);

  const dateElement = document.createElement("p");
  dateElement.classList.add("post-date");
  dateElement.textContent = `Published on: ${new Date(post.created).toLocaleDateString()}`;
  postContainer.appendChild(dateElement);

  return postContainer;
}

function toggleCommentForm(postId) {
  const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`); 
 console.log('comment form', commentForm);
  if (commentForm) {
    commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
  }
}

function updatedCommentDisplay(commentsContainer, comments) {
  commentsContainer.innerHTML = ""; 
  comments.forEach((comment) => {
    const commentElement = document.createElement("p");
    commentElement.classList.add("post-comment");
    commentElement.textContent = comment.body;
    commentsContainer.appendChild(commentElement);
  });
}


function showReplyForm(actionIconsContainer) {
  const replyForm = document.createElement("form");
  const replyTextArea = document.createElement("textarea");
  replyForm.appendChild(replyTextArea);
  
  const replySendIcon = document.createElement("i");
  replySendIcon.classList.add("fas", "fa-paper-plane");
  replySendIcon.addEventListener("click", async (event) => {
    event.preventDefault();
    const reply = replyTextArea.value.trim();
    if (reply) {
      await sendReply(actionIconsContainer, reply);
      replyTextArea.value = "";
    }
  });

  replyForm.appendChild(replySendIcon);
  actionIconsContainer.appendChild(replyForm);
}

export async function displayPosts(posts) {
  const feedContainer = document.querySelector(".feed-container");
  feedContainer.innerHTML = "";

  posts.forEach(async (post) => {
    try {
      const comments = await postAPI.post.comment(post.id);
      const postElement = createPostHTML(post, comments);
      feedContainer.appendChild(postElement);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  });
}
