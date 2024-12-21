const url = require("url")
const { getAllStoriesModal, addStoryModal, deleteStoryModal } = require("../models/storyModal");

module.exports.getAllStoriesController = async (res, options) => {
  const stories = await getAllStoriesModal();
  res.writeHead(200, { "content-type": "application/json", ...options });
  res.write(JSON.stringify(stories));
  res.end();
};

module.exports.addStoryController = async (req, res, options) => {
  let reqBodyParts = [];
  req.on("data", (data) => {
    reqBodyParts.push(data);
  });
  req.on("end", async () => {
    const reqBodyController = JSON.parse(
      Buffer.concat(reqBodyParts).toString()
    );
    const { status } = await addStoryModal(reqBodyController);
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status }));
    res.end();
  });
};

module.exports.deleteStoryController = async (req, res, options) => {
    const parsedURL = url.parse(req.url, true)
    const storyID = parsedURL.query.storyID;
    const {status} = await deleteStoryModal(storyID)
    res.writeHead(status, {"content-type":"application/json", ...options})
    res.write(JSON.stringify({status}))
    res.end()
}
