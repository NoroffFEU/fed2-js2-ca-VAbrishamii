import { headers } from "../headers";
import { API_BASE } from "../constants";

export default class PostAPI {
  apiBase = "";
  apiCreatePosts = "";
  apiReadPosts = "";
  apiUpdatePosts = "";
  apiDeletePosts = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiCreatePosts = `${this.apiBase}/social/posts`;
    this.apiReadPosts = `${this.apiBase}/social/posts/id`;
    this.apiUpdatePosts = `${this.apiBase}/social/posts/id`;
    this.apiDeletePosts = `${this.apiBase}/social/posts/id`;
  }

  post = {
   
        create: async ({ title, content, tags, media }) => {
          // Log the data being sent to the server
          console.log("Creating post with data:", { title, content, tags, media });
      
          const body = JSON.stringify({ title, content, tags, media });
      
          // Log the final body before sending
          console.log("Request body:", body);
      
          try {
            const response = await fetch(this.apiCreatePosts, {
              method: "POST",
              headers: headers(),
              body,
            });
      
            // Log the status of the response
            console.log("Response status:", response.status);
      
            if (response.ok) {
              const data = await response.json();
              // Log the data returned from the server
              console.log("Post creation successful. Response data:", data);
              return data;
            } else {
              // Log if the response status is not ok
              console.log("Post creation failed. Response status:", response.status);
              const errorData = await response.json();
              console.log("Error data:", errorData);
              throw new Error(errorData.errors[0]?.message || "Could not create post");
            }
          } catch (error) {
            // Log the caught error
            console.log("Error in post creation:", error.message);
            throw error;
          }
        },
      
      

    read: async (postId) => {
      const response = await fetch(`${this.apiPosts}/${postId}`, {
        method: "GET",
        headers: headers(),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      throw new Error(errorData.errors[0]?.message || "Could not fetch post");
    },

    update: async (postId, { title, content }) => {
      const body = JSON.stringify({ title, content });
      const response = await fetch(`${this.apiPosts}/${postId}`, {
        method: "PUT",
        headers: headers(),
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      throw new Error(errorData.errors[0]?.message || "Could not update post");
    },

    delete: async (postId) => {
      const response = await fetch(`${this.apiPosts}/${postId}`, {
        method: "DELETE",
        headers: headers(),
      });

      if (response.ok) {
        return true;
      }

      const errorData = await response.json();
      throw new Error(errorData.errors[0]?.message || "Could not delete post");
    },
  };
}
