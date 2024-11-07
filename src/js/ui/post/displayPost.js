import { postAPI } from "../../api/instance";
import { createPostInteractions } from "./comment";
import { createAuthorContainer } from "./follow";

export async function createPostHTML(post, profileUserName, comments = []) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = loggedInUser && loggedInUser.name === profileUserName;

  if (isOwner) {
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("post-actions", 'relative','p-2' );

    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", 'absolute', 'top-2', 'right-8', 'flex', 'hover:text-secondary-light');
    editIcon.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = `/post/edit/?id=${post.id}`;
    });
    actionsContainer.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash",'absolute', 'top-2', 'right-2', 'flex', 'hover:text-secondary-light');
    deleteIcon.addEventListener("click", async (event) => {
      event.preventDefault();
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await postAPI.post.delete(post.id);
          location.reload();
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Could not delete post. Please try again.");
        }
      }
    });
    actionsContainer.appendChild(deleteIcon);
    postContainer.appendChild(actionsContainer);
  } else {
    try {
      const authorContainer = await createAuthorContainer(post);
      if (authorContainer instanceof HTMLElement) {
        postContainer.appendChild(authorContainer);
      }
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

  const words = post.body.split(" ");
  const truncatedCaption = words.slice(0, 8).join(" ");
  const isTruncated = words.length > 8;

  captionElement.textContent = isTruncated
    ? truncatedCaption + "..."
    : post.body;

  if (isTruncated) {
    const seeMoreText = document.createElement("p");
    seeMoreText.classList.add(
      "text-blue-500",
      "cursor-pointer",
      "hover:underline"
    );
    seeMoreText.textContent = "see more";

    seeMoreText.addEventListener("click", () => {
      if (captionElement.textContent.endsWith("...")) {
        captionElement.textContent = post.body;
        seeMoreText.textContent = "see less";
      } else {
        captionElement.textContent = truncatedCaption + "...";
        seeMoreText.textContent = "see more";
      }
    });

    postContainer.appendChild(captionElement);
    postContainer.appendChild(seeMoreText);
  } else {
    postContainer.appendChild(captionElement);
  }

  const interactions = createPostInteractions(post, comments);
  postContainer.appendChild(interactions);

  const dateElement = document.createElement("p");
  dateElement.classList.add("post-date");
  dateElement.textContent = `Published on: ${new Date(
    post.created
  ).toLocaleDateString()}`;
  postContainer.appendChild(dateElement);

  return postContainer;
}

export async function displayPosts(posts) {
  const feedContainer = document.querySelector(".feed-container");
  feedContainer.innerHTML = "";

  for (const post of posts) {
    try {
      const profileUserName = post.author.name;

      const comments = [];

      const postElement = await createPostHTML(post, profileUserName, comments);
      feedContainer.appendChild(postElement);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }
}
