//This is also a placeholder.
//We could swap this with a friends' posts
//And possibly a machine learning thing eventually.
import getApiData from "./getApiData.js";

function getPostsToDisplay() {
    return getApiData("postsToDisplay")
}

export default getPostsToDisplay;