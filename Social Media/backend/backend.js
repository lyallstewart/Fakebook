const getFriendData = require("./getFriendData.js")
const getFriendsToDisplay = require("./getFriendsToDisplay.js")
const getPostData = require("./getPostData.js")
const getPostsToDisplay = require("./getPostsToDisplay.js")
const express = require('express')
var cors = require('cors');
const app = express()
const port = 3001
app.use(cors());
app.get("/friend/:id",(req, res) => {
  console.log(req.params.id)
    res.send(getFriendData(req.params.id))
})
app.get("/friendsToDisplay",(req, res) => {
  res.send(getFriendsToDisplay())
})
app.get("/post/:id",(req, res) => {
  res.send(getPostData(req.params.id))
})
app.get("/postsToDisplay",(req, res) => {
    res.send(getPostsToDisplay())
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})