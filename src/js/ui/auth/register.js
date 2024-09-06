import { register } from "../../api/auth/register.js";
import { API_AUTH_REGISTER } from "../../api/constants.js";

export async function onRegister(event) {
    event.preventDefault();

  const usernameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let username = usernameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  const user = {
    name : username,
    email : email,
    password : password
  }

  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  try {
    await register(API_AUTH_REGISTER, user);
    alert(`Registration successful!\nUsername: ${user.name}\nEmail: ${user.email}`);
    window.location.href = "/auth/login/";
  } catch(error) {
    alert(`${error.message}.\nPlease try again.`);
  }
}

