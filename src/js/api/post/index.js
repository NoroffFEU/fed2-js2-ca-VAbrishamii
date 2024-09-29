import { headers } from "../headers";
import { API_BASE } from "../constants";

export default class PostAPI {
  apiBase = "";
  apiCreatePosts = "";
  apiReadPosts = "";
  apiUpdatePosts = "";
  apiDeletePosts = "";
  apiPostFromFollowing = "";
  apiCommentPosts = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiCreatePosts = `${this.apiBase}/social/posts`;
    this.apiReadPosts = `${this.apiBase}/social/posts`;
    this.apiUpdatePosts = `${this.apiBase}/social/posts/id`;
    this.apiDeletePosts = `${this.apiBase}/social/posts/id`;
    this.postsfromfollowing = `${this.apiBase}/social/posts/following`;
    this.apiCommentPosts = `${this.apiBase}/social/posts/id/comment`;
  }

  post = {
    create: async ({ title, body, tags, media }) => {
      // console.log("Creating post with data:", { title, body, tags, media });
      const requestBody = JSON.stringify({ title, body, tags, media });
      // console.log("Request body:", requestBody);

      try {
        const response = await fetch(this.apiCreatePosts, {
          method: "POST",
          headers: headers(),
          body: requestBody,
        });

        // console.log("Response status:", response.status);
        // console.log("Response object:", response);

        if (response.ok) {
          const data = await response.json();

          // console.log("Post creation successful. Response data:", data);
          return data;
        } else {
          // console.log(
          //   "Post creation failed. Response status:",
          //   response.status
          // );
          const errorData = await response.json();
          // console.log("Error data:", errorData);
          throw new Error(
            errorData.errors[0]?.message || "Could not create post"
          );
        }
      } catch (error) {
        // console.log("Error in post creation:", error.message);
        throw error;
      }
    },

    read: async () => {
      const params = new URLSearchParams({
        _author: true,
        _comments: true,
        _reactions: true,
      });
      const response = await fetch(`${this.apiReadPosts}?${params}`, {
        method: "GET",
        headers: headers(),

      });

      if (response.ok) {
        const { data } = await response.json();
        console.log("Data:", data);
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors[0]?.message || "Could not fetch post");
      }
    },

    readSinglePost: async (postId) => {
      const params = new URLSearchParams({
        _author: true,
        _comments: true, 
        _reactions: true, 
      })
   
      try {
        const response = await fetch(`${this.apiReadPosts}/${postId}?${params}`, {
          method: "GET",
          headers: headers(),
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.errors[0]?.message || "Could not fetch post"
          );
        }
      } catch (error) {
        throw error;
      }
    },

    update: async (postId, updatedData) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        throw new Error("User must be logged in to update posts.");
      }
      try {
      const response = await fetch(`${this.apiUpdatePosts.replace('id', postId)}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
      
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.errors[0]?.message || "Could not update post"
        );
      }
    } catch (error) {
      throw error;
    }
  },

    delete: async (postId) => {
      try {
        const response = await fetch(`${this.apiDeletePosts.replace("id", postId)}`, {
          method: "DELETE",
          headers: headers(),
        });
    
        if (response.ok) {
          console.log(`Post ${postId} deleted successfully`);
          return true;
        }
    
        const errorData = await response.json();
        throw new Error(errorData.errors[0]?.message || "Could not delete post");
      } catch (error) {
        console.error("Error deleting post:", error.message);
        throw error;
      }
    },
  
  comment: async (postId, { body: comment }) => {
    const requestBody = JSON.stringify({ body: comment });
  
    
    try {
      const response = await fetch(
        `${this.apiCommentPosts.replace("id", postId)}`,
        {
          method: "POST",
          headers: headers(),
          body: requestBody,
        }
      );
    
      
      if (response.ok) {
    
        const data = await response.json();
        const updatedPost = await this.post.readSinglePost(postId);
        return updatedPost;
     
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.errors[0]?.message || "Could not post comment"
        );
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
      throw error;
    }
  },

  getPostsFromFollowing: async (followedUsers) => {
    const params = new URLSearchParams({
      _author: true,
      _comments: true,
      _reactions: true,
    });
  
    const url = `${this.postsfromfollowing}?${params}`;
    console.log('url getpostsfromfollowing', url);
    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
    const errorData = await response.json();
    const errorMessage =
      errorData.errors[0]?.message || "Could not read posts from following";
    throw new Error(errorMessage);
  }
  
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: headers(),
  //     });
  
  //     const jsonResponse = await response.json(); // Read the response body
  //     console.log('Full JSON response:', jsonResponse); // This should now be an array of posts
  
  //     if (response.ok) {
  //       // Since jsonResponse is an array of posts, we filter it based on the followed users
  //       const filteredPosts = jsonResponse.filter(post => {
  //         // Check if the post's author name is in the list of followed users
  //         return followedUsers.some(user => user.name === post.data.author.name);
  //       });
  
  //       console.log('Filtered posts:', filteredPosts);
  //       return filteredPosts;
  //     } else {
  //       // Handle error response
  //       const errorMessage = jsonResponse.errors?.[0]?.message || "Could not read posts from following";
  //       throw new Error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching posts from followed users:", error.message);
  //     throw error;
  //   }
  // }
  

//   getPostsFromFollowing: async () => {
//     const params = new URLSearchParams({
//       _author: true,
//       _comments: true,
//       _reactions: true,
//     });
  
//     const url = `${this.postsfromfollowing}?${params}`;
//     console.log('url getpostsfromfollowing', url);
  
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: headers(),
//       });
  
//       const jsonResponse = await response.json(); 
//       console.log('Full JSON response:', jsonResponse); 
//         if (response.ok) {     
//               const posts = jsonResponse.data?.posts || jsonResponse.posts || jsonResponse; 
//               return posts;
//             }

//             const errorData = await response.json();
//     const errorMessage =
//       errorData.errors[0]?.message || "Could not read posts from following";
//     throw new Error(errorMessage);
//   } catch (error) {
//     console.error("Error getting posts from following:", error.message);
//     throw error;
//   }
// }

}

  }

