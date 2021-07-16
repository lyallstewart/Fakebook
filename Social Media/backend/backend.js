// //Import temp functions
// const getFriendData = require("./getFriendData.js")
// const getFriendsToDisplay = require("./getFriendsToDisplay.js")
// const getPostData = require("./getPostData.js")
// const getPostsToDisplay = require("./getPostsToDisplay.js")

// // Get server libraries
// const express = require('express')
// var cors = require('cors');

// //setup app
// const app = express()
// const port = 3001
// //allow cross-origin
// app.use(cors());
// //Handle get requests to /friend/<UserId>
// app.get("/friend/:id",(req, res) => {
//     res.send(getFriendData(req.params.id))

// })
// //Handle get requests to /friendsToDisplay
// app.get("/friendsToDisplay",(req, res) => {
//   res.send(getFriendsToDisplay())
// })
// //Handle get requests to /post/<PostId>
// app.get("/post/:id",(req, res) => {
//   res.send(getPostData(req.params.id))
// })
// //Handle get requests to /postToDisplay
// app.get("/postsToDisplay",(req, res) => {
//     res.send(getPostsToDisplay())
// })

//Start listening on port
// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`)
// })


// MySQL Connection

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:3306",
  user: "dbaccess",
  password: "dbaccess"
});
// You saw nothing
//I saw everything
// oh ****


// 

con.connect(function(err) {});

