const url = require("url");
const {
  getAllPostsModal,
  deletePostModal,
  createPostModal,
} = require("../models/postModal");

module.exports.getAllPostsController = async (res, options) => {
  const posts = await getAllPostsModal();
  res.writeHead(200, {...options});
  res.write(JSON.stringify(posts));
  res.end();
};

module.exports.deletePostController = async (req, res, options) => {
  const parsedURL = url.parse(req.url, true);
  const postID = parsedURL.query.postID;
  const {status} = await deletePostModal(postID);
  res.writeHead(status, { "content-type": "application/json", ...options });
  res.write(JSON.stringify({ status }));
  res.end();
};

module.exports.createPostController = async (req, res, options) => {
  let reqBobyParts = [];
  req.on("data", (data) => {
    reqBobyParts.push(data);
  });
  req.on("end", async() => {
    const newPostController = JSON.parse(Buffer.concat(reqBobyParts).toString());
    const { status } = await createPostModal(newPostController);
    res.writeHead(status, {"content-type":"application/json", ...options});
    res.write(JSON.stringify({ status }));
    res.end();
  });
};
