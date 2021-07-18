//Ummmm

// //Import temp functions
const getPostData = require("./getPostData.js")
const getPostsToDisplay = require("./getPostsToDisplay.js")
//Get mysql
var mysql = require('mysql');
// Get server libraries
const express = require('express')
var cors = require('cors');

// API Connection:
//setup app
const app = express()
const port = 3001

//allow cross-origin
app.use(cors());


// MySQL Connection Parameters
var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "apiaccess",
  password: "everything", //DON'T LOOK HERE
  database: "fakebook"
});
// You saw nothing
//I saw everything
// oh ****

// Connection establishing:
function getUser(id) {
  console.log(`USERID:${id}`)
  userData = {}
  con.connect(function(err) {
    
    con.query(
      "SELECT * FROM fakebook.users WHERE userId="+id+";",
       function (err, result, fields) {
         if (err) {
           throw err;
         }
         console.log("result:", result , typeof result);
         userData=result[0][0];
         
      }
    );
    
   });
   console.log("userData", userData, typeof userData)
   return userData
}
  
//Handle get requests to /friend/<UserId>
app.get("/friend/:id",(req, res) => {
  con.connect(function(err) {
    
    con.query(
      "SELECT * FROM fakebook.users WHERE userId="+req.params.id+";",
       function (err, result, fields) {
         if (err) {
           throw err;
         }
         console.log("result:", result , typeof result);
         res.send(result[0])
         
      }
    );
    
   });
    

})

//Handle get requests to /friendsToDisplay
app.get("/friendsToDisplay",(req, res) => {
  res.send([1, 2, 3, 4, 5])
})

//Handle get requests to /post/<PostId>
app.get("/post/:id",(req, res) => {
  res.send(getPostData(req.params.id))
})

//Handle get requests to /postToDisplay
app.get("/postsToDisplay",(req, res) => {
    res.send(getPostsToDisplay())
})

//Start listening on port
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})