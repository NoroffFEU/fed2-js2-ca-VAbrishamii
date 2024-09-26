import { postAPI} from "../../api/instance";

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

    if (comments.length > 0) {
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
  
        const ownerName = document.createElement("strong");
        ownerName.textContent = comment.data.owner;
        commentElement.appendChild(ownerName);

        const commentText = document.createElement("p");
        commentText.classList.add("post-comment");
        commentText.textContent = comment.data.body;
        commentElement.appendChild(commentText);
  
        const replyText = document.createElement("span");
        replyText.classList.add("reply-text");
        replyText.textContent = "Reply";
        replyText.style.cursor = "pointer";
        replyText.addEventListener("click", (event) => {
          event.preventDefault();
          console.log('postId', newReply.data.postId);
          console.log('objectId', data.id);

          showReplyForm(commentElement, comment.data.postId, comment.data.id);
          
        });
        commentElement.appendChild(replyText);
        commentsContainer.appendChild(commentElement);
      });
    }

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
      console.log('send icon clicked');
  
      const comment = commentTextArea.value.trim();
      console.log('comment body', comment);
      if (comment) {
        try {
          const newComment = await postAPI.post.comment(post.id, { body: comment });
          console.log('new comment', newComment);
          commentTextArea.value = ""; 
          commentForm.style.display = "none";  
  
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");
  
          const ownerName = document.createElement("strong");
          ownerName.textContent = newComment.data.owner;
          commentElement.appendChild(ownerName);

          const newComments = document.createElement("p");
          newComments.classList.add("post-comment");
          newComments.textContent = newComment.data.body;
          commentElement.appendChild(newComments);
  
          const replyText = document.createElement("span");
          replyText.classList.add("reply-text");
          replyText.textContent = "Reply";
          replyText.style.cursor = "pointer";
          replyText.addEventListener("click", (event) => {
            event.preventDefault();
          
            showReplyForm(commentElement); 
          });
          commentElement.appendChild(replyText);
          commentsContainer.appendChild(commentElement);
          const commentCount = commentsContainer.querySelector(".comments-title span");
          commentCount.textContent = ` ${parseInt(commentCount.textContent) + 1} `;
  
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
  



  function toggleCommentForm(postId) {
    const commentForm = document.querySelector(`.comment-form[data-post-id="${postId}"]`); 

    if (commentForm) {
      commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
    }
  }


  async function sendReply(postId, commentId, replyText) {

    const requestBody = { body: replyText, replyToId: commentId };
    console.log('reply body', requestBody);
    try {
      const newReply = await postAPI.post.comment(postId, requestBody);
      console.log("Reply posted successfully:", newReply);
      return newReply;
      
    } catch (error) {
        console.error("Error replying to comment:", error);

    }
  }
  
  
    // Function to show the reply form
function showReplyForm(commentElement, postId, commentId) {
    const replyForm = document.createElement("form");
    replyForm.classList.add("reply-form");
  
    const replyTextArea = document.createElement("textarea");
    replyTextArea.classList.add("reply-input");
    replyTextArea.placeholder = "Write your reply...";
    replyForm.appendChild(replyTextArea);
  
    const sendReplyIcon = document.createElement("i");
    sendReplyIcon.classList.add("fas", "fa-paper-plane", "send-reply");
    
    sendReplyIcon.addEventListener("click", async (event) => {
      event.preventDefault();
      const replyText = replyTextArea.value.trim();
      
      if (replyText) {
        try {
          const newReply = await sendReply(postId, commentId, replyText);
          replyTextArea.value = ""; 
          replyForm.style.display = "none"; 

          const replyElement = document.createElement("div");
          replyElement.classList.add("comment-reply");
  
          const replyOwnerName = document.createElement("strong");
          replyOwnerName.textContent = newReply.data.owner; 
          replyElement.appendChild(replyOwnerName);
  
          const replyBody = document.createElement("p");
          replyBody.classList.add("reply-comment");
          replyBody.textContent = newReply.data.body;
          replyElement.appendChild(replyBody);
  
          commentElement.appendChild(replyElement);
  
        } catch (error) {
          console.error("Error posting reply:", error);
        }
      }
    });
  
    replyForm.appendChild(sendReplyIcon);
    commentElement.appendChild(replyForm); 
  }
  

  
