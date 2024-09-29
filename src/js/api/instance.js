import { API_BASE } from "./constants";
import NoroffAPI from "./auth/index";
import PostAPI from "./post/index";
import ProfileAPI from "./profile/index";

export default new NoroffAPI(API_BASE);
export const postAPI = new PostAPI(API_BASE);
export const profileAPI = new ProfileAPI(API_BASE);
