import api from "../../api/instance.js";

export async function onRegister(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let name = usernameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  const user = {
    name : name,
    email : email,
    password : password
  }

  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  try {
    await api.auth.register({ name, email, password });
    alert(
      `Registration successful!\nUsername: ${user.name}\nEmail: ${user.email}`
    );
    window.location.href = "/auth/login/";
  } catch (error) {
    alert(`${error.message}.\nPlease try again.`);
  }
}
