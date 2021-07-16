const getFriendData = require("./getFriendData.js")
const getFriendsToDisplay = require("./getFriendsToDisplay.js")
const getPostData = require("./getPostData.js")
const getPostsToDisplay = require("./getPostsToDisplay.js")
const express = require('express')
const app = express()
const port = 3001
app.use(express.json()) // decodes JSON

app.get("*",(req, res) => {
    res.end("FakeBook API")
})

app.post('*', (req, res) => {
  data = req.body // gets the JSON request
  url = req.url
  let tosend
  if (url==="/friend") {
      tosend = getFriendData(data.id)
  } else if (url==="/friendsToDisplay") {
      tosend = getFriendsToDisplay()
  } else if (url==="/post") {
    tosend = getPostData(data.id)
} else if (url==="/postsToDisplay") {
    tosend = getPostToDisplay()
}
  res.end(tosend)
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})