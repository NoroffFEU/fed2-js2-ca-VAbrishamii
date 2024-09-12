import { API_BASE } from "./constants";
import NoroffAPI from "./auth/index";
import PostAPI from "./post/index";

export default new NoroffAPI(API_BASE);
export const postAPI = new PostAPI(API_BASE);
