const http = require("http");

const {getAllPostsController, deletePostController, createPostController} = require("./controllers/postController");
const {getAllContactsController} = require("./controllers/contactController");
const {getAllStoriesController, addStoryController, deleteStoryController} = require("./controllers/storyController");
const server = http.createServer((req, res) => {
  const options = {
    "access-control-allow-origin":"http://localhost:3000",
    "access-control-allow-methods":"POST,GET,PUT,DELETE,OPTIONS",
    "access-control-allow-headers":"*"
  }
  if (req.url === "/posts" && req.method === "GET") {
    getAllPostsController(res, options)
  } else if (req.method === "POST" && req.url === "/posts") {
    createPostController(req, res, options)
  } else if (req.url === "/stories" && req.method === "GET") {
    getAllStoriesController(res, options)
  } else if (req.method === "POST" && req.url === "/stories") {
    addStoryController(req, res, options)
  } else if (req.url.startsWith("/stories") && req.method === "DELETE") {
    deleteStoryController(req, res, options)
  } else if (req.url === "/contacts" && req.method === "GET") {
    getAllContactsController(res, options)
  } else if (req.method === "DELETE" && req.url.startsWith("/posts")) {
    deletePostController(req, res, options)
  } else {
    res.writeHead(200, {"Content-type": "text/html", ...options });
    res.write("<h2>Welcome to Nodejs back-end Facebook-Clone project</h2>");
    res.end();
  }
});
server.listen(process.env.PORT, () => console.log("server in running..."));

