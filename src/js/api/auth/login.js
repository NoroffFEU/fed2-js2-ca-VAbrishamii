import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });

  const response = await fetch(API_AUTH_LOGIN, {
    headers: headers(),
    method: "POST",
    body,
  });

  console.log("Response status:", response.status);

  if(response.ok) {
    const { data } = await response.json();
    console.log("Response data:", data);//delete later!!
    const { accessToken: token, ...user } = data;
    console.log("Access token:", token); //delete later!!
    localStorage.token = token;
    localStorage.user = JSON.stringify(user);
    window.location.href = "/post/index.html";
    return data;
  }
  
  const errorData = await response.json();
  const errorMessage = errorData.errors[0]?.message || "Could not login with this account";
  throw new Error(errorMessage);
}