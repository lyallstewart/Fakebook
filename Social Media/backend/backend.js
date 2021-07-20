//Ummmm

// //Import temp functions
const getPostData = require("./getPostData.js")
const getPostsToDisplay = require("./getPostsToDisplay.js")
//Get mysql

var mongoose = require('mongoose');

// Get server libraries
const express = require('express')
var cors = require('cors');



// API Connection:
//setup app
const app = express()
const port = 3001

//allow cross-origin
app.use(cors());
app.use(express.json());

// Connect to MongoDB via Mongoose
mongoose.connect("mongodb+srv://fakebook-api:5NWVTVQQcPC0f26d@cluster0.vtdsy.mongodb.net/FakeBook?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
// You saw nothing
//I saw everything
// oh ****

//And yes, by the time you're seeing this, if at all, the connection string is invalid.

const db = mongoose.connection;//Get connection
db.on('error', console.error.bind(console, 'connection error:'));//Error

  //
db.once('open', async function() {//wait for connection connected
  console.log("Connected to mongodb")
  //Define a couple Schemas
  const UserSchema = mongoose.Schema({
    userId:Number,
    username:String,
    password:String,
    profilePictureUrl:String,
    firstName:String,
    surName:String
  })
  const PostSchema = mongoose.Schema({
    postId:Number,
    contentType: String,
    videoType: String,
    textContent: String,
    mediaSource: String
  })

  //Define a couple Models
  const Users = mongoose.model('Users', UserSchema);
  const Posts = mongoose.model('Posts', PostSchema);

  app.get("/",(req,res)=>{
    console.log("mainpage!")
    res.send("TEST TEST TEST PLEASE WORK")
  })
  //Handle get requests to /friend/<UserId>
  app.get("/friend/:id",async (req, res) => {
    user = await Users.findOne({userId:parseInt(req.params.id)})
    console.log(`USER ${req.params.id}:`,user)
      res.send(user)})

  //Handle get requests to /friendsToDisplay
  app.get("/friendsToDisplay",(req, res) => {
    res.send([1, 2, 3, 4, 5])
  })

  //Handle get requests to /post/<PostId>
  app.get("/post/:id",async (req, res) => {
    post = await Posts.findOne({postId:parseInt(req.params.id)})
    console.log(`POST ${req.params.id}:`,post)
      res.send(post)
  })

  //Handle get requests to /postToDisplay
  app.get("/postsToDisplay",(req, res) => {
      res.send(getPostsToDisplay())
  })

  app.post("/login",async (req,res) => {
    res.send({validLogin:true})
    return
    
    console.log(`USERNAME:${req.body.Username},PASSWORD:${req.body.Password}`)
    user = await Users.findOne({username:req.body.Username,password:req.body.Password})
    if (user===undefined) {
      res.send({validLogin:false})
    } else {
      res.send({validLogin:true})
    }
  })
 
 })
 
   //Start listening on port
app.listen(port, () => {
  //console.log(`Server is listening at http://localhost:${port}`)
})
     