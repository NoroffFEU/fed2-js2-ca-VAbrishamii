import { profileAPI } from "../../api/instance";
import { displayPosts } from "../../ui/post/displayPost";
import { readPostsByUser } from "./profile";

// const getUserFromURL = () => {
//     const params = new URLSearchParams(window.location.search);
//     return params.get("user");
   
// };


// const initializeUserProfile = async () => {
//     const usernameFromUrl = getUserFromURL();
//     console.log('username from url', usernameFromUrl);
   
//     const loggedInUser = profileAPI.getUserName();
//     console.log('logged in user', loggedInUser);
 

//     const username = usernameFromUrl || loggedInUser;
//     console.log('fetching posts for user', username);

//     if (username) {
//         try {
//             const posts =  await readPostsByUser(username);
//             console.log('posts', posts);
//             displayPosts(posts);
//         } catch (error) {
//             console.error("Error fetching posts for user:", error.message);
//         }
//     } else {
//         console.error("No user specified in the URL.");
//     }
// };

// initializeUserProfile();
readPostsByUser();