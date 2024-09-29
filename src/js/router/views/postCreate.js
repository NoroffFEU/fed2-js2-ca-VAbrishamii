import { displayLoggedInUser } from "../../ui/auth/displayLoggedInUser";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();
displayLoggedInUser();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
