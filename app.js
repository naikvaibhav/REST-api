const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
app.use(bodyParser.json());

//EJS
app.set("view engine", "ejs");

//public folder
app.use(express.static("./public"));

//import routes
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");

//route middlewares
app.use("/api/v1/post", postRoute);
app.use("/api/v1/user", authRoute);
app.use("/", uploadRoute);
// app.get("/", (req, res) => res.render("index"));

// app.post("/upload", (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       res.render("index", {
//         msg: err
//       });
//     } else {
//       console.log(req.file);
//       res.send("test");
//     }
//   });
// });

// app.use("/user", (req, res, next) => {
//   console.log("execute the middle wear first");
//   next();
// });

// app.get("/api", (req, res) => {
//   console.log(`hey this is my first route`);
//   res.send("Good evening");
// });

//connect to database
//mongodb://localhost:27017/blogPost
// mongo.connect(
//   "mongodb+srv://vaibhav:vaibhav@vncluster-dhl0q.mongodb.net/test?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   () => {
//     console.log("connected to mongodb");
//   }
// );

mongoose
  .connect("mongodb://localhost:27017/blogPost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch(err => {
    // console.error(err);
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

//listen to port
app.listen(process.env.PORT || 3000);
