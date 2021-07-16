//NOTE: THIS WHOLE FILE IS A PLACEHOLDER
//THIS FILE NEEDS TO GET DATA FROM A POST GIVEN IT'S ID
//

function getFriendData(friendId) {
  console.log(friendId,typeof friendId)
    if (friendId==="1") {
      return {
        fullName:"George Kattenbelt",
        profilePicture: "https://cdn.discordapp.com/avatars/752908143272656977/50a815437fa505565f4b7dcb4458e2a8.webp?size=1024",
      }
    } 
     else if (friendId==="2") {
         return {
           fullName:"Tom Beaumont-Brown",
           profilePicture: "https://cdn.discordapp.com/avatars/719233382659260516/76c1c7914671129473ad96407b40bbc6.webp?size=1024",
         }
     }
    else if (friendId==="3") {
        return {
          fullName:"Lyall Stewart",
          profilePicture: "https://cdn.discordapp.com/avatars/715846451334217728/cacae335b4d9aa9bf6924a8d85368812.webp?size=1024",
        }
    }
    else if (friendId==="4") {
        return {
          fullName:"Jacob King",
          profilePicture: "https://cdn.discordapp.com/avatars/753874266809958410/b5792a6ab4f796815f07e6ff49521ab1.webp?size=1024",
        }
    }
    else if (friendId==="5") {
        return {
          fullName:"Josh Warren-Cox",
          profilePicture: "https://cdn.discordapp.com/avatars/752908446956912662/b9c79bef27299657f91fbae9ca68286a.webp?size=1024",
        }
    }
    else {
      return {
        fullName: "Couldn't load",
        profilePicture:"https://www.computerhope.com/jargon/e/error.png"
      }
    }
    
}

module.exports = getFriendData;
