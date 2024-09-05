export default class NoroffAPI{
    apiBase = "";

    constructor (apiBase = "https://v2.api.noroff.dev"){
        this.apiBase = apiBase;

    }
    get apiLoginPath(){
        return `${this.apiBase}/auth/login`;
    }
    get apiRegisterPath(){
        return `${this.apiBase}/auth/register`;
    }

    auth = {
        login: async ({ email, password }) => {
          const body = JSON.stringify({ email, password });
    
          const response = await fetch(this.apiLoginPath, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "post",
            body,
          });
    
          if (response.ok) {
            const { data } = await response.json();
            const { accessToken: token, ...user } = data;
            localStorage.token = token;
            localStorage.user = JSON.stringify(user);
            router("/");
            return data;
          }
          throw new Error("Could not login with this account");
        },
        register: async ({ name, email, password }) => {
            const body = JSON.stringify({ name, email, password });
      
            const response = await fetch(this.apiRegisterPath, {
              headers: { "Content-Type": "application/json" },
              method: "post",
              body,
            });
      
            if (response.ok) {
              const { data } = await response.json();
              return data;
            }
      
            throw new Error("Could not register this account");
          },
      
          logout: async () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          },
        };

}