//NOTE: THIS WHOLE FILE IS A PLACEHOLDER
//THIS FILE NEEDS TO GET DATA FROM A POST GIVEN IT'S ID
//
import getApiData from "./getApiData";

function getFriendData(friendId) {
    return getApiData("friend",friendId)
    
}

export default getFriendData;
