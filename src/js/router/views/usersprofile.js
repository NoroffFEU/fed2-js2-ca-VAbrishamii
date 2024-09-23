import { readPostsByUser } from "./profile";

const getUserFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("user");
   
};


const initializeUserProfile = async () => {
    const username = getUserFromURL();
    console.log('object', username);
    if (username) {
        try {
            await readPostsByUser(username);
        } catch (error) {
            console.error("Error fetching posts for user:", error.message);
        }
    } else {
        console.error("No user specified in the URL.");
    }
};

initializeUserProfile();
