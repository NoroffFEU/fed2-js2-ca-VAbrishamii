import { headers } from "../headers";
import { API_BASE } from "../constants";

export default class NoroffAPI {
  apiBase = "";
  apiLogin = "";
  apiRegister = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiLogin = `${apiBase}/auth/login`;
    this.apiRegister = `${apiBase}/auth/register`;
  }
  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(this.apiLogin, {
        headers: headers(),
        method: "POST",
        body,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const { data } = await response.json();
        console.log("Response data:", data); //delete later!!
        const { accessToken: token, ...user } = data;
        console.log("Access token:", token); //delete later!!

        localStorage.setItem('accessToken', token);
        console.log('Token:', token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "/post/feed/";
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not login with this account";
      throw new Error(errorMessage);
    },

    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
      const response = await fetch(this.apiRegister, {
        method: "POST",
        headers: headers(),
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.errors[0]?.message || "Could not register with this account";
      throw new Error(errorMessage);
    },
  };
}
