const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");

const server = http.createServer((req, res) => {
  if (req.url === "/posts" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (error, data) => {
      if (error) {
        throw error;
      }
      const posts = JSON.parse(data).posts;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(posts));
      res.end();
      return;
    });
  } else if (req.url === "/stories" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (error, data) => {
      if (error) {
        throw error;
      }
      const stories = JSON.parse(data).stories;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(stories));
      res.end();
      return;
    });
  } else if (req.url === "/contacts" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (error, data) => {
      if (error) {
        throw error;
      }
      const contacts = JSON.parse(data).contacts;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(contacts));
      res.end();
      return;
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/posts")) {
    const parsedURL = url.parse(req.url, true);
    const postID = parsedURL.query.postID;
    const isFindPost = db.posts.some((item) => item.id === postID);
    if (isFindPost) {
      const filteredPosts = db.posts.filter(
        (item) => item.id !== postID
      );
      fs.writeFile(
        "./db.json",
        JSON.stringify({ ...db, posts: filteredPosts }),
        (error) => {
          if (error) {
            throw error;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Remove post successfully" }));
          res.end();
        }
      );
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "post not exist" }));
      res.end();
    }
  } else if (req.method === "POST" && req.url === "/posts") {
    let reqBoby = {};
    req.on("data", (data) => {
      reqBoby = JSON.parse(data.toString());
    });
    req.on("end", () => {
      const newPost = { id: crypto.randomUUID(), ...reqBoby, timestamp:new Date };
      db.posts.push(newPost);
      fs.writeFile("./db.json", JSON.stringify({ ...db }), (error) => {
        if (error) {
          throw error;
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Add post succesfully" }));
        res.end();
      });
    });
  }
});

server.listen(3000, () => console.log("server in running..."));
