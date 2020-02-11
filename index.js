const express = require("express");

const postsRouter = require("./data/api/posts-router"); // << added

const server = express();

server.use(express.json()); // needed to parse JSON from the body

// for URLs beginning with /api
server.use("/api", postsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

const port = 3000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
