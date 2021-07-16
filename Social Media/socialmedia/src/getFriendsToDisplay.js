import getApiData from "./getApiData";

function getFriendsToDisplay() {
    return getApiData("friendsToDisplay")
}

export default getFriendsToDisplay;