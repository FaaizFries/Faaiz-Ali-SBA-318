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
    const post = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    posts.push(post);
    res.json(posts[posts.length - 1]);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// SHOW - GET - shows information about one post
router.get("/:id", function(req, res, next) {
  const post = posts.find(function(p) {
    return p.id == req.params.id;
  });

  if (post) {
    res.json(post);
  } else {
    next();
  }
});

// UPDATE - PUT/PATCH - update a particular post
router.patch("/:id", function(req, res, next) {
  const post = posts.find(function(p, i) {
    if (p.id == req.params.id) {
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
  const post = posts.find(function(p, i) {
    if (p.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });

  if (post) {
    res.json(post);
  } else {
    next();
  }
});

module.exports = router;