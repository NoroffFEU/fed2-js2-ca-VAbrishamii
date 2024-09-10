import { onCreatePost } from "../../ui/post/create";


const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
