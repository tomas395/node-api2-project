const express = require("express");

const postsRouter = require("../api/posts-router");

const router = express.Router();

// this router handles requests beginning in /api

router.use(express.json());

// handle /api /server
server.use("/api/posts", postsRouter);

module.exports = router;
