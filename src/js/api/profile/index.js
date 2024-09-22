import { API_BASE } from "../constants";
import { headers } from "../headers";

export default class ProfileAPI {
  apiBase = "";
  allprofile = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.allprofile = `${this.apiBase}/social/profiles`;
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('User:', user);
    return user?.name || null;
  }

  getUpdateProfileURL() {
    const username = this.getUserName();
    if (!username) {
      throw new Error("User is not logged in");
    }
    return `${this.apiBase}/social/profiles/${username}`;
  }

  getPostsByUserURL() {
    const username = this.getUserName();
    if (!username) throw new Error("User is not logged in.");
    return `${this.apiBase}/social/profiles/${username}/posts`;
  }

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

    readPosts: async () => {
        const url = this.getPostsByUserURL();
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
        errorData.errors[0]?.message || "Could not read posts by this user";
      throw new Error(errorMessage);
    },

    allProfiles: async () => {
      const response = await fetch(this.allprofile, {
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

    }

  };
  
}
