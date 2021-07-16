//NOTE: THIS WHOLE FILE IS A PLACEHOLDER
//THIS FILE NEEDS TO GET DATA FROM A POST GIVEN IT'S ID
//
function getPostData(postId) {
    if (postId==="1") {
      return {
        type:"text",
        content:"This is an amazing post!",
        mediaLink:"",
        videoType:null
      }
    } 
    else if (postId==="2") {
        return {
          type:"image",
          content:"This is an amazing image!",
          mediaLink:"https://cdn.pixabay.com/photo/2017/09/15/02/22/fantasy-2750995_960_720.jpg",
          videoType:null
        }
    }
    else if (postId==="3") {
        return {
          type:"video",
          content:"This is an amazing video!",
          mediaLink:"dQw4w9WgXcQ",
          videoType:"youtube"
        }
    }
    else if (postId==="4") {
        return {
          type:"video",
          content:"This is an amazing video!",
          mediaLink:"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
          videoType:"mp4"
        }
    }
    else if (postId==="5") {
        return {
          type:"video",
          content:"This is an amazing video!",
          mediaLink:"http://techslides.com/demos/sample-videos/small.mp4",
          videoType:"mp4"
        }
    }
    else if (postId==="6") {
        return {
          type:"video",
          content:"This is an amazing video!",
          mediaLink:"BNcxTNrtRdk",
          videoType:"youtube"
        }
    }
    
}
export default getPostData