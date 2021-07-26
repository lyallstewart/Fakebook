//Ummmm

// //Import temp functions
const getPostsToDisplay = require("./getPostsToDisplay.js")
//Get mysqlb 
const AutoIncrementFactory = require('mongoose-sequence');


var mongoose = require('mongoose');

// Get server libraries
const express = require('express')
var cors = require('cors');

// get crypto (the hashing thing)
const crypto = require('crypto');

//get 2fa thingy

const twofactor = require("node-2fa");


// API Connection:
//setup app
const app = express()
const port = 3001

//allow cross-origin
app.use(cors());
app.use(express.json());

// Connect to MongoDB via Mongoose
mongoose.connect(process.env.fakeBookConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
// Connection string is kept in an environment variable locally for security


const db = mongoose.connection;//Get connection
mongoose.set('useFindAndModify', false);
const AutoIncrement = AutoIncrementFactory(db);

db.on('error', console.error.bind(console, 'connection error:'));//Error

  //
db.once('open', async function() {//wait for connection connected
  console.log("Connected to mongodb")
  //Define a couple Schemas
  const UserSchema = mongoose.Schema({
    username:String,
    profilePictureUrl:String,
    firstName:String,
    surName:String,
    authHash:String,
    friends: [String],
    myPosts: [Number],
    twoFactor:{
      secret:String,
      uri:String,
      qr:String
    },
    useTwoFactor:Boolean,
    incomingFriendRequests:[String],
    outgoingFriendRequests:[String]
  })
  const PostSchema = mongoose.Schema({
    postId:Number,
    contentType: String,
    videoType: String,
    textContent: String,
    mediaSource: String,
    user: String
  })
  //Post increment
  PostSchema.plugin(AutoIncrement, {inc_field: 'postId'});
  //Define a couple Models
  const Users = mongoose.model('Users', UserSchema);
  const Posts = mongoose.model('Posts', PostSchema);

  //Handle get requests to /friend/<username>
  app.get("/friend/:username",async (req, res) => {
    console.log(req.params.username)
    user = await Users.findOne({username:req.params.username}, {_id:0,authHash:0,twoFactor:0})
    console.log(`USER ${req.params.username}:`,user)
      res.send(user)})

  //Handle get requests to /post/<PostId>
  app.get("/post/:id",async (req, res) => {
    post = await Posts.findOne({postId:parseInt(req.params.id)})
    console.log(`POST ${req.params.id}:`,post)
      res.send(post)
  })

  //Handle get requests to /postToDisplay/USERNAME/AMOUNTOFPOSTS
  app.get("/postsToDisplay/:id/:amount",async (req, res) => {
      posts= []
      user = await Users.findOne({username:req.params.id})
      for (const friend of user._doc.friends) {
        friendData = await Users.findOne({username:friend})
        posts = posts.concat(friendData._doc.myPosts)
      }
      posts.sort((a, b) => b - a)
      console.log("POSTS",posts.slice(0, req.params.amount))
      res.send(posts.slice(0, req.params.amount))
  })
  app.post("/removefriend/:username",async (req,res) => {
    user = await Users.findOne({username:req.body.username,authHash:req.body.authHash})
    if(user===undefined||user===null) {
      res.send({valid:false,err:1})
    } else {
      await Users.findOneAndUpdate({username:req.body.username,authHash:req.body.authHash},{$pullAll:{incomingFriendRequests:[req.params.username],
        outgoingFriendRequests:[req.params.username]},$addToSet:{
        friends:[req.params.username]}})
    
    await Users.findOneAndUpdate({username:req.params.username},{$pullAll:{incomingFriendRequests:[req.params.username],
      outgoingFriendRequests:[req.params.username]},$addToSet:{
      friends:[req.params.username]}})
  }}
  )
  app.post("/acceptfriendrequest/:username",async (req,res) => {
    user = await Users.findOne({username:req.body.username,authHash:req.body.authHash})
    if(user===undefined||user===null) {
      res.send({valid:false,err:1})
    } else{
      otheruser = await Users.findOne({username:req.params.username})
    if(otheruser===undefined||otheruser===null) {
      res.send({valid:false,err:2})
    } else {
      if(user.incomingFriendRequests.includes(req.params.username)){
        await Users.findOneAndUpdate({username:req.body.username,authHash:req.body.authHash},{$pullAll:{incomingFriendRequests:[req.params.username],
          outgoingFriendRequests:[req.params.username],
          friends:[req.params.username]}})
          await Users.findOneAndUpdate({username:req.params.username},{$pullAll:{incomingFriendRequests:[req.params.username],
            outgoingFriendRequests:[req.params.username],
            friends:[req.params.username]}})
      } else {
        res.send({valid:false,err:3})
      }
    }
  }
  })
  app.post("/sendfriendrequest/:username",async (req,res) => {
    user = await Users.findOne({username:req.body.username,authHash:req.body.authHash})
    if(user===undefined||user===null) {
      res.send({valid:false,err:1})
    } else{
      otheruser = await Users.findOne({username:req.params.username})
    if(otheruser===undefined||otheruser===null) {
      res.send({valid:false,err:2})
    } else {
      if(user.incomingFriendRequests.includes(req.params.username)){
        res.send({valid:false,err:3})
      } else {
        if(user.outgoingFriendRequests.includes(req.params.username)){
          res.send({valid:false,err:4})
        } else {
          if(user.friends.includes(req.params.username)){
            res.send({valid:false,err:5})
          } else {
            //At this point we can make the friend request.
            user.outgoingFriendRequests.push(req.params.username)
            otheruser.incomingFriendRequests.push(req.body.username)
            user.save()
            otheruser.save()
            res.send({valid:true})
          }
        }
      }
    }
    }
  })
  app.post("/login",async (req,res) => {
    console.log(`USERNAME:${req.body.Username},PASSWORD:${req.body.Password}`)
    console.log("HASH:",crypto.createHash("sha256").update(req.body.Username+req.body.Password).digest("base64"))
    user = await Users.findOne({username:req.body.Username,authHash:crypto.createHash("sha256").update(req.body.Username+req.body.Password).digest("base64")})
    if (user===undefined||user===null) {
      res.send({validLogin:false})
    } else {
      if (user.useTwoFactor) {
        res.send({validLogin:true,skip2FA:false,userDetails:user})
      } else {
        res.send({validLogin:true,skip2FA:true,userDetails:user})
      }
    }
  })
  app.post("/2falogin",async (req,res) => {
    console.log(`USERNAME:${req.body.Username},PASSWORD:${req.body.Password}`)
    console.log("HASH:",crypto.createHash("sha256").update(req.body.Username+req.body.Password).digest("base64"))
    console.log("2FA:",req.body.twoFactor)
    user = await Users.findOne({username:req.body.Username,authHash:crypto.createHash("sha256").update(req.body.Username+req.body.Password).digest("base64")})
    if (user===undefined||user===null||(twofactor.verifyToken(user.secret, req.body.twoFactor))) {
      res.send({validLogin:false})
    } else {
        res.send({validLogin:true,userDetails:user})
      }
    }
  )
  app.post("/2FAchange/:newState",async (req,res) => {
    console.log(`USERNAME:${req.body.Username},HASH:${req.body.authHash}`)
    user = await Users.findOneAndUpdate({username:req.body.Username,authHash:req.body.authHash},{useTwoFactor:(/true/i).test(req.params.newState)},{new:true})
    res.send({newState:user.useTwoFactor})
  })
  app.post("/cookielogin",async (req,res) => {
    console.log(`USERNAME:${req.body.Username},HASH:${req.body.authHash}`)
    user = await Users.findOne({username:req.body.Username,authHash:req.body.authHash})
    if (user===undefined||user===null) {
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
        firstName:req.body.firstName,
        surName  :  req.body.surName,
        profilePictureUrl:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
        authHash: crypto.createHash("sha256")
        .update(req.body.Username+req.body.Password)//Concatenate Username to stop all hashes with the same password being the same (in case we add password hints)
        .digest("base64"),
        twoFactor:twofactor.generateSecret({ name: "FakeBook", account: req.body.Username }),
        useTwoFactor:false
      })
      newUser.save()
      res.send({validLogin:true})
    } else {
      res.send({validLogin:false,error:"Username already taken."})
    }
  })
 
 app.post("/create",async (req,res) => {

    //Let's create a new user!
    mediaSource = req.body.mediaSource
    if (req.body.contentType=="video" && req.body.videoType=="youtube") {
      mediaSource=mediaSource.slice(mediaSource.length - 11)
    }
    newPost = new Posts({
      contentType: req.body.contentType,
      videoType: req.body.videoType,
      textContent: req.body.textContent,
      mediaSource: mediaSource,
      user: req.body.userDetails.username
    })
    await newPost.save()
    newPost = await Posts.findOne({
      contentType: req.body.contentType,
      videoType: req.body.videoType,
      textContent: req.body.textContent,
      mediaSource: mediaSource,
      user: req.body.userDetails.username
    })
    console.log(newPost._doc.postId)
    await Users.findOneAndUpdate(
      { username: req.body.userDetails.username }, 
      { $push: { myPosts: newPost._doc.postId }}
    )
    
    res.send({validLogin:true})
})

})
   //Start listening on port
app.listen(port, () => {
  //console.log(`Server is listening at http://localhost:${port}`)
})
     