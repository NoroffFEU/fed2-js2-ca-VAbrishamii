import { postAPI } from "../../api/instance";
import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { createSinglePostHTML } from "../../ui/post/displaySinglePost";

displayLoggedInUser();

async function fetchPostById(postId) {
  try {
    const post = await postAPI.post.readSinglePost(postId);
    console.log('Post:', post);
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";

    const postHTML = createSinglePostHTML(post);
    postContainer.appendChild(postHTML);
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }
}

function getPostIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

const postId = getPostIdFromURL();
if (postId) {
  fetchPostById(postId);
} else {
  console.error("No post ID found in URL");
}

