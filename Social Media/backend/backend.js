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
  //Handle get requests to /friend/<username>
  app.get("/friend/:username",async (req, res) => {
    console.log(req.params.username)
    user = await Users.findOne({username:req.params.username})
    console.log(`USER ${req.params.username}:`,user)
      res.send(user)})

  //Handle get requests to /friendsToDisplay
  app.get("/friendsToDisplay",(req, res) => {
    res.send(["48panda", "GalifreyTom", "GamerJ57", "Gollum7412", "kurat_maqas","Acooldude"])
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
    console.log(`USERNAME:${req.body.Username},PASSWORD:${req.body.Password}`)
    user = await Users.findOne({username:req.body.Username,password:req.body.Password})
    if (user===undefined) {
      res.send({validLogin:false})
    } else {
      res.send({validLogin:true,userDetails:user})
    }
  })
  app.post("/signup",async (req,res) => {
    console.log(req.body)
    user = await Users.findOne({username:req.body.Username})
    console.log(user)
    if (user===undefined || user===null) {
      //Let's create a new user!
      newUser = new Users({
        username : req.body.Username,
        password : req.body.Password,
        firstName:req.body.firstName,
        surName  :  req.body.surName,
        profilePictureUrl:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
      })
      newUser.save()
      res.send({validLogin:true})
    } else {
      res.send({validLogin:false,error:"Username already taken."})
    }
  })
 })
 
   //Start listening on port
app.listen(port, () => {
  //console.log(`Server is listening at http://localhost:${port}`)
})
     