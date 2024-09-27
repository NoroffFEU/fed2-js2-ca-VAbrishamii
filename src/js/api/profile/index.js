import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class ProfileAPI {
  apiBase = "";
  allprofile = "";
  postsfromfollowing = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.allprofile = `${this.apiBase}/social/profiles`;
    this.postsfromfollowing = `${this.apiBase}/social/posts/following`;
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('User:', user);
    return user?.name || null;
  }

  createParams(options) {
    const params = new URLSearchParams(options);
    return params.toString();
  }


  getUpdateProfileURL() {
    const username = this.getUserName();
    if (!username) {
      throw new Error("User is not logged in");
    }
    return `${this.apiBase}/social/profiles/${username}`;
  }

  getPostsByUserURL(username) {
    if (!username) {
      throw new Error("Username is required to fetch posts.");
    }
    return `${this.apiBase}/social/profiles/${username}/posts`;
  }

  getProfileDetails = async (username, { followers = false, following = false, posts = false }) => {
    const params = this.createParams({
      _followers: followers,
      _following: following,
      _posts: posts,
    });

    const url = `${this.allprofile}/${username}?${params}`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('gerProfileDetails', data);
      return data;
    }

    const errorData = await response.json();
    const errorMessage =
      errorData.errors[0]?.message || "Could not fetch profile details";
    throw new Error(errorMessage);
  };

// async checkIfFollowing(username) {
//   try {
//     const loggedInUser = this.getUserName(); 
//     const url = `${this.apiBase}/social/profiles/${loggedInUser}?_following=true`; // Fetch following details

//     const response = await fetch(url, {
//       method: "GET",
//       headers: headers(), 
//     });

//     if (response.ok) {
//       const { data } = await response.json(); 
//       const followingUsers = data.following.map(user => user.name); 
//       return followingUsers.includes(username); 
//     } else {
//       const errorData = await response.json();
//       console.error("Error fetching following list:", errorData);
//       return false;
//     }
//   } catch (error) {
//     console.error("Error in checkIfFollowing function:", error.message);
//     return false;
//   }
// }

  profile = {
    update: async ({ name }) => {
      const body = JSON.stringify({ name });
      const url = this.getUpdateProfileURL();
      const response = await fetch(url, {
        method: "PUT",
        headers: headers(),
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not update profile";
      throw new Error(errorMessage);
    },

    readPosts: async (username) => {
      const params = this.createParams({
        _author: true,
        _comments: true,
        _reactions: true,
      });
      const url = `${this.getPostsByUserURL(username || this.getUserName())}?${params}`;
      console.log('url', url);
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });

      if (response.ok) {
        const { data } = await response.json();
        console.log('data from api', data);
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not read posts by this user";
      throw new Error(errorMessage);
    },

    allProfiles: async () => {
      const params = this.createParams({
        _following: true, 
        _followers: true,
        _posts: true,
      });
      const url = `${this.allprofile}?${params}`;

      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      console.log('profile', response);

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not read all profiles";
      throw new Error(errorMessage);

    },
    follow: async (username) => {
   
      const url = `${this.apiBase}/social/profiles/${username}/follow`;
      console.log('follow url', url);
      const response = await fetch(url, {
        method: "PUT",
        headers: headers(),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not follow user";
      throw new Error(errorMessage);

    },

    unfollow: async (username) => {
     
      const url = `${this.apiBase}/social/profiles/${username}/unfollow`;
      const response = await fetch(url, {
        method: "PUT",
        headers: headers(),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not unfollow user";
      throw new Error(errorMessage);
    },

    getPostsFromFollowing: async () => {
      const params = this.createParams({
        _author: true,
        _comments: true,
        _reactions: true,
      });
      const url = `${this.postsfromfollowing}?${params}`;
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      console.log('response', response);

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not read posts from following";
      throw new Error(errorMessage);
    },


  };
  
}
