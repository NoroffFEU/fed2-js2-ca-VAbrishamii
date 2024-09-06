 
import NoroffAPI from "../../api/index.js";

const noroffAPI = new NoroffAPI();

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", onLogin);

async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userData = await noroffAPI.auth.login({ email, password });
    alert("Login successful!");
    console.log("User data:", userData);
    window.location.href = "/"; 

  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
