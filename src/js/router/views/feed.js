// import { onLogout } from "../../ui/auth/logout";

// const logoutButton = document.querySelector(".Logout-button");
// logoutButton.addEventListener("click", onLogout);

import { postAPI } from "../../api/instance";
import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { createPostHTML } from '../../ui/post/displayPost'; 
import { AllProfiles } from "../../ui/profile/allprofiles";


export function handlePostClick(postId) {
  window.location.href = `/post/index.html?id=${postId}`;
}
window.handlePostClick = handlePostClick;

let currentPage = 1;
const postsPerPage = 12;

async function fetchAllPosts() {
  try {
    const response = await postAPI.post.read();
    const posts = response || [];

    // Implement pagination
    const totalPosts = posts.length;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    const postContainer = document.querySelector(".feed-container");
    postContainer.innerHTML = ""; 

    // paginatedPosts.forEach(post => {
    //   const postElement = createPostHTML(post);
    //   postContainer.appendChild(postElement);
    // });

    for (const post of paginatedPosts) {
      const postElement = await createPostHTML(post);
      postContainer.appendChild(postElement);
    }
  

    handlePagination(totalPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

function handlePagination(totalPosts) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = "page-button";
    pageButton.addEventListener("click", () => {
      currentPage = i;
      fetchAllPosts();
    });
    paginationContainer.appendChild(pageButton);
  }
}

AllProfiles();
displayLoggedInUser();
fetchAllPosts();
