const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//verify token to make a api private
const verify = require("./verifyToken");

// router.get("/", (req, res) => {
//   res.send("welcome to user login page");
// });

// router.get("/specific", (req, res) => {
//   res.send("specific page");
// });

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  post
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.get("/", async (req, res) => {
  console.log(req.query);
  try {
    const post = await Post.find();
    res.json({ post: post, token: req.query.token, userId: req.query.userId });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const param = req.params.postId;
    const post = await Post.findById(param);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const param = req.params.postId;
    const post = await Post.remove({ _id: param });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const param = req.params.postId;
    const post = await Post.updateOne(
      { _id: param },
      { $set: { title: req.body.title } }
    );
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
