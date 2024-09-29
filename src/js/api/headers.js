import { API_KEY } from "./constants";

export function headers() {
  const token = localStorage.getItem('accessToken');
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if(token) {
    headers.append("Authorization", `Bearer ${token}`);
  }



  return headers;
}
