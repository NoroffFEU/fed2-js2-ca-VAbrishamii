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
          userNameElement.href = `/profile/index.html?user=${user.name}`; // Set profile link
        }
      } else {
        window.location.href = "/auth/login/";
      }
    }
    
    displayLoggedInUser();


    async function fetchPosts() {
      try {
        const posts = await postAPI.post.read();
        console.log("Posts:", posts);

        const postContainer = document.querySelector(".feed-container");
        postContainer.innerHTML = "";
        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.className = 'post';
          postElement.dataset.postId = post.id; 
      
          postElement.innerHTML = `
            <a><h3>${post.title}</h3></a>
            <p>${post.body}</p>
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" />` : ''}
            <div class="tags">${post.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
          `;
          postContainer.appendChild(postElement);
        });

      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();

  
