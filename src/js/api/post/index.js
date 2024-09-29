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
      const requestBody = JSON.stringify({ title, body, tags, media });

      try {
        const response = await fetch(this.apiCreatePosts, {
          method: "POST",
          headers: headers(),
          body: requestBody,
        });

        if (response.ok) {
          const data = await response.json();

          return data;
        } else {
      
          const errorData = await response.json();
          throw new Error(
            errorData.errors[0]?.message || "Could not create post"
          );
        }
      } catch (error) {
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
          return true;
        }
    
        const errorData = await response.json();
        throw new Error(errorData.errors[0]?.message || "Could not delete post");
      } catch (error) {
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
  
 

}

  }

