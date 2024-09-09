import { postAPI } from "../../api/instance";

export async function onCreatePost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value;
    const media = document.getElementById('media').value;
    
    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('body', body);
    // formData.append('tags', tags);
    // formData.append('media', media);
    const postData = { title, body, tags, media };
    
    try {
        await postAPI.post.create (postData);
    } catch (error) {
        console.error(error);
    }
}
