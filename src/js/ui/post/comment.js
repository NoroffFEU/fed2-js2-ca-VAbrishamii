// import { postAPI } from "../../api/instance";

// export function createPostInteractions(post, comments) {
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
//   commentCount.textContent = ` ${comments.length} `;
//   commentsTitle.appendChild(commentCount);
//   commentsContainer.appendChild(commentsTitle);

//   if (comments.length > 0) {
//     comments.forEach((comment) => {
//       const commentElement = document.createElement("div");
//       commentElement.classList.add("comment");

//       const ownerName = document.createElement("strong");
//       ownerName.textContent = comment.owner;
//       commentElement.appendChild(ownerName);

//       const commentText = document.createElement("p");
//       commentText.classList.add("post-comment");
//       commentText.textContent = comment.body;
//       commentElement.appendChild(commentText);

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
//         const newComment = await postAPI.post.comment(post.id, { body: comment });
//         commentTextArea.value = ""; 
//         commentForm.style.display = "none";  

//         const commentElement = document.createElement("div");
//         commentElement.classList.add("comment");

//         const ownerName = document.createElement("strong");
//         ownerName.textContent = newComment.data.comments.slice(-1)[0].owner; // Fixed: Access owner of the last added comment
//         commentElement.appendChild(ownerName);

//         const newComments = document.createElement("p");
//         newComments.classList.add("post-comment");
//         newComments.textContent = newComment.data.comments.slice(-1)[0].body; // Fixed: Access body of the last added comment
//         commentElement.appendChild(newComments);


//         commentsContainer.appendChild(commentElement);
//         const commentCount = commentsContainer.querySelector(".comments-title span");
//         commentCount.textContent = ` ${parseInt(commentCount.textContent) + 1} `;

//         console.log("Comment posted successfully:", newComment);
//       } catch (error) {
//         console.error("Error commenting on post:", error);
//         alert("Could not comment on post. Please try again.");
//       }
//     }
//   });

//   actionIconsContainer.appendChild(sendIcon);
//   commentForm.appendChild(actionIconsContainer);
//   interactionsContainer.appendChild(commentsContainer);
//   interactionsContainer.appendChild(commentForm);

//   return interactionsContainer;
// }

// function toggleCommentForm(postId) {
//   const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`);
//   if (commentForm) {
//     commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
//   }
// }

import { postAPI } from "../../api/instance";

export function createPostInteractions(post, comments) {
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
    // Toggle comment section and load existing comments
    toggleCommentsDisplay(post.id, commentsContainer, comments);
  });
  commentsTitle.appendChild(commentIcon);

  const commentCount = document.createElement("span");
  commentCount.textContent = ` ${comments.length} `;
  commentsTitle.appendChild(commentCount);
  commentsContainer.appendChild(commentsTitle);

  // Create a form for adding new comments
  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.style.display = "none";
  commentForm.setAttribute("data-post-id", post.id);

  const commentTextArea = document.createElement("textarea");
  commentTextArea.classList.add("comment-input");
  commentTextArea.placeholder = "Write your comment...";
  commentForm.appendChild(commentTextArea);

  const actionIconsContainer = document.createElement("div");
  actionIconsContainer.classList.add("action-icons");

  const sendIcon = document.createElement("i");
  sendIcon.classList.add("fas", "fa-paper-plane", "send-comment");
  sendIcon.addEventListener("click", async (event) => {
    event.preventDefault();
    const comment = commentTextArea.value.trim();
    if (comment) {
      try {
        const newComment = await postAPI.post.comment(post.id, { body: comment });
        commentTextArea.value = ""; 
        commentForm.style.display = "none";  

        // Create a new comment element
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const ownerName = document.createElement("strong");
        ownerName.textContent = newComment.data.comments.owner;  // Access owner directly
        commentElement.appendChild(ownerName);

        const newComments = document.createElement("p");
        newComments.classList.add("post-comment");
        newComments.textContent = newComment.data.comments.body;  // Access body directly
        commentElement.appendChild(newComments);

        commentsContainer.appendChild(commentElement);

        const commentCount = commentsContainer.querySelector(".comments-title span");
        if (commentCount) {
          commentCount.textContent = ` ${parseInt(commentCount.textContent) + 1} `;
        } else {
          console.error("Comment count element not found.");
        }
        

        console.log("Comment posted successfully:", newComment);
      } catch (error) {
        console.error("Error commenting on post:", error);
        alert("Could not comment on post. Please try again.");
      }
    }
  });

  actionIconsContainer.appendChild(sendIcon);
  commentForm.appendChild(actionIconsContainer);
  interactionsContainer.appendChild(commentsContainer);
  interactionsContainer.appendChild(commentForm);

  return interactionsContainer;
}

// Function to toggle and load all comments
function toggleCommentsDisplay(postId, commentsContainer, comments) {
  commentsContainer.innerHTML = '';  // Clear the existing comments container

  // Display the comments
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const ownerName = document.createElement("strong");
    ownerName.textContent = comment.owner;  // Correct access to comment owner
    commentElement.appendChild(ownerName);

    const commentText = document.createElement("p");
    commentText.classList.add("post-comment");
    commentText.textContent = comment.body;  // Correct access to comment body
    commentElement.appendChild(commentText);

    commentsContainer.appendChild(commentElement);
  });

  // Toggle the visibility of the comment form and container
  const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`);
  if (commentForm) {
    commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
  }
}
