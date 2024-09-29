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
      toggleCommentForm(post.id);
  });
  commentsTitle.appendChild(commentIcon);

  const commentCount = document.createElement("span");
  commentCount.textContent = ` ${comments.length} `;
  commentsTitle.appendChild(commentCount);
  commentsContainer.appendChild(commentsTitle);


  const reactionIcon = document.createElement("i");
  reactionIcon.classList.add("fas", "fa-heart");


  const userReactions = JSON.parse(localStorage.getItem("userReactions")) || {};
  if (userReactions[post.id]) {
      reactionIcon.classList.add("reacted");
  }

  reactionIcon.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleReaction(post.id, reactionIcon);
  });
  commentsTitle.appendChild(reactionIcon);

  comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const ownerName = document.createElement("strong");
      ownerName.textContent = comment.owner; 
      commentElement.appendChild(ownerName);

      const commentText = document.createElement("p");
      commentText.classList.add("post-comment");
      commentText.textContent = comment.body;  
      commentElement.appendChild(commentText);

      commentsContainer.appendChild(commentElement);
  });

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

  let commentsArray = [...comments];
  sendIcon.addEventListener("click", async (event) => {
      event.preventDefault();
      const comment = commentTextArea.value.trim();
      if (comment) {
          try {
              const newCommentResponse = await postAPI.post.comment(post.id, { body: comment });
              commentTextArea.value = "";
         
              const newComment = newCommentResponse.data;
              commentsArray.push(newComment);
             
              const newCommentElement = document.createElement("div");
              newCommentElement.classList.add("comment");
              const newOwnerName = document.createElement("strong");
              newOwnerName.textContent = newComment.comments.owner;
              newCommentElement.appendChild(newOwnerName);

              const newCommentText = document.createElement("p");
              newCommentText.classList.add("post-comment");
              newCommentText.textContent = newComment.comments.body; 
              newCommentElement.appendChild(newCommentText);

              commentsContainer.appendChild(newCommentElement);

              const commentCount = commentsContainer.querySelector(".comments-title span");
              if (commentCount) {
                  commentCount.textContent = ` ${commentsArray.length} `;
              }
           

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


function toggleCommentForm(postId) {
  const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`);
  if (commentForm) {
    commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
  }
}


function toggleReaction(postId, reactionIcon) {
  const userReactions = JSON.parse(localStorage.getItem("userReactions")) || {};

  if (userReactions[postId]) {
  
    delete userReactions[postId];
    reactionIcon.classList.remove("reacted");
  } else {
    userReactions[postId] = true;
    reactionIcon.classList.add("reacted"); 
  }

  localStorage.setItem("userReactions", JSON.stringify(userReactions));
}

