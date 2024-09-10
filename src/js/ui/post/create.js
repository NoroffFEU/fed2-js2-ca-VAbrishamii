import { postAPI } from "../../api/instance";

export async function onCreatePost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value;
    const mediaUrl = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media').value;
    
    const tagArray = tags.split(',').map(tag => tag.trim());
    const media = mediaUrl ? { url: mediaUrl, alt: mediaAlt } : null;
 
    const postData = { title, body, tags: tagArray, media };
    
    try {
        await postAPI.post.create (postData);
        window.location.href = '/post/feed/';
    } catch (error) {
        console.error(error);
    }
}
