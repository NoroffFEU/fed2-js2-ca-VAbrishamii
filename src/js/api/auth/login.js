import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }) {
    const body = JSON.stringify({ email, password});

         const response = await fetch (API_AUTH_LOGIN,{
            headers: {
               "Content-Type": "application/json"
            },
            method: "post",
            body,
         });
         console.log('url', API_AUTH_LOGIN);

         console.log("Response received:", response); 

         if (response.ok){
            const{data} = await response.json();
            console.log("Response data:", data);

            const { accessToken: token, ...user} = data;
            console.log("Token:", token); 
            console.log("User:", user);


            localStorage.token = token;
            localStorage.user = JSON.stringify(user);
            return data;
         }

}
