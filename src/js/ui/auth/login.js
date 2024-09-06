import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  emailInput.value = "";
  passwordInput.value = "";

  try {
    await login({ email, password });
  } catch(error) {
    alert(error.message);
  }
}