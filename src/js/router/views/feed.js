// import { onLogout } from "../../ui/auth/logout";

// const logoutButton = document.querySelector(".Logout-button");
// logoutButton.addEventListener("click", onLogout);

import { postAPI } from "../../api/instance";
import { createPostHTML } from '../../ui/post/displayPost'; 

function displayLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user) {
    const userNameElement = document.querySelector(".User-name");
    if (userNameElement) {
      userNameElement.textContent = user.name;
      userNameElement.href = `/profile/index.html?user=${user.name}`; 
    }
  } else {
    window.location.href = "/auth/login/";
  }
}

displayLoggedInUser();


export function handlePostClick(postId) {
  window.location.href = `/post/index.html?id=${postId}`;
}
window.handlePostClick = handlePostClick;

let currentPage = 1;
const postsPerPage = 12;

async function fetchAllPosts() {
  try {
    const response = await postAPI.post.read();
    console.log("Posts:", response);
    const posts = response || [];

    // Implement pagination
    const totalPosts = posts.length;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    const postContainer = document.querySelector(".feed-container");
    postContainer.innerHTML = ""; 

    paginatedPosts.forEach(post => {
      const postElement = createPostHTML(post);
      postContainer.appendChild(postElement);
    });

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

fetchAllPosts();
