import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });

  const response = await fetch(API_AUTH_LOGIN, {
    headers: headers(),
    method: "POST",
    body,
  });

  if(response.ok) {
    const { data } = await response.json();
    const { accessToken: token, ...user } = data;
    localStorage.token = token;
    localStorage.user = JSON.stringify(user);
    window.location.href = "/post/index.html";
    return data;
  }
  
  const errorData = await response.json();
  const errorMessage = errorData.errors[0]?.message || "Could not login with this account";
  throw new Error(errorMessage);
}