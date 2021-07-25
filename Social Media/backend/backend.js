
app.use(express.json());// Connect to MongoDB via Mongoose

const db = mongoose.connection;//Get connection
const port = 3001//allow cross-origin


const AutoIncrement = AutoIncrementFactory(db);
//setup app
db.on('error', console.error.bind(console, 'connection error:'));//Errordb.once('open', async function() {//wait for connection connected

//Define a couple Schemas

username:String,

firstName:String,
var mongoose = require('mongoose');// Get server libraries
authHash:String,

myPosts: [Number],

secret:String,
const getPostsToDisplay = require("./getPostsToDisplay.js")
qr:String

useTwoFactor:Boolean,
//Import temp functions
  incomingFriendRequests:[String]
//Get mysqlb 
  const PostSchema = mongoose.Schema({
const AutoIncrementFactory = require('mongoose-sequence');
      contentType: String,

      textContent: String,

      user: String
const express = require('express')
      //Post increment
var cors = require('cors');
        //Define a couple Models
// get crypto (the hashing thing)

const crypto = require('crypto');
        const Posts = mongoose.model('Posts', PostSchema);  //Handle get requests to /friend/<username>
//get 2fa thingy
console.log(req.params.username)
const twofactor = require("node-2fa");
  console.log(`USER ${req.params.username}:`,user)


const app = express()app.use(cors());    mongoose.connect(process.env.fakeBookConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});// Connection string is kept in an environment variable locally for securitymongoose.set('useFindAndModify', false);    console.log("Connected to mongodb")  const UserSchema = mongoose.Schema({    profilePictureUrl:String,    surName:String,    friends: [String],    twoFactor:{      uri:String,    },    outgoingFriendRequests:[String],  })    postId:Number,    videoType: String,    mediaSource: String,  })  PostSchema.plugin(AutoIncrement, {inc_field: 'postId'});  const Users = mongoose.model('Users', UserSchema);  app.get("/friend/:username",async (req, res) => {    user = await Users.findOne({username:req.params.username}, {_id:0,authHash:0,twoFactor:0})    res.send(user)})      //Handle get requests to /friendsToDisplay

res.send(["48panda", "GalifreyTom", "GamerJ57", "Gollum7412", "kurat_maqas","Acooldude"])

  

  user = await Users.findOne({username:req.body.Username,authHash:req.body.authHash})

    res.send({success:false})

  //Valid user making the request.

    if (user===undefined||user===null) {

      } else {

      if (user.incomingFriendRequests.includes(req.params.username)) {



      res.send({success:false})

      }

      })

      app.post("/declinefriendrequest/:username", async (req, res) => {



})  app.get("/sendfriendrequest/:username", async (req, res) => {

      user = await Users.findOne({username:req.body.username,authHash:req.body.authHash})

        res.send({success:false})

    //Valid user making the request.

    if (otherUser===undefined||otherUser===null) {

    } else {

      console.log(user.incomingFriendRequests)

    }

    })

    app.get("/getfriendsrequests/:username", async (req, res) => {






  app.get("/friendsToDisplay",(req, res) => {
  })
  app.post("/acceptfriendrequest/:username",async (req,res) => {
    if (user===undefined||user===null) {
    } else {
      otherUser = await Users.findOne({username:req.params.username})
        res.send({success:false})
        //Valid user to accept request from.
          //Theer is a friend request to accept
        } else {
        }
    }
  
    console.log("decline")

    console.log("post sent")
    if (user===undefined||user===null) {
    } else {
      otherUser = await Users.findOne({username:req.params.username})
        res.send({success:false})
        //Valid user to send request to.
        res.send("YES")
    }
  
  
  })

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
app.listen(port, () => {})
     