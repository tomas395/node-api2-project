const express = require("express");

const Blogs = require("../db"); // < fix the path

const router = express.Router(); // mind the uppercase R

// route handlers - handles what comes after /api/hubs

router.get("/", (req, res) => {
  Blogs.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error in the GET/api/posts/", err);
      res.status(500).json({
        errorMessage: "The post information could not be retrieved."
      });
    });
});

// (GET) the post object with the specified id. ↓
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Blogs.findById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

// (GET) comment tied to the post with the specific ID ↓

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Blogs.findPostComments(id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("error in the GET /api/posts/:id/comments", err);
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved."
      });
    });
});

// (CREATE) add POST data, title, contents and text ↓

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Blogs.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("error in the POST /api/posts", err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});

// (CREATE) comments for the post with specified id ↓

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Blogs.insertComment(req.body)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log("error in the POST /api/posts/:id/comments", err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the comment to the database"
        });
      });
  }
});

// (UPDATE) the post with the specified ID using information sent thru req.body. ↓

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  Blogs.update(id, { title, contents })
    .then(post => {
      if (!post) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The post information could not be modified."
      });
    });
});

// (DELETE) a post with specified ID ↓

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Blogs.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The post could not be removed"
      });
    });
});

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   Blogs.remove(id)
//     .then(removed => {
//       res.status(204).json(removed);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "The user could not be removed" });
//     });
// });

// mind the S in exportS
module.exports = router; // same as below

// export default router; // ES2015 Modules
