// import { onLogout } from "../../ui/auth/logout";

// const logoutButton = document.querySelector(".Logout-button");
// logoutButton.addEventListener("click", onLogout);

import { postAPI } from "../../api/instance";

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

let currentPage = 1;
const postsPerPage = 12;

export function handlePostClick(postId) {
  window.location.href = `/post/index.html?id=${postId}`;
}
window.handlePostClick = handlePostClick;

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

    paginatedPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.dataset.postId = post.id;

      // Generate comments and reactions
      const commentsHTML = post.comments
        ? post.comments
            .map((comment) => `<p class="post-comment">${comment}</p>`)
            .join("")
        : "";
      const reactionsHTML = post.reactions
        ? post.reactions
            .map((reaction) => `<span class="post-reaction">${reaction}</span>`)
            .join("")
        : "";

      postElement.innerHTML = `
      <a href="#" onclick="handlePostClick(${post.id})">
          <h3>${post.title}</h3>
        </a>
        <p>${post.body}</p>
        ${
          post.media
            ? `<img src="${post.media.url}" alt="${post.media.alt}" />`
            : ""
        }
        <div class="tags">${post.tags
          .map((tag) => `<span>${tag}</span>`)
          .join("")}</div>
        <div class="post-comments">
          <h4>Comments:</h4>
          ${commentsHTML}
        </div>
        <div class="post-reactions">
          <h4>Reactions:</h4>
          ${reactionsHTML}
        </div>
      `;
      postContainer.appendChild(postElement);
    });

    // Handle pagination
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
