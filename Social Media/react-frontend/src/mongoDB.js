const mongoose = require('mongoose');

const uri = "mongodb+srv://george:BwmqZkT2mDiNWQED@cluster0.vtdsy.mongodb.net/test";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

