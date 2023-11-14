const express = require('express');
const router = express.Router();

const posts = require('../data/posts');

// INDEX - GET - displays all posts
router.get("/", function(req, res) {
  res.json(posts);
});

// CREATE - POST - add a new post to the database
router.post("/", function(req, res) {
  if (req.body.userId && req.body.title && req.body.content) {
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    posts.push(newPost);
    res.json(newPost);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// SHOW - GET - shows information about one post
router.get("/:id", function(req, res, next) {
  const postId = parseInt(req.params.id);
  const post = posts.find(function(p) {
    return p.id === postId;
  });

  if (post) {
    res.json(post);
  } else {
    next();
  }
});

// UPDATE - PUT/PATCH - update a particular post
router.patch("/:id", function(req, res, next) {
  const postId = parseInt(req.params.id);
  const post = posts.find(function(p, i) {
    if (p.id === postId) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) {
    res.json(post);
  } else {
    next();
  }
});

// DELETE - DELETE - delete a particular post
router.delete("/:id", function(req, res, next) {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(function(p) {
    return p.id === postId;
  });

  if (postIndex !== -1) {
    const deletedPost = posts.splice(postIndex, 1)[0];
    res.json(deletedPost);
  } else {
    next();
  }
});

module.exports = router;